import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { listBookmarks, listSchemes } from "../services/eligibility";
import { getChatHistory } from "../services/rag";

export default function Dashboard() {
  const { user } = useAuth();
  const [bookmarks, setBookmarks] = useState([]);
  const [recentChats, setRecentChats] = useState([]);
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    listBookmarks().then(setBookmarks).catch(() => setBookmarks([]));
    getChatHistory().then((data) => setRecentChats(data.slice(0, 4))).catch(() => setRecentChats([]));
    listSchemes({ limit: 3 }).then(setRecommended).catch(() => setRecommended([]));
  }, []);

  const userName = user?.email?.split("@")[0] || "Citizen";

  return (
    <div className="container" style={{ paddingTop: "2.5rem", paddingBottom: "4rem" }}>
      {/* Welcome Banner */}
      <div
        style={{
          background: "linear-gradient(135deg, #1E3A8A 0%, #0F172A 100%)",
          color: "#FFFFFF",
          borderRadius: "20px",
          padding: "2.5rem",
          marginBottom: "2.5rem",
          boxShadow: "0 10px 30px rgba(15, 23, 42, 0.15)",
        }}
      >
        <div style={{ display: "inline-block", padding: "0.2rem 0.65rem", borderRadius: "999px", background: "rgba(245, 158, 11, 0.2)", color: "#FDE68A", fontSize: "0.78rem", fontWeight: 700, marginBottom: "0.75rem" }}>
          Citizen Dashboard
        </div>
        <h1 style={{ fontSize: "2.2rem", color: "#FFFFFF", marginBottom: "0.5rem" }}>
          Welcome, {userName}!
        </h1>
        <p style={{ color: "#CBD5E1", fontSize: "1rem", maxWidth: "600px", margin: 0 }}>
          Manage your saved government schemes, review your previous AI queries, and check eligibility updates.
        </p>
      </div>

      {/* Quick Launch Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.25rem", marginBottom: "3rem" }}>
        
        <Link to="/eligibility" className="card card-interactive" style={{ padding: "1.5rem", textDecoration: "none" }}>
          <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🎯</div>
          <h3 style={{ fontSize: "1.1rem", color: "#0F172A", marginBottom: "0.3rem" }}>Check Eligibility</h3>
          <p style={{ color: "#64748B", fontSize: "0.85rem", margin: 0 }}>Filter schemes tailored to your exact citizen profile</p>
        </Link>

        <Link to="/chat" className="card card-interactive" style={{ padding: "1.5rem", textDecoration: "none" }}>
          <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🤖</div>
          <h3 style={{ fontSize: "1.1rem", color: "#0F172A", marginBottom: "0.3rem" }}>AI Scheme Assistant</h3>
          <p style={{ color: "#64748B", fontSize: "0.85rem", margin: 0 }}>Ask questions with cited guideline excerpts</p>
        </Link>

        <Link to="/explorer" className="card card-interactive" style={{ padding: "1.5rem", textDecoration: "none" }}>
          <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>📚</div>
          <h3 style={{ fontSize: "1.1rem", color: "#0F172A", marginBottom: "0.3rem" }}>Browse Directory</h3>
          <p style={{ color: "#64748B", fontSize: "0.85rem", margin: 0 }}>Search across 500+ Central and State initiatives</p>
        </Link>

        <Link to="/saved" className="card card-interactive" style={{ padding: "1.5rem", textDecoration: "none" }}>
          <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>❤️</div>
          <h3 style={{ fontSize: "1.1rem", color: "#0F172A", marginBottom: "0.3rem" }}>
            Saved Schemes ({bookmarks.length})
          </h3>
          <p style={{ color: "#64748B", fontSize: "0.85rem", margin: 0 }}>Quickly access and compare bookmarked schemes</p>
        </Link>

      </div>

      {/* Two Column Section: Recent Inquiries + Recommended */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "2rem", marginBottom: "3rem" }}>
        
        {/* Recent Searches */}
        <div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
            <h2 style={{ fontSize: "1.3rem" }}>Recent AI Consultations</h2>
            <Link to="/profile" style={{ fontSize: "0.85rem", color: "#2541B2", fontWeight: 600 }}>
              View all →
            </Link>
          </div>

          {recentChats.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
              {recentChats.map((c) => (
                <div key={c.id} className="card" style={{ padding: "1rem 1.25rem" }}>
                  <div style={{ fontSize: "0.92rem", fontWeight: 700, color: "#1E293B", marginBottom: "0.3rem" }}>
                    Q: {c.question}
                  </div>
                  <p style={{ color: "#64748B", fontSize: "0.85rem", margin: 0, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {c.answer}
                  </p>
                  <Link
                    to="/chat"
                    state={{ initialQuestion: c.question }}
                    style={{ display: "inline-block", marginTop: "0.5rem", fontSize: "0.78rem", color: "#2541B2", fontWeight: 600 }}
                  >
                    Resume discussion 💬
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="card" style={{ padding: "2rem", textAlign: "center", color: "#64748B" }}>
              <p style={{ margin: "0 0 1rem" }}>No AI queries recorded yet.</p>
              <Link to="/chat" className="btn-primary btn-sm">
                Ask your first question
              </Link>
            </div>
          )}
        </div>

        {/* Featured / Recommended Schemes */}
        <div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
            <h2 style={{ fontSize: "1.3rem" }}>Recommended Schemes</h2>
            <Link to="/explorer" style={{ fontSize: "0.85rem", color: "#2541B2", fontWeight: 600 }}>
              See all →
            </Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {recommended.map((s) => (
              <div key={s.id} className="card" style={{ padding: "1.2rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                  <span className="badge badge-education">{s.category}</span>
                  <span style={{ fontSize: "0.75rem", color: "#64748B" }}>{s.state || "All India"}</span>
                </div>
                <h4 style={{ fontSize: "1rem", color: "#0F172A", marginBottom: "0.3rem" }}>
                  <Link to={`/schemes/${s.id}`}>{s.scheme_name}</Link>
                </h4>
                <p style={{ color: "#64748B", fontSize: "0.85rem", margin: "0 0 0.75rem" }}>
                  {s.short_description}
                </p>
                <Link to={`/schemes/${s.id}`} style={{ fontSize: "0.82rem", color: "#2541B2", fontWeight: 600 }}>
                  View Requirements →
                </Link>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
