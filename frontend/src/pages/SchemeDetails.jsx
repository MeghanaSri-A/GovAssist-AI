import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getSchemeDetail, addBookmark } from "../services/eligibility";
import LoadingAnimation from "../components/LoadingAnimation";
import { useAuth } from "../context/AuthContext";

export default function SchemeDetails() {
  const { id } = useParams();
  const [scheme, setScheme] = useState(null);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getSchemeDetail(id).then(setScheme).catch(() => setScheme(null));
  }, [id]);

  const handleSave = async () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    setSaving(true);
    try {
      await addBookmark(id);
      setSaved(true);
    } catch {
      // already saved or network
    } finally {
      setSaving(false);
    }
  };

  if (!scheme) {
    return (
      <div className="container" style={{ paddingTop: "4rem", textAlign: "center" }}>
        <LoadingAnimation label="Retrieving official scheme details..." />
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: "2rem", paddingBottom: "4rem", maxWidth: 900 }}>
      {/* Breadcrumb Navigation */}
      <div style={{ marginBottom: "1.5rem" }}>
        <Link
          to="/explorer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            color: "#64748B",
            fontSize: "0.88rem",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          <span>←</span> Back to Scheme Directory
        </Link>
      </div>

      {/* Main Header Card */}
      <div
        className="card"
        style={{
          background: "#FFFFFF",
          borderRadius: "20px",
          padding: "2.2rem",
          border: "1px solid #E2E8F0",
          boxShadow: "0 8px 30px rgba(15, 23, 42, 0.06)",
          marginBottom: "2rem",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem", marginBottom: "1rem" }}>
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", flexWrap: "wrap" }}>
            <span
              style={{
                fontSize: "0.78rem",
                fontWeight: 700,
                textTransform: "uppercase",
                padding: "0.3rem 0.8rem",
                borderRadius: "999px",
                background: "#EEF2FF",
                color: "#4338CA",
                border: "1px solid #C7D2FE",
              }}
            >
              {scheme.category}
            </span>
            <span
              style={{
                fontSize: "0.78rem",
                fontWeight: 600,
                padding: "0.3rem 0.8rem",
                borderRadius: "999px",
                background: "#F1F5F9",
                color: "#475569",
              }}
            >
              📍 {scheme.state || "All India"}
            </span>
            <span
              style={{
                fontSize: "0.78rem",
                fontWeight: 600,
                padding: "0.3rem 0.8rem",
                borderRadius: "999px",
                background: "#ECFDF5",
                color: "#059669",
                border: "1px solid #A7F3D0",
              }}
            >
              ✓ Verified Scheme
            </span>
          </div>

          {/* Bookmark Button */}
          <button
            onClick={handleSave}
            disabled={saved || saving}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              background: saved ? "#FEF2F2" : "#F8FAFC",
              border: `1px solid ${saved ? "#FECACA" : "#CBD5E1"}`,
              color: saved ? "#DC2626" : "#475569",
              padding: "0.5rem 1rem",
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "0.88rem",
              fontWeight: 600,
            }}
          >
            <span>{saved ? "❤️" : "🤍"}</span>
            <span>{saved ? "Saved to Bookmarks" : "Save Scheme"}</span>
          </button>
        </div>

        <h1 style={{ fontSize: "2rem", color: "#0F172A", marginBottom: "0.8rem", lineHeight: 1.25 }}>
          {scheme.scheme_name}
        </h1>

        <p style={{ fontSize: "1.05rem", color: "#475569", lineHeight: 1.6, marginBottom: "1.75rem" }}>
          {scheme.short_description}
        </p>

        {/* CTA Buttons */}
        <div style={{ display: "flex", gap: "0.8rem", flexWrap: "wrap", paddingTop: "1rem", borderTop: "1px solid #F1F5F9" }}>
          {scheme.official_url && (
            <a
              href={scheme.official_url}
              target="_blank"
              rel="noreferrer"
              className="btn-accent"
              style={{ padding: "0.75rem 1.6rem", fontSize: "0.95rem" }}
            >
              <span>Apply on Official Website</span>
              <span>↗</span>
            </a>
          )}
          <Link
            to="/chat"
            state={{ initialQuestion: `Explain eligibility and documents required for ${scheme.scheme_name}.` }}
            className="btn-primary"
            style={{ padding: "0.75rem 1.4rem", fontSize: "0.95rem" }}
          >
            <span>💬 Ask AI Assistant</span>
          </Link>
          <Link
            to="/compare"
            className="btn-secondary"
            style={{ padding: "0.75rem 1.4rem", fontSize: "0.95rem" }}
          >
            <span>⚖️ Compare Scheme</span>
          </Link>
        </div>
      </div>

      {/* Structured Criteria Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.25rem", marginBottom: "2rem" }}>
        
        <div className="card" style={{ background: "#FFFFFF", padding: "1.5rem" }}>
          <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#64748B", textTransform: "uppercase", marginBottom: "0.3rem" }}>
            Income Ceiling
          </div>
          <div style={{ fontSize: "1.3rem", fontWeight: 800, color: "#0F172A" }}>
            {scheme.max_income ? `≤ ₹${scheme.max_income.toLocaleString()} / year` : "No Upper Limit"}
          </div>
          <div style={{ fontSize: "0.82rem", color: "#64748B", marginTop: "0.3rem" }}>
            Annual household income requirement
          </div>
        </div>

        <div className="card" style={{ background: "#FFFFFF", padding: "1.5rem" }}>
          <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#64748B", textTransform: "uppercase", marginBottom: "0.3rem" }}>
            Age Range
          </div>
          <div style={{ fontSize: "1.3rem", fontWeight: 800, color: "#0F172A" }}>
            {scheme.min_age && scheme.max_age
              ? `${scheme.min_age} to ${scheme.max_age} years`
              : scheme.min_age
              ? `Minimum ${scheme.min_age} years`
              : "No Age Restrictions"}
          </div>
          <div style={{ fontSize: "0.82rem", color: "#64748B", marginTop: "0.3rem" }}>
            Applicant age on application date
          </div>
        </div>

        <div className="card" style={{ background: "#FFFFFF", padding: "1.5rem" }}>
          <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#64748B", textTransform: "uppercase", marginBottom: "0.3rem" }}>
            Target Gender &amp; Social Group
          </div>
          <div style={{ fontSize: "1.3rem", fontWeight: 800, color: "#0F172A", textTransform: "capitalize" }}>
            {scheme.gender || "Any"} • {scheme.social_category || "Any Category"}
          </div>
          <div style={{ fontSize: "0.82rem", color: "#64748B", marginTop: "0.3rem" }}>
            Inclusivity criteria defined in policy
          </div>
        </div>

      </div>

      {/* Official Guidelines Document Card */}
      <div
        className="card"
        style={{
          background: "#F8FAFC",
          border: "1px solid #CBD5E1",
          borderRadius: "16px",
          padding: "1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "#EEF2FF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.5rem",
              flexShrink: 0,
            }}
          >
            📄
          </div>
          <div>
            <h4 style={{ fontSize: "1rem", color: "#0F172A", margin: "0 0 0.2rem" }}>
              Official Policy Guidelines PDF
            </h4>
            <div style={{ fontSize: "0.85rem", color: "#64748B" }}>
              Attached File: <strong style={{ color: "#1E293B" }}>{scheme.pdf_name || "Official Scheme Document"}</strong>
            </div>
          </div>
        </div>

        <div style={{ fontSize: "0.82rem", color: "#059669", background: "#ECFDF5", border: "1px solid #A7F3D0", padding: "0.4rem 0.8rem", borderRadius: "8px", fontWeight: 600 }}>
          ✓ Indexed in AI Vector Search
        </div>
      </div>
    </div>
  );
}
