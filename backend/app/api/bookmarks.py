from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.database import crud
from app.utils.deps import get_current_user
from app.models.user import User
from app.schemas import SchemeOut

router = APIRouter(prefix="/api/bookmarks", tags=["bookmarks"])


@router.post("/{scheme_id}")
def bookmark_scheme(scheme_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    crud.add_bookmark(db, current_user.id, scheme_id)
    return {"bookmarked": scheme_id}


@router.get("/", response_model=list[SchemeOut])
def list_bookmarks(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    bookmarks = crud.get_user_bookmarks(db, current_user.id)
    return [crud.get_scheme(db, b.scheme_id) for b in bookmarks]
