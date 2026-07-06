import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { listSchemes } from "../services/eligibility";
import SchemeCard from "../components/SchemeCard";
import LoadingAnimation from "../components/LoadingAnimation";

const CATEGORIES = ["housing", "education", "agriculture", "employment", "startup", "healthcare"];

export default function SchemeExplorer() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [schemes, setSchemes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const category = searchParams.get("category") || "";

  useEffect(() => {
    setIsLoading(true);
    listSchemes(category ? { category } : {})
      .then(setSchemes)
      .finally(() => setIsLoading(false));
  }, [category]);

  return (
    <div className="container" style={{ paddingTop: "2rem", paddingBottom: "3rem" }}>
      <h2>Scheme Explorer</h2>
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
        <button
          className="btn-primary"
          style={{ background: category === "" ? "var(--color-primary)" : "var(--color-muted)" }}
          onClick={() => setSearchParams({})}
        >
          All
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c}
            className="btn-primary"
            style={{ background: category === c ? "var(--color-primary)" : "var(--color-muted)", textTransform: "capitalize" }}
            onClick={() => setSearchParams({ category: c })}
          >
            {c}
          </button>
        ))}
      </div>

      {isLoading ? (
        <LoadingAnimation label="Loading schemes..." />
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
          {schemes.map((s) => (
            <SchemeCard key={s.id} scheme={s} />
          ))}
          {schemes.length === 0 && <p style={{ color: "var(--color-muted)" }}>No schemes found.</p>}
        </div>
      )}
    </div>
  );
}
