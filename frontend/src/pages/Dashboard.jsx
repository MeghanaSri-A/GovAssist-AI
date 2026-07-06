import { Link } from "react-router-dom";

const QUICK_LINKS = [
  { to: "/eligibility", label: "Check Eligibility", icon: "🎯" },
  { to: "/chat", label: "Ask AI", icon: "🤖" },
  { to: "/explorer", label: "Explore Schemes", icon: "📚" },
  { to: "/saved", label: "Saved Schemes", icon: "❤️" },
];

export default function Dashboard() {
  return (
    <div className="container" style={{ paddingTop: "2rem", paddingBottom: "3rem" }}>
      <h2>Dashboard</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem" }}>
        {QUICK_LINKS.map((l) => (
          <Link key={l.to} to={l.to} className="card" style={{ textAlign: "center" }}>
            <div style={{ fontSize: "1.8rem" }}>{l.icon}</div>
            <div style={{ fontWeight: 600, marginTop: "0.5rem" }}>{l.label}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
