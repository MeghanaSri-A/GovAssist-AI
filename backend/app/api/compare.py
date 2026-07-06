from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

import google.generativeai as genai

from app.config import settings
from app.database.database import get_db
from app.database import crud
from app.schemas import CompareRequest, CompareResponse

genai.configure(api_key=settings.GEMINI_API_KEY)

router = APIRouter(prefix="/api/compare", tags=["compare"])


@router.post("/", response_model=CompareResponse)
def compare_schemes(payload: CompareRequest, db: Session = Depends(get_db)):
    scheme_a = crud.get_scheme(db, payload.scheme_id_a)
    scheme_b = crud.get_scheme(db, payload.scheme_id_b)
    if not scheme_a or not scheme_b:
        raise HTTPException(status_code=404, detail="One or both schemes not found")

    prompt = f"""Compare these two Indian government schemes for a layperson, in plain English.
Use a short structured format covering: eligibility, benefits, and who each scheme suits best.

Scheme A: {scheme_a.scheme_name}
Description: {scheme_a.short_description}

Scheme B: {scheme_b.scheme_name}
Description: {scheme_b.short_description}
"""
    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content(prompt)
    return CompareResponse(comparison=response.text)
