import { useEffect, useState } from "react";
import { listBookmarks } from "../services/eligibility";
import SchemeCard from "../components/SchemeCard";
import LoadingAnimation from "../components/LoadingAnimation";

export default function SavedSchemes() {
  const [schemes, setSchemes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    listBookmarks()
      .then(setSchemes)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="container" style={{ paddingTop: "2rem", paddingBottom: "3rem" }}>
      <h2>Saved Schemes</h2>
      {isLoading ? (
        <LoadingAnimation label="Loading your saved schemes..." />
      ) : schemes.length === 0 ? (
        <p style={{ color: "var(--color-muted)" }}>You haven't saved any schemes yet.</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
          {schemes.map((s) => (
            <SchemeCard key={s.id} scheme={s} />
          ))}
        </div>
      )}
    </div>
  );
}
