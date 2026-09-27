import { useState, useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import ChatBox from "../components/ChatBox";
import ChatInput from "../components/ChatInput";
import { askQuestion } from "../services/rag";
import { useAuth } from "../context/AuthContext";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const { isLoggedIn } = useAuth();
  const hasSentInitial = useRef(false);

  const sendMessage = async (text) => {
    if (!text) return;
    const userMsg = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const history = messages
        .filter((m) => m.role === "user")
        .map((m, i) => ({ question: m.content, answer: messages[i * 2 + 1]?.content || "" }));

      const result = await askQuestion(text, history);
      setMessages((prev) => [...prev, { role: "assistant", content: result.answer, sources: result.sources }]);
    } catch (err) {
      const msg = err?.response?.status === 401
        ? "Please log in to chat with GovAssist AI and save your search history."
        : "Sorry, I encountered an issue retrieving the official scheme guidelines. Please try again.";
      setMessages((prev) => [...prev, { role: "assistant", content: msg }]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (location.state?.initialQuestion && !hasSentInitial.current) {
      hasSentInitial.current = true;
      sendMessage(location.state.initialQuestion);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state]);

  const handleClearChat = () => {
    setMessages([]);
    hasSentInitial.current = false;
  };

  return (
    <div
      className="container"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 120px)",
        paddingTop: "1.25rem",
        paddingBottom: "1.25rem",
      }}
    >
      {/* Chat Header Bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "1rem",
          flexWrap: "wrap",
          gap: "0.75rem",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <h1 style={{ fontSize: "1.6rem", color: "#0F172A", margin: 0 }}>
              AI Scheme Assistant
            </h1>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                padding: "0.2rem 0.6rem",
                borderRadius: "999px",
                background: "#ECFDF5",
                color: "#059669",
                fontSize: "0.75rem",
                fontWeight: 700,
                border: "1px solid #A7F3D0",
              }}
            >
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10B981" }} />
              Live Knowledge Base
            </span>
          </div>
          <p style={{ color: "#64748B", fontSize: "0.85rem", marginTop: "2px" }}>
            Ask in plain English • Grounded answers with exact PDF page citations
          </p>
        </div>

        {messages.length > 0 && (
          <button
            type="button"
            onClick={handleClearChat}
            className="btn-secondary btn-sm"
            style={{ fontSize: "0.82rem" }}
          >
            🗑️ Clear Chat
          </button>
        )}
      </div>

      {/* Login Warning Banner if anonymous */}
      {!isLoggedIn && (
        <div
          style={{
            background: "#FFFBEB",
            border: "1px solid #FDE68A",
            borderRadius: "12px",
            padding: "0.65rem 1rem",
            marginBottom: "0.75rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "0.88rem",
            color: "#92400E",
          }}
        >
          <div>
            🔒 <strong>You are not signed in.</strong> Log in to ask questions and save your consultation history.
          </div>
          <Link to="/login" className="btn-accent btn-sm" style={{ padding: "0.3rem 0.8rem", fontSize: "0.8rem" }}>
            Login Now
          </Link>
        </div>
      )}

      {/* Main Chat Panel */}
      <div
        className="card"
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: 0,
          overflow: "hidden",
          borderRadius: "18px",
          border: "1px solid #CBD5E1",
          boxShadow: "0 8px 30px rgba(15, 23, 42, 0.08)",
        }}
      >
        <ChatBox
          messages={messages}
          isLoading={isLoading}
          onSelectPrompt={(prompt) => sendMessage(prompt)}
        />
        <ChatInput
          onSend={sendMessage}
          disabled={isLoading || !isLoggedIn}
          placeholder={isLoggedIn ? "Ask about any government scheme, eligibility rule, or subsidy..." : "Please log in above to send messages..."}
        />
      </div>
    </div>
  );
}
