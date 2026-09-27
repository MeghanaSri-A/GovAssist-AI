import { Link } from "react-router-dom";
import { EmblemLogo, IndianFlag } from "./Icons";

export default function Footer() {
  return (
    <footer
      style={{
        background: "#0F172A",
        color: "#94A3B8",
        borderTop: "1px solid #1E293B",
        marginTop: "4rem",
        paddingTop: "3.5rem",
        paddingBottom: "2rem",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "2.5rem",
            paddingBottom: "2.5rem",
            borderBottom: "1px solid #1E293B",
          }}
        >
          {/* Brand Info */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
              <EmblemLogo size={36} />
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <span style={{ color: "#FFFFFF", fontWeight: 800, fontSize: "1.2rem", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  GovAssist
                </span>
                <span
                  style={{
                    background: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
                    color: "#FFFFFF",
                    fontSize: "0.7rem",
                    fontWeight: 800,
                    padding: "2px 6px",
                    borderRadius: "5px",
                  }}
                >
                  AI
                </span>
              </div>
            </div>
            <p style={{ fontSize: "0.88rem", lineHeight: 1.6, color: "#94A3B8", marginBottom: "1.2rem" }}>
              Empowering Indian citizens to discover, understand, and apply for government welfare schemes with grounded AI reasoning and official document citations.
            </p>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.4rem 0.8rem", borderRadius: "8px", background: "rgba(16, 185, 129, 0.12)", border: "1px solid rgba(16, 185, 129, 0.3)", color: "#34D399", fontSize: "0.8rem", fontWeight: 600 }}>
              <span>✓</span> Grounded in Official Guidelines
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: "#F8FAFC", fontSize: "0.95rem", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Explore Services
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem", fontSize: "0.9rem" }}>
              <li><Link to="/explorer" style={{ color: "#CBD5E1" }}>📚 All Government Schemes</Link></li>
              <li><Link to="/eligibility" style={{ color: "#CBD5E1" }}>🎯 Instant Eligibility Checker</Link></li>
              <li><Link to="/chat" style={{ color: "#CBD5E1" }}>🤖 Ask GovAssist AI</Link></li>
              <li><Link to="/compare" style={{ color: "#CBD5E1" }}>⚖️ Side-by-Side Comparison</Link></li>
              <li><Link to="/saved" style={{ color: "#CBD5E1" }}>❤️ Saved Bookmarks</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 style={{ color: "#F8FAFC", fontSize: "0.95rem", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Top Categories
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem", fontSize: "0.9rem" }}>
              <li><Link to="/explorer?category=education" style={{ color: "#CBD5E1" }}>🎓 Student Scholarships</Link></li>
              <li><Link to="/explorer?category=housing" style={{ color: "#CBD5E1" }}>🏠 PM Awas Housing Subsidy</Link></li>
              <li><Link to="/explorer?category=agriculture" style={{ color: "#CBD5E1" }}>🌾 Farmers &amp; Agriculture</Link></li>
              <li><Link to="/explorer?category=employment" style={{ color: "#CBD5E1" }}>💼 Mudra Loans &amp; MSME</Link></li>
              <li><Link to="/explorer?category=healthcare" style={{ color: "#CBD5E1" }}>❤️ Ayushman Bharat Health</Link></li>
            </ul>
          </div>

          {/* Official Portals Disclaimer */}
          <div>
            <h4 style={{ color: "#F8FAFC", fontSize: "0.95rem", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Official Portals
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem", fontSize: "0.85rem" }}>
              <li>
                <a href="https://www.india.gov.in" target="_blank" rel="noreferrer" style={{ color: "#94A3B8", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
                  <IndianFlag width={16} height={11} />
                  <span>National Portal of India (india.gov.in) ↗</span>
                </a>
              </li>
              <li>
                <a href="https://www.mygov.in" target="_blank" rel="noreferrer" style={{ color: "#94A3B8", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
                  <IndianFlag width={16} height={11} />
                  <span>MyGov Citizen Platform ↗</span>
                </a>
              </li>
              <li><a href="https://scholarships.gov.in" target="_blank" rel="noreferrer" style={{ color: "#94A3B8" }}>🎓 National Scholarship Portal ↗</a></li>
              <li><a href="https://pmaymis.gov.in" target="_blank" rel="noreferrer" style={{ color: "#94A3B8" }}>🏠 PMAY Urban Portal ↗</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            paddingTop: "1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
            fontSize: "0.82rem",
            color: "#64748B",
          }}
        >
          <div>
            © {new Date().getFullYear()} GovAssist AI. Developed for Indian citizens to democratize access to welfare schemes.
          </div>
          <div>
            AI answers cite official gazette PDFs • Not an official ministry portal
          </div>
        </div>
      </div>
    </footer>
  );
}
