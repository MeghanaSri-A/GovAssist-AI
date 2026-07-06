import { Link } from "react-router-dom";

export default function SchemeCard({ scheme }) {
  return (
    <Link to={`/schemes/${scheme.id}`} className="card" style={{ display: "block" }}>
      <div style={{ fontSize: "0.75rem", color: "var(--color-accent)", fontWeight: 700, textTransform: "uppercase" }}>
        {scheme.category}
      </div>
      <h3 style={{ margin: "0.4rem 0" }}>{scheme.scheme_name}</h3>
      <p style={{ color: "var(--color-muted)", fontSize: "0.9rem" }}>{scheme.short_description}</p>
      <div style={{ fontSize: "0.8rem", color: "var(--color-muted)" }}>{scheme.state}</div>
    </Link>
  );
}
