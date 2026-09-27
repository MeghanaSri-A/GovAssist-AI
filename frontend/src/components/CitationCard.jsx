import { useState } from "react";

export default function CitationCard({ source }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      style={{
        display: "inline-block",
        marginRight: "0.5rem",
        marginTop: "0.5rem",
        verticalAlign: "top",
      }}
    >
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.4rem",
          fontSize: "0.78rem",
          fontWeight: 600,
          background: expanded ? "#DBEAFE" : "#EFF6FF",
          color: "#1E40AF",
          border: "1px solid #BFDBFE",
          padding: "0.35rem 0.75rem",
          borderRadius: "8px",
          cursor: "pointer",
          transition: "all 0.15s ease",
        }}
        title="Click to view verified source text"
      >
        <span>📄</span>
        <span style={{ maxWidth: "220px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {source.pdf_name}
        </span>
        <span style={{ background: "#2563EB", color: "#FFFFFF", padding: "0.1rem 0.4rem", borderRadius: "4px", fontSize: "0.7rem", fontWeight: 700 }}>
          p.{source.page}
        </span>
        <span style={{ fontSize: "0.7rem", color: "#3B82F6" }}>{expanded ? "▲" : "▼"}</span>
      </button>

      {/* Expandable Snippet Preview */}
      {expanded && source.snippet && (
        <div
          style={{
            marginTop: "0.4rem",
            padding: "0.75rem 0.9rem",
            background: "#F8FAFC",
            border: "1px solid #CBD5E1",
            borderRadius: "8px",
            fontSize: "0.8rem",
            lineHeight: 1.5,
            color: "#334155",
            maxWidth: "380px",
            boxShadow: "0 4px 12px rgba(15, 23, 42, 0.08)",
          }}
        >
          <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#64748B", textTransform: "uppercase", marginBottom: "0.3rem" }}>
            Official Gazette Excerpt (p.{source.page}):
          </div>
          <div style={{ fontStyle: "italic" }}>
            "{source.snippet}..."
          </div>
        </div>
      )}
    </div>
  );
}
