import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { listSchemes, compareSchemes } from "../services/eligibility";
import LoadingAnimation from "../components/LoadingAnimation";

export default function CompareSchemes() {
  const [schemes, setSchemes] = useState([]);
  const [schemeAId, setSchemeAId] = useState("");
  const [schemeBId, setSchemeBId] = useState("");
  const [comparison, setComparison] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    listSchemes({ limit: 100 })
      .then((data) => {
        setSchemes(data);
        if (data.length >= 2) {
          setSchemeAId(String(data[0].id));
          setSchemeBId(String(data[1].id));
        }
      });
  }, []);

  const schemeA = schemes.find((s) => String(s.id) === String(schemeAId));
  const schemeB = schemes.find((s) => String(s.id) === String(schemeBId));

  const handleCompare = async () => {
    if (!schemeAId || !schemeBId || schemeAId === schemeBId) return;
    setIsLoading(true);
    setComparison("");
    try {
      const result = await compareSchemes(Number(schemeAId), Number(schemeBId));
      setComparison(result.comparison);
    } catch {
      setComparison("Unable to generate AI comparison. Please ensure both schemes are valid.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwap = () => {
    setSchemeAId(schemeBId);
    setSchemeBId(schemeAId);
  };

  return (
    <div className="container" style={{ paddingTop: "2.5rem", paddingBottom: "4rem", maxWidth: 980 }}>
      {/* Title */}
      <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.3rem 0.8rem", borderRadius: "999px", background: "#EEF2FF", border: "1px solid #C7D2FE", color: "#3730A3", fontSize: "0.8rem", fontWeight: 700, marginBottom: "0.8rem" }}>
          <span>⚖️</span> Head-to-Head Scheme Analysis
        </div>
        <h1 style={{ fontSize: "2.4rem", color: "#0F172A", marginBottom: "0.5rem" }}>
          Side-by-Side Scheme Comparison
        </h1>
        <p style={{ color: "#64748B", maxWidth: "600px", margin: "0 auto", fontSize: "1rem" }}>
          Compare eligibility requirements, income ceilings, and welfare benefits across any two government schemes.
        </p>
      </div>

      {/* Selectors Card */}
      <div
        className="card"
        style={{
          padding: "1.75rem",
          borderRadius: "18px",
          background: "#FFFFFF",
          marginBottom: "2rem",
          boxShadow: "0 4px 20px rgba(15, 23, 42, 0.05)",
        }}
      >
        <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
          
          {/* Scheme A Selector */}
          <div style={{ flex: 1, minWidth: "240px" }}>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "#1E3A8A", marginBottom: "0.4rem" }}>
              Scheme A
            </label>
            <select
              value={schemeAId}
              onChange={(e) => setSchemeAId(e.target.value)}
              className="select-field"
            >
              <option value="" disabled>Select Scheme A</option>
              {schemes.map((s) => (
                <option key={s.id} value={s.id} disabled={String(s.id) === String(schemeBId)}>
                  {s.scheme_name} ({s.category})
                </option>
              ))}
            </select>
          </div>

          {/* Swap / VS Button */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "1.2rem" }}>
            <button
              type="button"
              onClick={handleSwap}
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "50%",
                background: "#F1F5F9",
                border: "1px solid #CBD5E1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.1rem",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
              title="Swap schemes"
            >
              ⇄
            </button>
          </div>

          {/* Scheme B Selector */}
          <div style={{ flex: 1, minWidth: "240px" }}>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "#EA580C", marginBottom: "0.4rem" }}>
              Scheme B
            </label>
            <select
              value={schemeBId}
              onChange={(e) => setSchemeBId(e.target.value)}
              className="select-field"
            >
              <option value="" disabled>Select Scheme B</option>
              {schemes.map((s) => (
                <option key={s.id} value={s.id} disabled={String(s.id) === String(schemeAId)}>
                  {s.scheme_name} ({s.category})
                </option>
              ))}
            </select>
          </div>

          {/* Compare Button */}
          <div style={{ paddingTop: "1.2rem", width: "100%", textAlign: "center" }}>
            <button
              className="btn-accent"
              onClick={handleCompare}
              disabled={!schemeAId || !schemeBId || schemeAId === schemeBId || isLoading}
              style={{ padding: "0.8rem 2.2rem", fontSize: "1rem" }}
            >
              {isLoading ? "Analyzing Schemes with AI..." : "Run AI Deep Comparison ⚡"}
            </button>
          </div>

        </div>
      </div>

      {/* Side by Side Specs Comparison Table */}
      {schemeA && schemeB && (
        <div
          className="card"
          style={{
            padding: "0",
            overflow: "hidden",
            borderRadius: "16px",
            marginBottom: "2rem",
            background: "#FFFFFF",
          }}
        >
          <div style={{ padding: "1.25rem 1.5rem", background: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
            <h3 style={{ fontSize: "1.15rem", margin: 0 }}>Specification Comparison</h3>
          </div>

          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
            <thead>
              <tr style={{ background: "#F1F5F9", textAlign: "left" }}>
                <th style={{ padding: "0.9rem 1.25rem", width: "25%", color: "#64748B", fontWeight: 600 }}>Feature</th>
                <th style={{ padding: "0.9rem 1.25rem", width: "37.5%", color: "#1E3A8A", fontWeight: 700 }}>{schemeA.scheme_name}</th>
                <th style={{ padding: "0.9rem 1.25rem", width: "37.5%", color: "#EA580C", fontWeight: 700 }}>{schemeB.scheme_name}</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid #F1F5F9" }}>
                <td style={{ padding: "0.85rem 1.25rem", color: "#64748B", fontWeight: 600 }}>Sector / Category</td>
                <td style={{ padding: "0.85rem 1.25rem", textTransform: "capitalize", fontWeight: 600 }}>{schemeA.category}</td>
                <td style={{ padding: "0.85rem 1.25rem", textTransform: "capitalize", fontWeight: 600 }}>{schemeB.category}</td>
              </tr>
              <tr style={{ borderBottom: "1px solid #F1F5F9" }}>
                <td style={{ padding: "0.85rem 1.25rem", color: "#64748B", fontWeight: 600 }}>Geographic Coverage</td>
                <td style={{ padding: "0.85rem 1.25rem" }}>{schemeA.state || "All India"}</td>
                <td style={{ padding: "0.85rem 1.25rem" }}>{schemeB.state || "All India"}</td>
              </tr>
              <tr style={{ borderBottom: "1px solid #F1F5F9" }}>
                <td style={{ padding: "0.85rem 1.25rem", color: "#64748B", fontWeight: 600 }}>Description</td>
                <td style={{ padding: "0.85rem 1.25rem", lineHeight: 1.5 }}>{schemeA.short_description}</td>
                <td style={{ padding: "0.85rem 1.25rem", lineHeight: 1.5 }}>{schemeB.short_description}</td>
              </tr>
              <tr>
                <td style={{ padding: "0.85rem 1.25rem", color: "#64748B", fontWeight: 600 }}>Official Portal</td>
                <td style={{ padding: "0.85rem 1.25rem" }}>
                  {schemeA.official_url ? (
                    <a href={schemeA.official_url} target="_blank" rel="noreferrer" style={{ color: "#2541B2", fontWeight: 600 }}>
                      Visit Official Site ↗
                    </a>
                  ) : "N/A"}
                </td>
                <td style={{ padding: "0.85rem 1.25rem" }}>
                  {schemeB.official_url ? (
                    <a href={schemeB.official_url} target="_blank" rel="noreferrer" style={{ color: "#2541B2", fontWeight: 600 }}>
                      Visit Official Site ↗
                    </a>
                  ) : "N/A"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Loading Animation */}
      {isLoading && (
        <div style={{ padding: "3rem 0" }}>
          <LoadingAnimation label="Comparing official scheme parameters with Gemini AI..." />
        </div>
      )}

      {/* AI Comparison Results Card */}
      {comparison && !isLoading && (
        <div
          className="card"
          style={{
            borderRadius: "18px",
            background: "#FFFFFF",
            padding: "2rem",
            border: "1px solid #C7D2FE",
            boxShadow: "0 8px 30px rgba(37, 65, 178, 0.08)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.2rem", paddingBottom: "0.75rem", borderBottom: "1px solid #F1F5F9" }}>
            <span style={{ fontSize: "1.4rem" }}>🤖</span>
            <div>
              <h3 style={{ fontSize: "1.2rem", color: "#1E3A8A", margin: 0 }}>
                AI Comparative Analysis
              </h3>
              <span style={{ fontSize: "0.75rem", color: "#64748B" }}>
                Synthesized for citizens from verified scheme guidelines
              </span>
            </div>
          </div>

          <div
            className="chat-markdown"
            style={{ fontSize: "0.95rem", lineHeight: 1.7, color: "#1E293B" }}
          >
            <ReactMarkdown>{comparison}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}
