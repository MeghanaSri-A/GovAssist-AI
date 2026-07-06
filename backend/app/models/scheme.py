from sqlalchemy import Column, Integer, String, Float, Text, DateTime
from sqlalchemy.sql import func

from app.database.database import Base


class Scheme(Base):
    """
    Structured metadata for each government scheme.
    This powers fast filtering/recommendation (the non-LLM half of the
    hybrid search architecture). The full scheme text lives in the PDF
    and gets chunked + embedded separately for RAG via rag/pdf_loader.py.
    """

    __tablename__ = "schemes"

    id = Column(Integer, primary_key=True, index=True)
    scheme_name = Column(String, nullable=False, index=True)
    category = Column(String, index=True)        # housing, education, agriculture, employment, startup, healthcare
    state = Column(String, index=True)            # "All India" or specific state
    pdf_name = Column(String)                      # filename in app/uploads, links to Qdrant chunks

    # Eligibility filter fields
    min_age = Column(Integer, nullable=True)
    max_age = Column(Integer, nullable=True)
    gender = Column(String, nullable=True)         # "male", "female", "any"
    max_income = Column(Float, nullable=True)
    occupation = Column(String, nullable=True)
    education_level = Column(String, nullable=True)
    social_category = Column(String, nullable=True)  # general, OBC, SC, ST, etc.

    short_description = Column(Text, nullable=True)
    official_url = Column(String, nullable=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
