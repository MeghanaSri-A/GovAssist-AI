import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import CitationCard from "./CitationCard";
import LoadingAnimation from "./LoadingAnimation";

const STARTER_PROMPTS = [
  "What is PM Awas Yojana (PMAY) and who is eligible for the subsidy?",
  "How can an undergraduate student apply for the National Scholarship Portal?",
  "What are the benefits and loan limits under PM Mudra Yojana?",
  "Are small and marginal farmers eligible for PM-Kisan Samman Nidhi?",
];

export default function ChatBox({ messages, isLoading, onSelectPrompt }) {
  const bottomRef = useRef(null);
  const [copiedIndex, setCopiedIndex] = useState(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div
      style={{
        flex: 1,
        overflowY: "auto",
        padding: "1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        background: "#F8FAFC",
      }}
    >
      {/* Empty State with Starter Prompts */}
      {messages.length === 0 && (
        <div style={{ margin: "auto", maxWidth: "600px", textAlign: "center", padding: "2rem 1rem" }}>
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "16px",
              background: "linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.8rem",
              margin: "0 auto 1.25rem",
              boxShadow: "0 4px 14px rgba(79, 70, 229, 0.15)",
            }}
          >
            🤖
          </div>
          <h3 style={{ fontSize: "1.4rem", color: "#0F172A", marginBottom: "0.5rem" }}>
            How can I help you today?
          </h3>
          <p style={{ color: "#64748B", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "1.75rem" }}>
            Ask anything about Central or State government welfare schemes. I will explain the guidelines in plain English and cite the exact official documents.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", textAlign: "left" }}>
            <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#94A3B8", textTransform: "uppercase" }}>
              Popular Questions:
            </span>
            {STARTER_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onSelectPrompt && onSelectPrompt(prompt)}
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #E2E8F0",
                  borderRadius: "10px",
                  padding: "0.75rem 1rem",
                  fontSize: "0.88rem",
                  color: "#334155",
                  fontWeight: 500,
                  cursor: "pointer",
                  textAlign: "left",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  transition: "all 0.15s ease",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = "#2541B2";
                  e.currentTarget.style.background = "#F8FAFF";
                  e.currentTarget.style.color = "#2541B2";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = "#E2E8F0";
                  e.currentTarget.style.background = "#FFFFFF";
                  e.currentTarget.style.color = "#334155";
                }}
              >
                <span>{prompt}</span>
                <span style={{ color: "#94A3B8" }}>→</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Messages Thread */}
      {messages.map((msg, idx) => (
        <div
          key={idx}
          style={{
            display: "flex",
            gap: "0.75rem",
            alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
            maxWidth: "85%",
          }}
        >
          {/* Avatar for assistant */}
          {msg.role === "assistant" && (
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #2541B2 0%, #1E3A8A 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1rem",
                flexShrink: 0,
                color: "#FFFFFF",
                boxShadow: "0 2px 8px rgba(37,65,178,0.3)",
              }}
            >
              🤖
            </div>
          )}

          {/* Bubble Container */}
          <div
            style={{
              background: msg.role === "user" ? "linear-gradient(135deg, #2541B2 0%, #1E3A8A 100%)" : "#FFFFFF",
              color: msg.role === "user" ? "#FFFFFF" : "#0F172A",
              border: msg.role === "user" ? "none" : "1px solid #E2E8F0",
              borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
              padding: "1rem 1.25rem",
              boxShadow: msg.role === "user" ? "0 4px 12px rgba(37,65,178,0.25)" : "0 2px 10px rgba(0,0,0,0.04)",
              position: "relative",
            }}
          >
            {/* Copy button for assistant responses */}
            {msg.role === "assistant" && (
              <button
                type="button"
                onClick={() => handleCopy(msg.content, idx)}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "0.8rem",
                  color: "#94A3B8",
                  padding: "4px 8px",
                  borderRadius: "6px",
                }}
                title="Copy response"
              >
                {copiedIndex === idx ? "✓ Copied" : "📋"}
              </button>
            )}

            {/* Content Body */}
            <div
              className="chat-markdown"
              style={{
                fontSize: "0.95rem",
                lineHeight: 1.6,
                wordBreak: "break-word",
              }}
            >
              <style>{`
                .chat-markdown p { margin-bottom: 0.6rem; }
                .chat-markdown p:last-child { margin-bottom: 0; }
                .chat-markdown ul, .chat-markdown ol { margin: 0.5rem 0 0.8rem 1.4rem; }
                .chat-markdown li { margin-bottom: 0.3rem; }
                .chat-markdown h3, .chat-markdown h4 { margin: 0.8rem 0 0.4rem; color: #1E293B; }
                .chat-markdown strong { font-weight: 700; }
              `}</style>
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            </div>

            {/* Citations Footer */}
            {msg.sources?.length > 0 && (
              <div
                style={{
                  marginTop: "1rem",
                  paddingTop: "0.75rem",
                  borderTop: "1px solid #F1F5F9",
                }}
              >
                <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "0.25rem" }}>
                  Verified Citations ({msg.sources.length}):
                </div>
                <div>
                  {msg.sources.map((s, j) => (
                    <CitationCard key={j} source={s} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Loading state */}
      {isLoading && (
        <div style={{ display: "flex", gap: "0.75rem", alignSelf: "flex-start", alignItems: "center" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              background: "#EEF2FF",
              color: "#2541B2",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1rem",
            }}
          >
            🤖
          </div>
          <div
            style={{
              background: "#FFFFFF",
              border: "1px solid #E2E8F0",
              borderRadius: "16px",
              padding: "0.75rem 1.25rem",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            }}
          >
            <LoadingAnimation label="Searching official guidelines &amp; synthesizing answer..." />
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
