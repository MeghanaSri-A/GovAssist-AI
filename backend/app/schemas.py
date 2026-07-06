from datetime import datetime
from typing import Optional, List

from pydantic import BaseModel, EmailStr


# ---------- Auth ----------
class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserOut(BaseModel):
    id: int
    name: str
    email: EmailStr
    is_admin: int

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


# ---------- Schemes ----------
class SchemeOut(BaseModel):
    id: int
    scheme_name: str
    category: Optional[str]
    state: Optional[str]
    short_description: Optional[str]
    official_url: Optional[str]

    class Config:
        from_attributes = True


class SchemeDetail(SchemeOut):
    pdf_name: Optional[str]
    min_age: Optional[int]
    max_age: Optional[int]
    gender: Optional[str]
    max_income: Optional[float]
    occupation: Optional[str]
    education_level: Optional[str]
    social_category: Optional[str]


# ---------- Eligibility ----------
class EligibilityRequest(BaseModel):
    age: int
    gender: str
    state: str
    occupation: str
    income: float
    education: str
    category: str  # social category


class EligibilityResult(BaseModel):
    eligible_schemes: List[SchemeOut]
    total_matched: int


# ---------- Chat / RAG ----------
class ChatRequest(BaseModel):
    question: str
    chat_history: Optional[List[dict]] = None


class SourceCitation(BaseModel):
    pdf_name: str
    page: int
    snippet: Optional[str] = None


class ChatResponse(BaseModel):
    answer: str
    sources: List[SourceCitation]


# ---------- Compare ----------
class CompareRequest(BaseModel):
    scheme_id_a: int
    scheme_id_b: int


class CompareResponse(BaseModel):
    comparison: str
