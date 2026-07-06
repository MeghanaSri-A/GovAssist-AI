"""
Run with: python -m app.seed  (from backend/ directory)
Populates the schemes table with sample data so the eligibility checker
and explorer have something to show before you've uploaded real PDFs.
"""
from app.database.database import SessionLocal, Base, engine
from app.models.scheme import Scheme
from app.models import user, chat  # noqa: F401 ensures all tables are created

Base.metadata.create_all(bind=engine)

SAMPLE_SCHEMES = [
    dict(
        scheme_name="National Scholarship Portal (NSP)",
        category="education", state="All India", pdf_name="nsp.pdf",
        min_age=15, max_age=30, gender="any", max_income=250000,
        occupation=None, education_level="undergraduate", social_category="any",
        short_description="Financial assistance for higher education for students from low-income families.",
        official_url="https://scholarships.gov.in",
    ),
    dict(
        scheme_name="PM Awas Yojana",
        category="housing", state="All India", pdf_name="pmay.pdf",
        min_age=18, max_age=None, gender="any", max_income=300000,
        occupation=None, education_level=None, social_category="any",
        short_description="Affordable housing subsidy for economically weaker sections.",
        official_url="https://pmaymis.gov.in",
    ),
    dict(
        scheme_name="PM Kisan Samman Nidhi",
        category="agriculture", state="All India", pdf_name="pmkisan.pdf",
        min_age=18, max_age=None, gender="any", max_income=None,
        occupation="farmer", education_level=None, social_category="any",
        short_description="Income support of ₹6000/year for small and marginal farmer families.",
        official_url="https://pmkisan.gov.in",
    ),
    dict(
        scheme_name="Startup India Seed Fund",
        category="startup", state="All India", pdf_name="startup_india.pdf",
        min_age=18, max_age=None, gender="any", max_income=None,
        occupation="entrepreneur", education_level=None, social_category="any",
        short_description="Seed funding for early-stage startups to prove their idea and build prototypes.",
        official_url="https://seedfund.startupindia.gov.in",
    ),
    dict(
        scheme_name="Ayushman Bharat (PM-JAY)",
        category="healthcare", state="All India", pdf_name="ayushman_bharat.pdf",
        min_age=None, max_age=None, gender="any", max_income=250000,
        occupation=None, education_level=None, social_category="any",
        short_description="Health insurance cover of ₹5 lakh per family per year for secondary/tertiary care.",
        official_url="https://pmjay.gov.in",
    ),
    dict(
        scheme_name="PM Mudra Yojana",
        category="employment", state="All India", pdf_name="mudra_yojana.pdf",
        min_age=18, max_age=None, gender="any", max_income=None,
        occupation="self-employed", education_level=None, social_category="any",
        short_description="Collateral-free loans up to ₹10 lakh for non-corporate, non-farm small businesses.",
        official_url="https://www.mudra.org.in",
    ),
]


def run():
    db = SessionLocal()
    try:
        if db.query(Scheme).count() > 0:
            print("Schemes table already has data. Skipping seed.")
            return
        for data in SAMPLE_SCHEMES:
            db.add(Scheme(**data))
        db.commit()
        print(f"Seeded {len(SAMPLE_SCHEMES)} sample schemes.")
    finally:
        db.close()


if __name__ == "__main__":
    run()
