import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSchemeDetail, addBookmark } from "../services/eligibility";
import LoadingAnimation from "../components/LoadingAnimation";

export default function SchemeDetails() {
  const { id } = useParams();
  const [scheme, setScheme] = useState(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getSchemeDetail(id).then(setScheme);
  }, [id]);

  const handleSave = async () => {
    try {
      await addBookmark(id);
      setSaved(true);
    } catch {
      // likely not logged in; ignore for skeleton
    }
  };

  if (!scheme) {
    return (
      <div className="container" style={{ paddingTop: "2rem" }}>
        <LoadingAnimation label="Loading scheme..." />
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: "2rem", paddingBottom: "3rem", maxWidth: 800 }}>
      <div style={{ fontSize: "0.8rem", color: "var(--color-accent)", fontWeight: 700, textTransform: "uppercase" }}>
        {scheme.category} · {scheme.state}
      </div>
      <h1>{scheme.scheme_name}</h1>
      <p style={{ color: "var(--color-muted)" }}>{scheme.short_description}</p>

      <div className="card" style={{ marginTop: "1.5rem" }}>
        <h3>Eligibility</h3>
        <ul>
          {scheme.min_age && <li>Minimum age: {scheme.min_age}</li>}
          {scheme.max_age && <li>Maximum age: {scheme.max_age}</li>}
          {scheme.gender && scheme.gender !== "any" && <li>Gender: {scheme.gender}</li>}
          {scheme.max_income && <li>Max family income: ₹{scheme.max_income.toLocaleString()}</li>}
          {scheme.occupation && <li>Occupation: {scheme.occupation}</li>}
          {scheme.education_level && <li>Education: {scheme.education_level}</li>}
          {scheme.social_category && <li>Social category: {scheme.social_category}</li>}
        </ul>
      </div>

      <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem" }}>
        {scheme.official_url && (
          <a href={scheme.official_url} target="_blank" rel="noreferrer" className="btn-primary">
            Apply on Official Website
          </a>
        )}
        <button className="btn-accent" onClick={handleSave} disabled={saved}>
          {saved ? "Saved ❤️" : "Save Scheme"}
        </button>
      </div>
    </div>
  );
}
