import ReactMarkdown from "react-markdown";
import CitationCard from "./CitationCard";
import LoadingAnimation from "./LoadingAnimation";

export default function ChatBox({ messages, isLoading }) {
  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
      {messages.length === 0 && (
        <p style={{ color: "var(--color-muted)" }}>
          Ask me anything about government schemes — e.g. "I need money for higher education".
        </p>
      )}
      {messages.map((msg, i) => (
        <div
          key={i}
          style={{
            alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
            maxWidth: "75%",
            background: msg.role === "user" ? "var(--color-primary)" : "var(--color-secondary)",
            color: msg.role === "user" ? "white" : "var(--color-text)",
            border: msg.role === "user" ? "none" : "1px solid var(--color-border)",
            borderRadius: 14,
            padding: "0.8rem 1rem",
          }}
        >
          <ReactMarkdown>{msg.content}</ReactMarkdown>
          {msg.sources?.length > 0 && (
            <div style={{ marginTop: "0.5rem" }}>
              {msg.sources.map((s, j) => (
                <CitationCard key={j} source={s} />
              ))}
            </div>
          )}
        </div>
      ))}
      {isLoading && <LoadingAnimation label="Searching scheme documents..." />}
    </div>
  );
}
