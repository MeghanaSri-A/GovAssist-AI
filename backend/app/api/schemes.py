from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import Optional

from app.database.database import get_db
from app.database import crud
from app.schemas import SchemeOut, SchemeDetail

router = APIRouter(prefix="/api/schemes", tags=["schemes"])


@router.get("/", response_model=list[SchemeOut])
def list_schemes(
    category: Optional[str] = None,
    state: Optional[str] = None,
    skip: int = 0,
    limit: int = 50,
    db: Session = Depends(get_db),
):
    return crud.get_schemes(db, category=category, state=state, skip=skip, limit=limit)


@router.get("/{scheme_id}", response_model=SchemeDetail)
def get_scheme(scheme_id: int, db: Session = Depends(get_db)):
    scheme = crud.get_scheme(db, scheme_id)
    if not scheme:
        raise HTTPException(status_code=404, detail="Scheme not found")
    return scheme
