from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.schemas import EligibilityRequest, EligibilityResult
from app.services.eligibility_service import find_eligible_schemes

router = APIRouter(prefix="/api/eligibility", tags=["eligibility"])


@router.post("/", response_model=EligibilityResult)
def check_eligibility(payload: EligibilityRequest, db: Session = Depends(get_db)):
    matches = find_eligible_schemes(db, payload)
    return EligibilityResult(eligible_schemes=matches, total_matched=len(matches))
