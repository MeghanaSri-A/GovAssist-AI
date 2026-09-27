import { Link } from "react-router-dom";

export default function EligibilityCard({ scheme }) {
  return (
    <div
      className="card card-interactive"
      style={{
        borderLeft: "5px solid #10B981",
        background: "#FFFFFF",
        padding: "1.5rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        borderRadius: "16px",
      }}
    >
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
          <span
            style={{
              fontSize: "0.75rem",
              fontWeight: 800,
              color: "#059669",
              background: "#ECFDF5",
              border: "1px solid #A7F3D0",
              padding: "0.25rem 0.65rem",
              borderRadius: "999px",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.35rem",
            }}
          >
            <span>✓</span> ELIGIBILITY CRITERIA MET
          </span>

          <span
            style={{
              fontSize: "0.75rem",
              fontWeight: 700,
              textTransform: "uppercase",
              color: "#4F46E5",
              background: "#EEF2FF",
              padding: "0.2rem 0.6rem",
              borderRadius: "6px",
            }}
          >
            {scheme.category}
          </span>
        </div>

        <h3 style={{ fontSize: "1.15rem", color: "#0F172A", marginBottom: "0.5rem" }}>
          {scheme.scheme_name}
        </h3>

        <p style={{ color: "#64748B", fontSize: "0.9rem", lineHeight: 1.5, marginBottom: "1.2rem" }}>
          {scheme.short_description}
        </p>

        {scheme.official_url && (
          <div style={{ fontSize: "0.8rem", color: "#64748B", marginBottom: "1rem" }}>
            Official Portal: <span style={{ color: "#2541B2", wordBreak: "break-all" }}>{scheme.official_url}</span>
          </div>
        )}
      </div>

      <div style={{ display: "flex", gap: "0.6rem", alignItems: "center", paddingTop: "0.5rem", borderTop: "1px solid #F1F5F9" }}>
        <Link
          to={`/schemes/${scheme.id}`}
          className="btn-primary btn-sm"
          style={{ flex: 1, textAlign: "center" }}
        >
          View Full Scheme →
        </Link>
        {scheme.official_url && (
          <a
            href={scheme.official_url}
            target="_blank"
            rel="noreferrer"
            className="btn-secondary btn-sm"
            title="Open official government application page"
          >
            Apply Online ↗
          </a>
        )}
      </div>
    </div>
  );
}
