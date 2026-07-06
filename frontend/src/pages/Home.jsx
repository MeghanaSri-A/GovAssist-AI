import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";

const CATEGORIES = [
  { name: "Housing", icon: "🏠" },
  { name: "Education", icon: "🎓" },
  { name: "Agriculture", icon: "🌾" },
  { name: "Employment", icon: "💼" },
  { name: "Startup", icon: "🚀" },
  { name: "Healthcare", icon: "❤️" },
];

export default function Home() {
  return (
    <div className="container" style={{ paddingTop: "3rem", paddingBottom: "3rem" }}>
      <section style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h1 style={{ fontSize: "2.4rem", color: "var(--color-primary)" }}>
          Find, Compare & Understand Government Schemes with AI
        </h1>
        <p style={{ color: "var(--color-muted)", maxWidth: 600, margin: "0.5rem auto 1.5rem" }}>
          Ask questions in plain English, check your eligibility, and explore schemes — all backed
          by official documents with citations.
        </p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <SearchBar />
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginTop: "1.5rem" }}>
          <Link to="/eligibility" className="btn-accent">
            Check Eligibility
          </Link>
          <Link to="/chat" className="btn-primary">
            Ask AI
          </Link>
        </div>
      </section>

      <section>
        <h2>Browse by Category</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "1rem" }}>
          {CATEGORIES.map((c) => (
            <Link key={c.name} to={`/explorer?category=${c.name.toLowerCase()}`} className="card" style={{ textAlign: "center" }}>
              <div style={{ fontSize: "2rem" }}>{c.icon}</div>
              <div style={{ fontWeight: 600, marginTop: "0.5rem" }}>{c.name}</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
