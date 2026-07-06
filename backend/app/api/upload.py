import os
import shutil

from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session

from app.config import settings
from app.database.database import get_db
from app.rag.pdf_loader import load_pdf_pages
from app.rag.chunker import chunk_pages
from app.rag.retriever import index_chunks, delete_pdf_chunks
from app.utils.deps import get_current_user
from app.models.user import User

router = APIRouter(prefix="/api/upload", tags=["upload"])


def require_admin(user: User = Depends(get_current_user)) -> User:
    if not user.is_admin:
        raise HTTPException(status_code=403, detail="Admin access required")
    return user


@router.post("/")
def upload_pdf(file: UploadFile = File(...), admin: User = Depends(require_admin)):
    os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
    dest_path = os.path.join(settings.UPLOAD_DIR, file.filename)

    with open(dest_path, "wb") as f:
        shutil.copyfileobj(file.file, f)

    pages = load_pdf_pages(dest_path)
    chunks = chunk_pages(pages)
    indexed_count = index_chunks(chunks, pdf_name=file.filename)

    return {
        "filename": file.filename,
        "pages_extracted": len(pages),
        "chunks_indexed": indexed_count,
    }


@router.delete("/{pdf_name}")
def delete_pdf(pdf_name: str, admin: User = Depends(require_admin)):
    path = os.path.join(settings.UPLOAD_DIR, pdf_name)
    if os.path.exists(path):
        os.remove(path)
    delete_pdf_chunks(pdf_name)
    return {"deleted": pdf_name}
