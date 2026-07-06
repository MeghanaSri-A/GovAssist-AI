import { useState } from "react";

export default function ChatInput({ onSend, disabled }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() || disabled) return;
    onSend(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: "0.5rem", padding: "1rem", borderTop: "1px solid var(--color-border)" }}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Ask about any government scheme..."
        disabled={disabled}
        style={{ flex: 1, padding: "0.7rem 1rem", borderRadius: 10, border: "1px solid var(--color-border)" }}
      />
      <button type="submit" className="btn-primary" disabled={disabled}>
        Send
      </button>
    </form>
  );
}
