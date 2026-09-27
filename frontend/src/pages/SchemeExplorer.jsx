import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { listSchemes } from "../services/eligibility";
import SchemeCard from "../components/SchemeCard";
import LoadingAnimation from "../components/LoadingAnimation";

const CATEGORIES = [
  { id: "", label: "All Schemes", icon: "🌐" },
  { id: "education", label: "Education", icon: "🎓" },
  { id: "housing", label: "Housing", icon: "🏠" },
  { id: "agriculture", label: "Agriculture", icon: "🌾" },
  { id: "employment", label: "Employment", icon: "💼" },
  { id: "startup", label: "Startups", icon: "🚀" },
  { id: "healthcare", label: "Healthcare", icon: "❤️" },
];

export default function SchemeExplorer() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [schemes, setSchemes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedState, setSelectedState] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  const currentCategory = searchParams.get("category") || "";

  useEffect(() => {
    setIsLoading(true);
    listSchemes({ limit: 100 })
      .then((data) => setSchemes(data))
      .catch(() => setSchemes([]))
      .finally(() => setIsLoading(false));
  }, []);

  // Filter schemes locally for instant, responsive search
  const filteredSchemes = useMemo(() => {
    return schemes
      .filter((s) => {
        // Category filter
        if (currentCategory && s.category?.toLowerCase() !== currentCategory.toLowerCase()) {
          return false;
        }
        // State filter
        if (selectedState !== "all" && s.state !== "All India" && s.state !== selectedState) {
          return false;
        }
        // Search term filter
        if (searchTerm.trim()) {
          const term = searchTerm.toLowerCase();
          const matchName = s.scheme_name?.toLowerCase().includes(term);
          const matchDesc = s.short_description?.toLowerCase().includes(term);
          const matchCat = s.category?.toLowerCase().includes(term);
          if (!matchName && !matchDesc && !matchCat) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "name-asc") return a.scheme_name.localeCompare(b.scheme_name);
        if (sortBy === "name-desc") return b.scheme_name.localeCompare(a.scheme_name);
        if (sortBy === "income-low") return (a.max_income || Infinity) - (b.max_income || Infinity);
        return a.id - b.id;
      });
  }, [schemes, currentCategory, selectedState, searchTerm, sortBy]);

  // Extract unique states for dropdown
  const uniqueStates = useMemo(() => {
    const states = new Set(schemes.map((s) => s.state).filter(Boolean));
    return Array.from(states);
  }, [schemes]);

  const handleCategorySelect = (catId) => {
    if (catId) {
      setSearchParams({ category: catId });
    } else {
      setSearchParams({});
    }
  };

  const handleResetFilters = () => {
    setSearchParams({});
    setSearchTerm("");
    setSelectedState("all");
    setSortBy("default");
  };

  return (
    <div className="container" style={{ paddingTop: "2.5rem", paddingBottom: "4rem" }}>
      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem" }}>
          <span style={{ fontSize: "1.2rem" }}>📚</span>
          <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#2541B2", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Scheme Directory
          </span>
        </div>
        <h1 style={{ fontSize: "2.2rem", color: "#0F172A", marginBottom: "0.5rem" }}>
          Explore Government Schemes
        </h1>
        <p style={{ color: "#64748B", fontSize: "1rem", maxWidth: "650px" }}>
          Search, filter by sector or state, and discover government subsidies, welfare programs, and financial assistance.
        </p>
      </div>

      {/* Filter Toolbar Card */}
      <div
        style={{
          background: "#FFFFFF",
          borderRadius: "16px",
          border: "1px solid #E2E8F0",
          padding: "1.25rem 1.5rem",
          boxShadow: "0 2px 10px rgba(15, 23, 42, 0.04)",
          marginBottom: "1.75rem",
        }}
      >
        {/* Search Input & Dropdowns Row */}
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "1.2rem" }}>
          {/* Live Search Input */}
          <div style={{ flex: "2 1 280px", position: "relative" }}>
            <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#94A3B8" }}>
              🔍
            </span>
            <input
              type="text"
              placeholder="Search scheme by name, keywords, or benefits..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field"
              style={{ paddingLeft: "38px" }}
            />
          </div>

          {/* State Filter */}
          <div style={{ flex: "1 1 180px" }}>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="select-field"
            >
              <option value="all">📍 All States &amp; UTs</option>
              {uniqueStates.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div style={{ flex: "1 1 180px" }}>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="select-field"
            >
              <option value="default">Sort by: Recommended</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
              <option value="income-low">Income Limit: Low to High</option>
            </select>
          </div>
        </div>

        {/* Category Pills Row */}
        <div style={{ display: "flex", gap: "0.5rem", overflowX: "auto", paddingBottom: "0.25rem", alignItems: "center" }}>
          {CATEGORIES.map((c) => {
            const isSelected = currentCategory === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => handleCategorySelect(c.id)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  padding: "0.5rem 1rem",
                  borderRadius: "999px",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  border: isSelected ? "1px solid #2541B2" : "1px solid #E2E8F0",
                  background: isSelected ? "linear-gradient(135deg, #2541B2 0%, #1E3A8A 100%)" : "#F8FAFC",
                  color: isSelected ? "#FFFFFF" : "#475569",
                  transition: "all 0.15s ease",
                  boxShadow: isSelected ? "0 2px 8px rgba(37,65,178,0.25)" : "none",
                }}
              >
                <span>{c.icon}</span>
                <span>{c.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Count Bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem", color: "#64748B", fontSize: "0.9rem" }}>
        <div>
          Showing <strong>{filteredSchemes.length}</strong> {filteredSchemes.length === 1 ? "scheme" : "schemes"}
          {currentCategory && (
            <span> in <strong style={{ textTransform: "capitalize" }}>{currentCategory}</strong></span>
          )}
          {searchTerm && (
            <span> matching "<strong>{searchTerm}</strong>"</span>
          )}
        </div>
        {(currentCategory || searchTerm || selectedState !== "all") && (
          <button
            onClick={handleResetFilters}
            style={{
              background: "transparent",
              border: "none",
              color: "#DC2626",
              cursor: "pointer",
              fontSize: "0.85rem",
              fontWeight: 600,
            }}
          >
            ✕ Reset Filters
          </button>
        )}
      </div>

      {/* Schemes Grid */}
      {isLoading ? (
        <div style={{ padding: "4rem 0" }}>
          <LoadingAnimation label="Fetching verified government schemes..." />
        </div>
      ) : filteredSchemes.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {filteredSchemes.map((s) => (
            <SchemeCard key={s.id} scheme={s} />
          ))}
        </div>
      ) : (
        <div
          className="card"
          style={{
            textAlign: "center",
            padding: "3.5rem 1.5rem",
            background: "#FFFFFF",
            borderRadius: "16px",
          }}
        >
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔍</div>
          <h3 style={{ fontSize: "1.3rem", color: "#1E293B", marginBottom: "0.5rem" }}>
            No schemes found matching your criteria
          </h3>
          <p style={{ color: "#64748B", maxWidth: "450px", margin: "0 auto 1.5rem", fontSize: "0.95rem" }}>
            Try clearing your search filters or ask our AI assistant to search within detailed policy documents.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}>
            <button className="btn-secondary" onClick={handleResetFilters}>
              Clear Filters
            </button>
            <a href="/chat" className="btn-accent">
              Ask AI Assistant
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
