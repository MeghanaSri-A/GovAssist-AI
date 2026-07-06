from sqlalchemy.orm import Session
from sqlalchemy import or_

from app.models.scheme import Scheme
from app.schemas import EligibilityRequest


def find_eligible_schemes(db: Session, profile: EligibilityRequest):
    """
    Pure structured-data filtering against the schemes table.
    No LLM call here -- this is the fast path of the hybrid architecture.
    Falls back gracefully when a scheme leaves a field unset (treated as "no restriction").
    """
    query = db.query(Scheme).filter(
        or_(Scheme.min_age.is_(None), Scheme.min_age <= profile.age),
        or_(Scheme.max_age.is_(None), Scheme.max_age >= profile.age),
        or_(Scheme.gender.is_(None), Scheme.gender == "any", Scheme.gender == profile.gender),
        or_(Scheme.max_income.is_(None), Scheme.max_income >= profile.income),
        or_(Scheme.state.is_(None), Scheme.state == "All India", Scheme.state == profile.state),
        or_(Scheme.social_category.is_(None), Scheme.social_category == "any",
            Scheme.social_category == profile.category),
    )
    return query.all()
