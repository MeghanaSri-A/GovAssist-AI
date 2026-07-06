import { useState } from "react";
import { checkEligibility } from "../services/eligibility";
import EligibilityCard from "../components/EligibilityCard";
import LoadingAnimation from "../components/LoadingAnimation";

const STEPS = ["age", "gender", "state", "occupation", "income", "education", "category"];

const STEP_CONFIG = {
  age: { label: "What is your age?", type: "number" },
  gender: { label: "Gender", type: "select", options: ["male", "female", "other"] },
  state: { label: "Which state do you live in?", type: "text" },
  occupation: { label: "Occupation", type: "text" },
  income: { label: "Annual family income (₹)", type: "number" },
  education: { label: "Highest education level", type: "text" },
  category: { label: "Social category", type: "select", options: ["general", "OBC", "SC", "ST"] },
};

export default function Eligibility() {
  const [stepIndex, setStepIndex] = useState(0);
  const [form, setForm] = useState({});
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const currentKey = STEPS[stepIndex];
  const config = STEP_CONFIG[currentKey];

  const handleNext = async () => {
    if (stepIndex < STEPS.length - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      setIsLoading(true);
      try {
        const payload = {
          age: Number(form.age),
          gender: form.gender,
          state: form.state,
          occupation: form.occupation,
          income: Number(form.income),
          education: form.education,
          category: form.category,
        };
        const data = await checkEligibility(payload);
        setResults(data);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleChange = (value) => setForm({ ...form, [currentKey]: value });

  if (results) {
    return (
      <div className="container" style={{ paddingTop: "2rem", paddingBottom: "3rem" }}>
        <h2>You're eligible for {results.total_matched} scheme(s)</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem", marginTop: "1rem" }}>
          {results.eligible_schemes.map((s) => (
            <EligibilityCard key={s.id} scheme={s} />
          ))}
        </div>
        {results.total_matched === 0 && (
          <p style={{ color: "var(--color-muted)" }}>No exact matches found. Try the AI Chat for a broader search.</p>
        )}
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: "2rem", paddingBottom: "3rem", maxWidth: 500, marginInline: "auto" }}>
      <h2>Eligibility Checker</h2>
      <p style={{ color: "var(--color-muted)" }}>
        Step {stepIndex + 1} of {STEPS.length}
      </p>
      <div className="card">
        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>{config.label}</label>
        {config.type === "select" ? (
          <select
            value={form[currentKey] || ""}
            onChange={(e) => handleChange(e.target.value)}
            style={{ width: "100%", padding: "0.6rem", borderRadius: 8, border: "1px solid var(--color-border)" }}
          >
            <option value="" disabled>
              Select...
            </option>
            {config.options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={config.type}
            value={form[currentKey] || ""}
            onChange={(e) => handleChange(e.target.value)}
            style={{ width: "100%", padding: "0.6rem", borderRadius: 8, border: "1px solid var(--color-border)" }}
          />
        )}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1.5rem" }}>
          <button
            className="btn-primary"
            style={{ background: "var(--color-muted)" }}
            disabled={stepIndex === 0}
            onClick={() => setStepIndex(stepIndex - 1)}
          >
            Back
          </button>
          <button className="btn-primary" onClick={handleNext} disabled={!form[currentKey] || isLoading}>
            {stepIndex === STEPS.length - 1 ? "See Results" : "Next"}
          </button>
        </div>
        {isLoading && (
          <div style={{ marginTop: "1rem" }}>
            <LoadingAnimation label="Matching you with schemes..." />
          </div>
        )}
      </div>
    </div>
  );
}
