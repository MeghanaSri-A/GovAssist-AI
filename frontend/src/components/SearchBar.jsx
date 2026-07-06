import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar({ placeholder = "Ask about a scheme... e.g. 'money for higher education'" }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate("/chat", { state: { initialQuestion: query } });
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: "0.5rem", maxWidth: 600 }}>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        style={{ flex: 1, padding: "0.7rem 1rem", borderRadius: 10, border: "1px solid var(--color-border)" }}
      />
      <button type="submit" className="btn-primary">
        Search
      </button>
    </form>
  );
}
