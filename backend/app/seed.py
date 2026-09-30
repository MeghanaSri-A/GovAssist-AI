"""
Run with:
    python -m app.seed

from the backend/ directory.

This script:
1. Creates database tables if they don't exist.
2. Makes the specified email an admin.
3. Seeds sample schemes if the schemes table is empty.
"""

from app.database.database import SessionLocal, Base, engine
from app.models.scheme import Scheme
from app.models.user import User
from app.models import user, chat  # noqa: F401 - ensures tables are created


# Create all database tables
Base.metadata.create_all(bind=engine)


# ---------------------------------------------------------
# SAMPLE SCHEMES
# ---------------------------------------------------------

SAMPLE_SCHEMES = [
    dict(
        scheme_name="National Scholarship Portal (NSP)",
        category="education",
        state="All India",
        pdf_name="nsp.pdf",
        min_age=15,
        max_age=30,
        gender="any",
        max_income=250000,
        occupation=None,
        education_level="undergraduate",
        social_category="any",
        short_description=(
            "Financial assistance for higher education for students "
            "from low-income families."
        ),
        official_url="https://scholarships.gov.in",
    ),

    dict(
        scheme_name="PM Awas Yojana",
        category="housing",
        state="All India",
        pdf_name="pmay.pdf",
        min_age=18,
        max_age=None,
        gender="any",
        max_income=300000,
        occupation=None,
        education_level=None,
        social_category="any",
        short_description=(
            "Affordable housing subsidy for economically weaker sections."
        ),
        official_url="https://pmaymis.gov.in",
    ),

    dict(
        scheme_name="PM Kisan Samman Nidhi",
        category="agriculture",
        state="All India",
        pdf_name="pmkisan.pdf",
        min_age=18,
        max_age=None,
        gender="any",
        max_income=None,
        occupation="farmer",
        education_level=None,
        social_category="any",
        short_description=(
            "Income support of ₹6000/year for small and marginal farmer families."
        ),
        official_url="https://pmkisan.gov.in",
    ),

    dict(
        scheme_name="Startup India Seed Fund",
        category="startup",
        state="All India",
        pdf_name="startup_india.pdf",
        min_age=18,
        max_age=None,
        gender="any",
        max_income=None,
        occupation="entrepreneur",
        education_level=None,
        social_category="any",
        short_description=(
            "Seed funding for early-stage startups to prove their idea "
            "and build prototypes."
        ),
        official_url="https://seedfund.startupindia.gov.in",
    ),

    dict(
        scheme_name="Ayushman Bharat (PM-JAY)",
        category="healthcare",
        state="All India",
        pdf_name="ayushman_bharat.pdf",
        min_age=None,
        max_age=None,
        gender="any",
        max_income=250000,
        occupation=None,
        education_level=None,
        social_category="any",
        short_description=(
            "Health insurance cover of ₹5 lakh per family per year "
            "for secondary/tertiary care."
        ),
        official_url="https://pmjay.gov.in",
    ),

    dict(
        scheme_name="PM Mudra Yojana",
        category="employment",
        state="All India",
        pdf_name="mudra_yojana.pdf",
        min_age=18,
        max_age=None,
        gender="any",
        max_income=None,
        occupation="self-employed",
        education_level=None,
        social_category="any",
        short_description=(
            "Collateral-free loans up to ₹10 lakh for non-corporate, "
            "non-farm small businesses."
        ),
        official_url="https://www.mudra.org.in",
    ),
]


# ---------------------------------------------------------
# SEED FUNCTION
# ---------------------------------------------------------

def run():
    db = SessionLocal()

    try:

        # -------------------------------------------------
        # MAKE ADMIN USER
        # -------------------------------------------------

        # IMPORTANT:
        # Replace this with the email you use to log in
        # as the admin account.
        admin_email = "meghanasri0608@gmail.com"

        admin = (
            db.query(User)
            .filter(User.email == admin_email)
            .first()
        )

        if admin:
            admin.is_admin = 1
            db.commit()

            print(f"Admin enabled for: {admin_email}")

        else:
            print(
                f"Admin email not found: {admin_email}. "
                "Register this email first, then run the seed again."
            )

        # -------------------------------------------------
        # SEED SCHEMES
        # -------------------------------------------------

        if db.query(Scheme).count() > 0:
            print("Schemes table already has data. Skipping seed.")
            return

        for data in SAMPLE_SCHEMES:
            db.add(Scheme(**data))

        db.commit()

        print(
            f"Seeded {len(SAMPLE_SCHEMES)} sample schemes."
        )

    finally:
        db.close()


# ---------------------------------------------------------
# RUN
# ---------------------------------------------------------

if __name__ == "__main__":
    run()