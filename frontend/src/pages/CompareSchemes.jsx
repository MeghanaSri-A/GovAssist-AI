import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { listSchemes, compareSchemes } from "../services/eligibility";
import LoadingAnimation from "../components/LoadingAnimation";

export default function CompareSchemes() {
  const [schemes, setSchemes] = useState([]);
  const [schemeA, setSchemeA] = useState("");
  const [schemeB, setSchemeB] = useState("");
  const [comparison, setComparison] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    listSchemes({ limit: 200 }).then(setSchemes);
  }, []);

  const handleCompare = async () => {
    if (!schemeA || !schemeB) return;
    setIsLoading(true);
    try {
      const result = await compareSchemes(Number(schemeA), Number(schemeB));
      setComparison(result.comparison);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container" style={{ paddingTop: "2rem", paddingBottom: "3rem", maxWidth: 700, marginInline: "auto" }}>
      <h2>Compare Schemes</h2>
      <div className="card" style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
        <select value={schemeA} onChange={(e) => setSchemeA(e.target.value)} style={{ flex: 1, padding: "0.6rem", borderRadius: 8 }}>
          <option value="">Scheme A</option>
          {schemes.map((s) => (
            <option key={s.id} value={s.id}>
              {s.scheme_name}
            </option>
          ))}
        </select>
        <span style={{ fontWeight: 700 }}>vs</span>
        <select value={schemeB} onChange={(e) => setSchemeB(e.target.value)} style={{ flex: 1, padding: "0.6rem", borderRadius: 8 }}>
          <option value="">Scheme B</option>
          {schemes.map((s) => (
            <option key={s.id} value={s.id}>
              {s.scheme_name}
            </option>
          ))}
        </select>
        <button className="btn-primary" onClick={handleCompare} disabled={!schemeA || !schemeB || isLoading}>
          Compare
        </button>
      </div>

      {isLoading && (
        <div style={{ marginTop: "1.5rem" }}>
          <LoadingAnimation label="Comparing schemes..." />
        </div>
      )}

      {comparison && (
        <div className="card" style={{ marginTop: "1.5rem" }}>
          <ReactMarkdown>{comparison}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}
