import json

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.database import crud
from app.schemas import ChatRequest, ChatResponse
from app.rag.generator import generate_answer
from app.utils.deps import get_current_user
from app.models.user import User

router = APIRouter(prefix="/api/chat", tags=["chat"])


@router.post("/", response_model=ChatResponse)
def chat(
    payload: ChatRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = generate_answer(payload.question, chat_history=payload.chat_history)

    crud.save_chat(
        db,
        user_id=current_user.id,
        question=payload.question,
        answer=result["answer"],
        sources_json=json.dumps(result["sources"]),
    )

    return ChatResponse(answer=result["answer"], sources=result["sources"])


@router.get("/history")
def chat_history(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    chats = crud.get_user_chats(db, current_user.id)
    return [
        {
            "id": c.id,
            "question": c.question,
            "answer": c.answer,
            "sources": json.loads(c.sources) if c.sources else [],
            "created_at": c.created_at,
        }
        for c in chats
    ]
