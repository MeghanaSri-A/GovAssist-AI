import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listBookmarks } from "../services/eligibility";
import SchemeCard from "../components/SchemeCard";
import LoadingAnimation from "../components/LoadingAnimation";

export default function SavedSchemes() {
  const [schemes, setSchemes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    listBookmarks()
      .then((data) => setSchemes(data.filter(Boolean)))
      .catch(() => setSchemes([]))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="container" style={{ paddingTop: "2.5rem", paddingBottom: "4rem" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem", marginBottom: "2rem" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem" }}>
            <span style={{ fontSize: "1.2rem" }}>❤️</span>
            <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#DC2626", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Personal Bookmarks
            </span>
          </div>
          <h1 style={{ fontSize: "2.2rem", color: "#0F172A", margin: 0 }}>
            Saved Government Schemes
          </h1>
          <p style={{ color: "#64748B", fontSize: "0.95rem", marginTop: "0.3rem" }}>
            Your saved schemes for quick reference, application tracking, and comparison.
          </p>
        </div>

        {schemes.length >= 2 && (
          <Link to="/compare" className="btn-secondary btn-sm" style={{ padding: "0.6rem 1.2rem" }}>
            <span>⚖️</span> Compare Saved Schemes
          </Link>
        )}
      </div>

      {isLoading ? (
        <div style={{ padding: "4rem 0" }}>
          <LoadingAnimation label="Retrieving your bookmarked schemes..." />
        </div>
      ) : schemes.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {schemes.map((s) => (
            <SchemeCard key={s.id} scheme={s} isBookmarked={true} />
          ))}
        </div>
      ) : (
        <div
          className="card"
          style={{
            textAlign: "center",
            padding: "4rem 1.5rem",
            background: "#FFFFFF",
            borderRadius: "18px",
            border: "1px dashed #CBD5E1",
          }}
        >
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📑</div>
          <h3 style={{ fontSize: "1.3rem", color: "#1E293B", marginBottom: "0.5rem" }}>
            You haven't bookmarked any schemes yet
          </h3>
          <p style={{ color: "#64748B", maxWidth: "450px", margin: "0 auto 1.5rem", fontSize: "0.95rem" }}>
            Browse through central and state schemes and click the heart icon on any scheme to save it for later.
          </p>
          <Link to="/explorer" className="btn-primary" style={{ padding: "0.75rem 1.6rem" }}>
            Browse Schemes Directory →
          </Link>
        </div>
      )}
    </div>
  );
}
