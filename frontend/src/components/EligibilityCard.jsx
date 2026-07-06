import { Link } from "react-router-dom";

export default function EligibilityCard({ scheme }) {
  return (
    <div className="card" style={{ borderLeft: "4px solid var(--color-success)" }}>
      <div style={{ fontSize: "0.75rem", color: "var(--color-success)", fontWeight: 700 }}>
        ✓ YOU ARE ELIGIBLE
      </div>
      <h3 style={{ margin: "0.4rem 0" }}>{scheme.scheme_name}</h3>
      <p style={{ color: "var(--color-muted)", fontSize: "0.9rem" }}>{scheme.short_description}</p>
      <Link to={`/schemes/${scheme.id}`} style={{ color: "var(--color-primary)", fontWeight: 600 }}>
        View details →
      </Link>
    </div>
  );
}
