import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import SchemeCard from "../components/SchemeCard";
import { listSchemes } from "../services/eligibility";
import {
  IndianFlag,
  IconEligibility,
  IconSchemes,
  IconSparkles,
} from "../components/Icons";

const CATEGORIES = [
  {
    name: "Education",
    id: "education",
    icon: "🎓",
    color: "#4F46E5",
    count: "120+ Programs",
    desc: "Scholarships, college grants & fee waivers",
  },
  {
    name: "Housing",
    id: "housing",
    icon: "🏠",
    color: "#EA580C",
    count: "45+ Subsidies",
    desc: "PMAY, urban housing & pucca home loans",
  },
  {
    name: "Agriculture",
    id: "agriculture",
    icon: "🌾",
    color: "#059669",
    count: "90+ Schemes",
    desc: "PM-Kisan, crop insurance & equipment subsidies",
  },
  {
    name: "Employment",
    id: "employment",
    icon: "💼",
    color: "#7C3AED",
    count: "60+ Initiatives",
    desc: "Mudra business loans & skill training",
  },
  {
    name: "Startup",
    id: "startup",
    icon: "🚀",
    color: "#DB2777",
    count: "35+ Grants",
    desc: "Seed fund, incubators & patent support",
  },
  {
    name: "Healthcare",
    id: "healthcare",
    icon: "❤️",
    color: "#DC2626",
    count: "50+ Policies",
    desc: "Ayushman Bharat & free medical coverage",
  },
];

export default function Home() {
  const [featuredSchemes, setFeaturedSchemes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listSchemes({ limit: 3 })
      .then((data) => setFeaturedSchemes(data))
      .catch(() => setFeaturedSchemes([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ paddingBottom: "4rem" }}>
      {/* HERO SECTION */}
      <section
        style={{
          position: "relative",
          background:
            "radial-gradient(circle at 50% 0%, #EEF2FF 0%, #F8FAFC 75%)",
          padding: "3.5rem 1rem 3.5rem",
          borderBottom: "1px solid #E2E8F0",
          overflow: "hidden",
        }}
      >
        <div
          className="container"
          style={{
            textAlign: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
              padding: "0.4rem 1rem",
              borderRadius: "999px",
              background: "#FFFFFF",
              border: "1px solid rgba(37, 99, 235, 0.2)",
              boxShadow: "0 2px 8px rgba(37, 99, 235, 0.08)",
              marginBottom: "1.5rem",
            }}
          >
            <IndianFlag width={20} height={14} />

            <span
              style={{
                fontSize: "0.8rem",
                fontWeight: 700,
                color: "#1E3A8A",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              AI-Powered Citizen Assistance • All India &amp; State Schemes
            </span>
          </div>

          {/* Main Title */}
          <h1
            style={{
              fontSize: "clamp(2.2rem, 5vw, 3.4rem)",
              fontWeight: 800,
              color: "#0F172A",
              lineHeight: 1.15,
              maxWidth: "850px",
              margin: "0 auto 1.25rem",
              letterSpacing: "-0.03em",
            }}
          >
            Discover Government Schemes You're{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                borderBottom: "3px solid #F59E0B",
                paddingBottom: "2px",
              }}
            >
              Actually Eligible
            </span>{" "}
            For
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: "clamp(1rem, 2vw, 1.15rem)",
              color: "#475569",
              maxWidth: "680px",
              margin: "0 auto 2.2rem",
              lineHeight: 1.6,
            }}
          >
            Ask in plain English. Check your profile criteria in seconds,
            compare benefits side-by-side, and verify every detail with cited
            official PDF guidelines.
          </p>

          {/* Floating Search Bar */}
          <div style={{ marginBottom: "2.5rem" }}>
            <SearchBar />
          </div>

          {/* Direct CTA Buttons */}
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
              marginBottom: "3rem",
            }}
          >
            <Link
              to="/eligibility"
              className="btn-accent"
              style={{
                padding: "0.85rem 1.8rem",
                fontSize: "1rem",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <IconEligibility size={20} color="#FFFFFF" />
              <span>Check My Eligibility Now</span>
            </Link>

            <Link
              to="/explorer"
              className="btn-secondary"
              style={{
                padding: "0.85rem 1.8rem",
                fontSize: "1rem",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <IconSchemes size={20} color="#1E3A8A" />
              <span>Browse All Schemes</span>
            </Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section
        className="container"
        style={{
          paddingTop: "4.5rem",
          paddingBottom: "2rem",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "3rem",
          }}
        >
          <span
            style={{
              fontSize: "0.8rem",
              fontWeight: 700,
              color: "#2541B2",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Simple &amp; Transparent
          </span>

          <h2
            style={{
              fontSize: "2rem",
              marginTop: "0.4rem",
            }}
          >
            How GovAssist AI Works
          </h2>

          <p
            style={{
              color: "#64748B",
              maxWidth: "540px",
              margin: "0.5rem auto 0",
            }}
          >
            No more visiting multiple government offices or getting lost in
            complicated policy documents.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {/* STEP 1 */}
          <div
            className="card"
            style={{
              padding: "2rem",
              textAlign: "left",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "#EEF2FF",
                color: "#4F46E5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.5rem",
                marginBottom: "1.2rem",
                fontWeight: 800,
              }}
            >
              1
            </div>

            <h3
              style={{
                fontSize: "1.2rem",
                marginBottom: "0.6rem",
              }}
            >
              Provide Your Profile
            </h3>

            <p
              style={{
                color: "#64748B",
                fontSize: "0.92rem",
                lineHeight: 1.6,
              }}
            >
              Share basic anonymous details like your age, state, education,
              and family income to instantly filter out non-qualifying
              programs.
            </p>
          </div>

          {/* STEP 2 */}
          <div
            className="card"
            style={{
              padding: "2rem",
              textAlign: "left",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "#FEF3C7",
                color: "#D97706",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.5rem",
                marginBottom: "1.2rem",
                fontWeight: 800,
              }}
            >
              2
            </div>

            <h3
              style={{
                fontSize: "1.2rem",
                marginBottom: "0.6rem",
              }}
            >
              AI Analyzes Official PDFs
            </h3>

            <p
              style={{
                color: "#64748B",
                fontSize: "0.92rem",
                lineHeight: 1.6,
              }}
            >
              Our RAG vector engine searches through verified gazette PDFs,
              checking clauses, income ceilings, and exact document
              checklists.
            </p>
          </div>

          {/* STEP 3 */}
          <div
            className="card"
            style={{
              padding: "2rem",
              textAlign: "left",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "#ECFDF5",
                color: "#059669",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.5rem",
                marginBottom: "1.2rem",
                fontWeight: 800,
              }}
            >
              3
            </div>

            <h3
              style={{
                fontSize: "1.2rem",
                marginBottom: "0.6rem",
              }}
            >
              Compare &amp; Apply Directly
            </h3>

            <p
              style={{
                color: "#64748B",
                fontSize: "0.92rem",
                lineHeight: 1.6,
              }}
            >
              Review side-by-side benefit comparisons and jump straight to
              authorized portals like Scholarships.gov.in or PMAYMIS to submit
              your application.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURED SCHEMES PREVIEW */}
      <section
        className="container"
        style={{
          paddingTop: "3rem",
          paddingBottom: "2rem",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1.5rem",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div>
            <span
              style={{
                fontSize: "0.8rem",
                fontWeight: 700,
                color: "#D97706",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Most Popular
            </span>

            <h2
              style={{
                fontSize: "1.8rem",
                marginTop: "0.2rem",
              }}
            >
              Featured Citizen Welfare Schemes
            </h2>
          </div>

          <Link
            to="/explorer"
            className="btn-secondary btn-sm"
            style={{
              padding: "0.5rem 1rem",
            }}
          >
            Explore All 500+ Schemes →
          </Link>
        </div>

        {loading ? (
          <div
            style={{
              textAlign: "center",
              padding: "2rem",
            }}
          >
            Loading featured schemes...
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {featuredSchemes.map((scheme) => (
              <SchemeCard
                key={scheme.id}
                scheme={scheme}
              />
            ))}
          </div>
        )}
      </section>

      {/* BROWSE BY CATEGORY */}
      <section
        className="container"
        style={{
          paddingTop: "3rem",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "2.5rem",
          }}
        >
          <span
            style={{
              fontSize: "0.8rem",
              fontWeight: 700,
              color: "#2541B2",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Comprehensive Database
          </span>

          <h2
            style={{
              fontSize: "2rem",
              marginTop: "0.3rem",
            }}
          >
            Browse Schemes by Category
          </h2>

          <p
            style={{
              color: "#64748B",
              marginTop: "0.5rem",
            }}
          >
            Select a sector to explore tailored central and state government
            benefits.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={`/explorer?category=${cat.id}`}
              className="card card-interactive"
              style={{
                textDecoration: "none",
                display: "flex",
                flexDirection: "column",
                gap: "0.6rem",
                padding: "1.5rem",
                borderLeft: `4px solid ${cat.color}`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "10px",
                    background: `${cat.color}15`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.4rem",
                  }}
                >
                  {cat.icon}
                </div>

                <span
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    color: cat.color,
                    background: `${cat.color}15`,
                    padding: "0.2rem 0.6rem",
                    borderRadius: "999px",
                  }}
                >
                  {cat.count}
                </span>
              </div>

              <h3
                style={{
                  fontSize: "1.15rem",
                  color: "#1E293B",
                  margin: 0,
                }}
              >
                {cat.name}
              </h3>

              <p
                style={{
                  fontSize: "0.85rem",
                  color: "#64748B",
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                {cat.desc}
              </p>

              <div
                style={{
                  marginTop: "0.5rem",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: cat.color,
                }}
              >
                Explore category →
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* AI ASSISTANT BANNER */}
      <section
        className="container"
        style={{
          paddingTop: "4rem",
        }}
      >
        <div
          style={{
            background:
              "linear-gradient(135deg, #1E3A8A 0%, #172554 100%)",
            color: "#FFFFFF",
            borderRadius: "20px",
            padding: "3rem 2.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "2rem",
            boxShadow: "0 12px 35px -5px rgba(30, 58, 138, 0.4)",
          }}
        >
          <div
            style={{
              maxWidth: "600px",
            }}
          >
            <div
              style={{
                display: "inline-block",
                padding: "0.25rem 0.75rem",
                borderRadius: "999px",
                background: "rgba(245, 158, 11, 0.25)",
                color: "#FDE68A",
                fontSize: "0.8rem",
                fontWeight: 700,
                marginBottom: "0.8rem",
              }}
            >
              ⚡ RAG Hybrid Search
            </div>

            <h2
              style={{
                fontSize: "2rem",
                color: "#FFFFFF",
                marginBottom: "0.8rem",
                lineHeight: 1.25,
              }}
            >
              Have Specific Questions? Chat With Our AI Assistant
            </h2>

            <p
              style={{
                color: "#BFDBFE",
                fontSize: "0.95rem",
                lineHeight: 1.6,
              }}
            >
              Whether you want to know if students with gap years qualify for
              NSP, or if single women receive priority in PMAY, our AI answers
              with exact page citations.
            </p>
          </div>

          <Link
            to="/chat"
            className="btn-accent"
            style={{
              padding: "0.9rem 2rem",
              fontSize: "1.05rem",
              boxShadow: "0 6px 20px rgba(245, 158, 11, 0.4)",
            }}
          >
            <span>💬</span>
            <span>Start Free AI Chat</span>
          </Link>
        </div>
      </section>
    </div>
  );
}