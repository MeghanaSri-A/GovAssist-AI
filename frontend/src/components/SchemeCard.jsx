import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addBookmark } from "../services/eligibility";
import { useAuth } from "../context/AuthContext";
import { IconBookmark } from "./Icons";

const CATEGORY_MAP = {
  housing: { label: "Housing", icon: "🏠", badgeClass: "badge-housing" },
  education: { label: "Education", icon: "🎓", badgeClass: "badge-education" },
  agriculture: { label: "Agriculture", icon: "🌾", badgeClass: "badge-agriculture" },
  employment: { label: "Employment", icon: "💼", badgeClass: "badge-employment" },
  startup: { label: "Startup", icon: "🚀", badgeClass: "badge-startup" },
  healthcare: { label: "Healthcare", icon: "❤️", badgeClass: "badge-healthcare" },
};

export default function SchemeCard({ scheme, isBookmarked = false, onBookmarkToggle }) {
  const [bookmarked, setBookmarked] = useState(isBookmarked);
  const [saving, setSaving] = useState(false);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const cat = CATEGORY_MAP[scheme.category?.toLowerCase()] || {
    label: scheme.category || "General",
    icon: "📋",
    badgeClass: "badge-all",
  };

  const handleBookmark = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    setSaving(true);
    try {
      await addBookmark(scheme.id);
      setBookmarked(true);
      if (onBookmarkToggle) onBookmarkToggle(scheme.id, true);
    } catch {
      // already bookmarked or network issue
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="card card-interactive"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        padding: "1.35rem",
        background: "#FFFFFF",
        border: "1px solid var(--border-color)",
        borderRadius: "16px",
      }}
    >
      <div>
        {/* Top Badges Row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.85rem" }}>
          <div style={{ display: "flex", gap: "0.4rem", alignItems: "center", flexWrap: "wrap" }}>
            <span className={`badge ${cat.badgeClass}`}>
              <span>{cat.icon}</span> {cat.label}
            </span>
            <span
              style={{
                fontSize: "0.75rem",
                color: "#475569",
                background: "#F1F5F9",
                padding: "0.2rem 0.6rem",
                borderRadius: "999px",
                fontWeight: 600,
              }}
            >
              📍 {scheme.state || "All India"}
            </span>
          </div>

          {/* Bookmark Button */}
          <button
            onClick={handleBookmark}
            disabled={saving}
            style={{
              background: bookmarked ? "#EFF6FF" : "#F8FAFC",
              border: `1px solid ${bookmarked ? "rgba(37, 99, 235, 0.4)" : "#E2E8F0"}`,
              color: bookmarked ? "#2563EB" : "#94A3B8",
              width: "34px",
              height: "34px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
            title={bookmarked ? "Bookmarked" : "Save Scheme"}
          >
            <IconBookmark size={16} color={bookmarked ? "#2563EB" : "#94A3B8"} filled={bookmarked} />
          </button>
        </div>

        {/* Scheme Title */}
        <h3
          style={{
            fontSize: "1.1rem",
            fontWeight: 700,
            color: "#1E293B",
            marginBottom: "0.5rem",
            lineHeight: 1.35,
          }}
        >
          <Link
            to={`/schemes/${scheme.id}`}
            style={{ color: "inherit", textDecoration: "none" }}
            onMouseOver={(e) => (e.currentTarget.style.color = "#2541B2")}
            onMouseOut={(e) => (e.currentTarget.style.color = "#1E293B")}
          >
            {scheme.scheme_name}
          </Link>
        </h3>

        {/* Short Description */}
        <p
          style={{
            color: "#64748B",
            fontSize: "0.88rem",
            lineHeight: 1.5,
            marginBottom: "1rem",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {scheme.short_description || "Find full eligibility requirements, subsidy details, and document guidelines."}
        </p>

        {/* Quick Criteria Highlights */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0.5rem",
            padding: "0.65rem 0.8rem",
            background: "#F8FAFC",
            borderRadius: "10px",
            border: "1px solid #EDF2F7",
            marginBottom: "1.2rem",
            fontSize: "0.8rem",
            color: "#475569",
          }}
        >
          <div>
            <span style={{ color: "#94A3B8", display: "block", fontSize: "0.72rem" }}>Income Limit</span>
            <strong>{scheme.max_income ? `≤ ₹${(scheme.max_income / 100000).toFixed(1)}L/yr` : "No Upper Limit"}</strong>
          </div>
          <div>
            <span style={{ color: "#94A3B8", display: "block", fontSize: "0.72rem" }}>Age Criteria</span>
            <strong>
              {scheme.min_age && scheme.max_age
                ? `${scheme.min_age} - ${scheme.max_age} yrs`
                : scheme.min_age
                ? `Min ${scheme.min_age} yrs`
                : "All Ages"}
            </strong>
          </div>
        </div>
      </div>

      {/* Card Actions Bottom Row */}
      <div style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
        <Link
          to={`/schemes/${scheme.id}`}
          className="btn-secondary btn-sm"
          style={{ flex: 1, textAlign: "center" }}
        >
          View Details →
        </Link>
        <Link
          to="/chat"
          state={{ initialQuestion: `Explain ${scheme.scheme_name} in detail and what documents are required.` }}
          className="btn-sm"
          style={{
            background: "rgba(37, 65, 178, 0.08)",
            color: "#2541B2",
            border: "1px solid rgba(37, 65, 178, 0.2)",
            borderRadius: "8px",
            padding: "0.45rem 0.75rem",
            fontWeight: 600,
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.3rem",
          }}
          title="Ask AI about this scheme"
        >
          <span>🤖</span>
          <span>Ask AI</span>
        </Link>
      </div>
    </div>
  );
}
