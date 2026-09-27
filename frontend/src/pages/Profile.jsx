import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getChatHistory } from "../services/rag";
import { useAuth } from "../context/AuthContext";
import LoadingAnimation from "../components/LoadingAnimation";

export default function Profile() {
  const { user, isAdmin } = useAuth();
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getChatHistory()
      .then((data) => setChats(data))
      .catch(() => setChats([]))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="container" style={{ paddingTop: "2.5rem", paddingBottom: "4rem", maxWidth: 860 }}>
      {/* Profile Header Card */}
      <div
        className="card"
        style={{
          background: "#FFFFFF",
          borderRadius: "20px",
          padding: "2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1.5rem",
          border: "1px solid #E2E8F0",
          boxShadow: "0 4px 20px rgba(15, 23, 42, 0.05)",
          marginBottom: "2.5rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #2541B2 0%, #1E3A8A 100%)",
              color: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.8rem",
              fontWeight: 700,
              boxShadow: "0 4px 14px rgba(37, 65, 178, 0.25)",
            }}
          >
            {user?.email?.charAt(0).toUpperCase() || "👤"}
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <h1 style={{ fontSize: "1.5rem", color: "#0F172A", margin: 0 }}>
                {user?.email || "Citizen User"}
              </h1>
              {isAdmin && (
                <span style={{ fontSize: "0.75rem", padding: "0.2rem 0.6rem", borderRadius: "999px", background: "#ECFDF5", color: "#059669", fontWeight: 700, border: "1px solid #A7F3D0" }}>
                  🛡️ Admin
                </span>
              )}
            </div>
            <p style={{ color: "#64748B", fontSize: "0.9rem", margin: "4px 0 0" }}>
              GovAssist AI Verified Citizen Account
            </p>
          </div>
        </div>

        <div style={{ display: "flex", gap: "0.6rem" }}>
          <Link to="/saved" className="btn-secondary btn-sm">
            ❤️ Saved Schemes
          </Link>
          <Link to="/chat" className="btn-primary btn-sm">
            💬 Open Chat
          </Link>
        </div>
      </div>

      {/* Consultation History */}
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
          <div>
            <h2 style={{ fontSize: "1.4rem", color: "#0F172A", margin: 0 }}>
              AI Consultation History
            </h2>
            <p style={{ color: "#64748B", fontSize: "0.85rem", marginTop: "2px" }}>
              All government schemes and queries you previously researched with GovAssist AI
            </p>
          </div>
          <span style={{ fontSize: "0.85rem", color: "#64748B", fontWeight: 600 }}>
            {chats.length} {chats.length === 1 ? "Inquiry" : "Inquiries"}
          </span>
        </div>

        {isLoading ? (
          <div style={{ padding: "3rem 0" }}>
            <LoadingAnimation label="Loading your consultation logs..." />
          </div>
        ) : chats.length > 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {chats.map((c) => (
              <div
                key={c.id}
                className="card"
                style={{
                  background: "#FFFFFF",
                  borderRadius: "14px",
                  padding: "1.4rem",
                  border: "1px solid #E2E8F0",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", marginBottom: "0.5rem" }}>
                  <h3 style={{ fontSize: "1.05rem", color: "#1E3A8A", margin: 0, fontWeight: 700 }}>
                    Q: {c.question}
                  </h3>
                  {c.created_at && (
                    <span style={{ fontSize: "0.75rem", color: "#94A3B8", whiteSpace: "nowrap" }}>
                      {new Date(c.created_at).toLocaleDateString()}
                    </span>
                  )}
                </div>

                <p style={{ color: "#475569", fontSize: "0.92rem", lineHeight: 1.6, margin: "0 0 1rem" }}>
                  {c.answer}
                </p>

                {c.sources?.length > 0 && (
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", flexWrap: "wrap", fontSize: "0.78rem", color: "#64748B" }}>
                    <span style={{ fontWeight: 600 }}>Citations:</span>
                    {c.sources.map((s, idx) => (
                      <span key={idx} style={{ background: "#F1F5F9", padding: "0.2rem 0.5rem", borderRadius: "6px" }}>
                        📄 {s.pdf_name} (p.{s.page})
                      </span>
                    ))}
                  </div>
                )}

                <div style={{ marginTop: "1rem", paddingTop: "0.75rem", borderTop: "1px solid #F1F5F9", display: "flex", justifyContent: "flex-end" }}>
                  <Link
                    to="/chat"
                    state={{ initialQuestion: c.question }}
                    style={{ fontSize: "0.85rem", color: "#2541B2", fontWeight: 600, textDecoration: "none" }}
                  >
                    Continue Conversation →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            className="card"
            style={{
              textAlign: "center",
              padding: "3.5rem 1.5rem",
              background: "#FFFFFF",
              borderRadius: "16px",
              border: "1px dashed #CBD5E1",
            }}
          >
            <div style={{ fontSize: "2.5rem", marginBottom: "0.8rem" }}>💬</div>
            <h3 style={{ fontSize: "1.2rem", color: "#1E293B", marginBottom: "0.4rem" }}>
              No Consultation History Yet
            </h3>
            <p style={{ color: "#64748B", maxWidth: "420px", margin: "0 auto 1.5rem", fontSize: "0.9rem" }}>
              When you ask the AI assistant questions about government schemes, your questions and official citations will appear here.
            </p>
            <Link to="/chat" className="btn-primary btn-sm">
              Start an AI Consultation
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
