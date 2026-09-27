import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconSearch, IconSparkles } from "./Icons";

const QUICK_SUGGESTIONS = [
  "🎓 Student education scholarships",
  "🏠 PMAY housing subsidy",
  "🌾 Farmer income support ₹6000",
  "🚀 Startup seed funding",
  "💼 Mudra collateral-free business loan",
];

export default function SearchBar({ placeholder = "Ask in plain English, e.g. 'financial help for undergraduate studies'..." }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate("/chat", { state: { initialQuestion: query } });
    }
  };

  const handleSuggestionClick = (suggestion) => {
    const cleanText = suggestion.replace(/^[^\s]+\s/, ""); // Remove emoji
    navigate("/chat", { state: { initialQuestion: cleanText } });
  };

  return (
    <div style={{ width: "100%", maxWidth: "720px", margin: "0 auto" }}>
      <form
        onSubmit={handleSubmit}
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          background: "#FFFFFF",
          borderRadius: "16px",
          padding: "0.45rem 0.55rem 0.45rem 1.25rem",
          boxShadow: "0 10px 30px -5px rgba(37, 65, 178, 0.15), 0 0 0 1px rgba(37, 65, 178, 0.12)",
          transition: "all 0.2s ease",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", marginRight: "0.75rem", userSelect: "none" }}>
          <IconSearch size={20} color="#2563EB" />
        </span>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            fontSize: "1.02rem",
            color: "#0F172A",
            fontFamily: "inherit",
            background: "transparent",
            padding: "0.6rem 0",
          }}
        />
        <button
          type="submit"
          className="btn-accent"
          style={{
            borderRadius: "12px",
            padding: "0.75rem 1.5rem",
            fontSize: "0.95rem",
            fontWeight: 700,
            whiteSpace: "nowrap",
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
          }}
        >
          <span>Ask AI</span>
          <span>→</span>
        </button>
      </form>

      {/* Quick Suggestions Chips */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          marginTop: "0.85rem",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <span style={{ fontSize: "0.75rem", color: "#64748B", fontWeight: 600 }}>Try asking:</span>
        {QUICK_SUGGESTIONS.map((item, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSuggestionClick(item)}
            style={{
              background: "#FFFFFF",
              border: "1px solid #E2E8F0",
              borderRadius: "999px",
              padding: "0.25rem 0.75rem",
              fontSize: "0.78rem",
              fontWeight: 600,
              color: "#334155",
              cursor: "pointer",
              transition: "all 0.15s ease",
              boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = "#2541B2";
              e.currentTarget.style.color = "#2541B2";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = "#E2E8F0";
              e.currentTarget.style.color = "#334155";
              e.currentTarget.style.transform = "none";
            }}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
