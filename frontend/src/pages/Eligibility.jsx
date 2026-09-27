import { useState } from "react";
import { checkEligibility } from "../services/eligibility";
import EligibilityCard from "../components/EligibilityCard";
import LoadingAnimation from "../components/LoadingAnimation";

const STATES = [
  "All India", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa",
  "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
  "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan",
  "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi"
];

const PRESET_PROFILES = [
  {
    label: "🎓 College Student",
    data: { age: 20, gender: "male", state: "All India", occupation: "student", income: 200000, education: "undergraduate", category: "OBC" }
  },
  {
    label: "🌾 Marginal Farmer",
    data: { age: 38, gender: "any", state: "Uttar Pradesh", occupation: "farmer", income: 150000, education: "secondary", category: "general" }
  },
  {
    label: "💼 Small Business / MSME",
    data: { age: 29, gender: "female", state: "Maharashtra", occupation: "self-employed", income: 350000, education: "graduate", category: "SC" }
  },
  {
    label: "🏠 Urban Low Income Family",
    data: { age: 34, gender: "female", state: "Delhi", occupation: "daily wage", income: 180000, education: "primary", category: "ST" }
  },
];

export default function Eligibility() {
  const [form, setForm] = useState({
    age: "24",
    gender: "any",
    state: "All India",
    occupation: "student",
    income: "200000",
    education: "undergraduate",
    category: "general",
  });

  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleApplyPreset = (preset) => {
    setForm({
      age: String(preset.age),
      gender: preset.gender,
      state: preset.state,
      occupation: preset.occupation,
      income: String(preset.income),
      education: preset.education,
      category: preset.category,
    });
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const payload = {
        age: Number(form.age) || 18,
        gender: form.gender,
        state: form.state,
        occupation: form.occupation,
        income: Number(form.income) || 0,
        education: form.education,
        category: form.category,
      };
      const data = await checkEligibility(payload);
      setResults(data);
    } catch {
      setError("Unable to process eligibility query. Please check inputs and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container" style={{ paddingTop: "2.5rem", paddingBottom: "4rem", maxWidth: 960 }}>
      {/* Title */}
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.3rem 0.8rem", borderRadius: "999px", background: "#ECFDF5", border: "1px solid #A7F3D0", color: "#065F46", fontSize: "0.8rem", fontWeight: 700, marginBottom: "0.8rem" }}>
          <span>⚡</span> Instant Rules Engine • Zero Login Required
        </div>
        <h1 style={{ fontSize: "2.4rem", color: "#0F172A", marginBottom: "0.5rem" }}>
          Citizen Scheme Eligibility Checker
        </h1>
        <p style={{ color: "#64748B", maxWidth: "600px", margin: "0 auto", fontSize: "1rem" }}>
          Fill in your details below to instantly discover which central and state subsidies, student grants, and housing schemes you qualify for.
        </p>
      </div>

      {/* Preset Quick-Fill Bar */}
      <div
        style={{
          background: "#FFFFFF",
          border: "1px solid #E2E8F0",
          borderRadius: "14px",
          padding: "1rem 1.25rem",
          marginBottom: "2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "0.75rem",
        }}
      >
        <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#334155" }}>
          💡 Try sample citizen profiles:
        </span>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {PRESET_PROFILES.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleApplyPreset(p.data)}
              style={{
                background: "#F8FAFC",
                border: "1px solid #CBD5E1",
                borderRadius: "8px",
                padding: "0.35rem 0.75rem",
                fontSize: "0.82rem",
                fontWeight: 600,
                color: "#1E293B",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = "#2541B2";
                e.currentTarget.style.background = "#EEF2FF";
                e.currentTarget.style.color = "#2541B2";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = "#CBD5E1";
                e.currentTarget.style.background = "#F8FAFC";
                e.currentTarget.style.color = "#1E293B";
              }}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Form Card */}
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#FFFFFF",
          border: "1px solid #E2E8F0",
          borderRadius: "18px",
          padding: "2rem",
          boxShadow: "0 4px 20px rgba(15, 23, 42, 0.05)",
          marginBottom: "2.5rem",
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem", marginBottom: "1.5rem" }}>
          
          {/* Age */}
          <div>
            <label style={{ display: "block", fontSize: "0.88rem", fontWeight: 600, color: "#334155", marginBottom: "0.4rem" }}>
              Age (Years) *
            </label>
            <input
              type="number"
              min="1"
              max="120"
              value={form.age}
              onChange={(e) => handleChange("age", e.target.value)}
              className="input-field"
              required
            />
          </div>

          {/* Gender */}
          <div>
            <label style={{ display: "block", fontSize: "0.88rem", fontWeight: 600, color: "#334155", marginBottom: "0.4rem" }}>
              Gender *
            </label>
            <select
              value={form.gender}
              onChange={(e) => handleChange("gender", e.target.value)}
              className="select-field"
            >
              <option value="any">Any / Prefer not to say</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* State */}
          <div>
            <label style={{ display: "block", fontSize: "0.88rem", fontWeight: 600, color: "#334155", marginBottom: "0.4rem" }}>
              State of Residence *
            </label>
            <select
              value={form.state}
              onChange={(e) => handleChange("state", e.target.value)}
              className="select-field"
            >
              {STATES.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          {/* Social Category */}
          <div>
            <label style={{ display: "block", fontSize: "0.88rem", fontWeight: 600, color: "#334155", marginBottom: "0.4rem" }}>
              Social Category *
            </label>
            <select
              value={form.category}
              onChange={(e) => handleChange("category", e.target.value)}
              className="select-field"
            >
              <option value="general">General</option>
              <option value="OBC">OBC (Other Backward Classes)</option>
              <option value="SC">SC (Scheduled Castes)</option>
              <option value="ST">ST (Scheduled Tribes)</option>
              <option value="any">Any Category</option>
            </select>
          </div>

          {/* Occupation */}
          <div>
            <label style={{ display: "block", fontSize: "0.88rem", fontWeight: 600, color: "#334155", marginBottom: "0.4rem" }}>
              Occupation / Profession *
            </label>
            <input
              type="text"
              placeholder="e.g. Student, Farmer, Self-employed, Unemployed"
              value={form.occupation}
              onChange={(e) => handleChange("occupation", e.target.value)}
              className="input-field"
              required
            />
          </div>

          {/* Annual Family Income */}
          <div>
            <label style={{ display: "block", fontSize: "0.88rem", fontWeight: 600, color: "#334155", marginBottom: "0.4rem" }}>
              Annual Family Income (₹) *
            </label>
            <input
              type="number"
              min="0"
              step="10000"
              placeholder="e.g. 250000"
              value={form.income}
              onChange={(e) => handleChange("income", e.target.value)}
              className="input-field"
              required
            />
            <div style={{ display: "flex", gap: "0.4rem", marginTop: "0.4rem", flexWrap: "wrap" }}>
              {[150000, 250000, 500000, 800000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => handleChange("income", String(amt))}
                  style={{
                    background: "#F1F5F9",
                    border: "none",
                    borderRadius: "4px",
                    padding: "0.15rem 0.5rem",
                    fontSize: "0.72rem",
                    color: "#475569",
                    cursor: "pointer",
                  }}
                >
                  ₹{(amt / 100000).toFixed(1)}L
                </button>
              ))}
            </div>
          </div>

          {/* Education Level */}
          <div style={{ gridColumn: "1 / -1" }}>
            <label style={{ display: "block", fontSize: "0.88rem", fontWeight: 600, color: "#334155", marginBottom: "0.4rem" }}>
              Highest Education Level
            </label>
            <input
              type="text"
              placeholder="e.g. 10th pass, 12th pass, undergraduate, graduate, postgraduate"
              value={form.education}
              onChange={(e) => handleChange("education", e.target.value)}
              className="input-field"
            />
          </div>

        </div>

        {error && (
          <div style={{ padding: "0.8rem 1rem", borderRadius: "10px", background: "#FEF2F2", border: "1px solid #FECACA", color: "#DC2626", marginBottom: "1rem", fontSize: "0.9rem" }}>
            {error}
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            type="submit"
            className="btn-accent"
            disabled={isLoading}
            style={{ padding: "0.85rem 2.2rem", fontSize: "1.05rem" }}
          >
            {isLoading ? "Matching Schemes..." : "Check Eligible Schemes 🎯"}
          </button>
        </div>
      </form>

      {/* Loading State */}
      {isLoading && (
        <div style={{ padding: "3rem 0" }}>
          <LoadingAnimation label="Analyzing income thresholds, age brackets &amp; state policies..." />
        </div>
      )}

      {/* Results Section */}
      {results && !isLoading && (
        <div style={{ marginTop: "1rem" }}>
          <div
            style={{
              background: results.total_matched > 0 ? "linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)" : "#FEF3C7",
              border: results.total_matched > 0 ? "1px solid #A7F3D0" : "1px solid #FDE68A",
              borderRadius: "16px",
              padding: "1.5rem 2rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1rem",
              marginBottom: "2rem",
            }}
          >
            <div>
              <h2 style={{ fontSize: "1.6rem", color: results.total_matched > 0 ? "#065F46" : "#92400E", marginBottom: "0.3rem" }}>
                {results.total_matched > 0
                  ? `🎉 You are eligible for ${results.total_matched} government scheme(s)!`
                  : "No exact matches found for these strict parameters."}
              </h2>
              <p style={{ color: results.total_matched > 0 ? "#047857" : "#B45309", margin: 0, fontSize: "0.95rem" }}>
                {results.total_matched > 0
                  ? "Based on your income, age, and state requirements, you meet all primary criteria below."
                  : "Try loosening income or category filters, or ask our AI assistant for broader benefits."}
              </p>
            </div>

            <button
              onClick={() => {
                window.scrollTo({ top: 100, behavior: "smooth" });
              }}
              className="btn-secondary btn-sm"
              style={{ background: "#FFFFFF" }}
            >
              Modify Profile ✎
            </button>
          </div>

          {/* Cards Grid */}
          {results.total_matched > 0 ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
              {results.eligible_schemes.map((s) => (
                <EligibilityCard key={s.id} scheme={s} />
              ))}
            </div>
          ) : (
            <div className="card" style={{ textAlign: "center", padding: "3rem" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "0.8rem" }}>💬</div>
              <h3 style={{ marginBottom: "0.5rem" }}>Want to search beyond exact rules?</h3>
              <p style={{ color: "#64748B", maxWidth: "480px", margin: "0 auto 1.5rem" }}>
                Our AI Chat assistant can search across policy fine print and discretionary quotas.
              </p>
              <a href="/chat" className="btn-primary">
                Open AI Assistant
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
