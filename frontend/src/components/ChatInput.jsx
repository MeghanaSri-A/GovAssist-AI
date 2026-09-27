import { useState } from "react";

export default function ChatInput({ onSend, disabled, placeholder = "Ask anything about Indian government schemes..." }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() || disabled) return;
    onSend(text.trim());
    setText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div style={{ background: "#FFFFFF", borderTop: "1px solid #E2E8F0", padding: "1rem 1.25rem" }}>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          background: "#F8FAFC",
          borderRadius: "14px",
          border: "1px solid #CBD5E1",
          padding: "0.4rem 0.6rem 0.4rem 1rem",
          boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
        }}
      >
        <span style={{ fontSize: "1.2rem", color: "#64748B", userSelect: "none" }}>💬</span>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            background: "transparent",
            fontSize: "0.95rem",
            color: "#0F172A",
            fontFamily: "inherit",
            padding: "0.5rem 0",
          }}
        />

        {text.trim() && (
          <button
            type="button"
            onClick={() => setText("")}
            style={{
              background: "transparent",
              border: "none",
              color: "#94A3B8",
              cursor: "pointer",
              fontSize: "0.9rem",
              padding: "0.2rem",
            }}
            title="Clear text"
          >
            ✕
          </button>
        )}

        <button
          type="submit"
          className="btn-accent"
          disabled={!text.trim() || disabled}
          style={{
            padding: "0.55rem 1.25rem",
            fontSize: "0.9rem",
            borderRadius: "10px",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
          }}
        >
          <span>Send</span>
          <span>→</span>
        </button>
      </form>

      <div style={{ fontSize: "0.75rem", color: "#94A3B8", textAlign: "center", marginTop: "0.5rem" }}>
        GovAssist AI answers are grounded in official scheme PDFs. Press Enter ↵ to send.
      </div>
    </div>
  );
}
