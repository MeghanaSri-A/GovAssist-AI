import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  EmblemLogo,
  IconHome,
  IconSchemes,
  IconEligibility,
  IconAI,
  IconCompare,
  IconBookmark,
  IconShield,
  IconLogout,
  IconMenu,
  IconX,
} from "./Icons";

export default function Navbar() {
  const { user, isLoggedIn, isAdmin, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinks = [
    { to: "/", label: "Home", icon: IconHome },
    { to: "/explorer", label: "Schemes", icon: IconSchemes },
    { to: "/eligibility", label: "Check Eligibility", icon: IconEligibility },
    { to: "/chat", label: "AI Assistant", icon: IconAI, highlight: true },
    { to: "/compare", label: "Compare", icon: IconCompare },
  ];

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  // Derive a pleasant name/initial for user
  const displayName = user?.name || (user?.email ? user.email.split("@")[0] : "Citizen");
  const userInitial = displayName.charAt(0).toUpperCase();

  return (
    <>
      {/* Refined Indian Tricolor Micro Ribbon */}
      <div
        style={{
          height: "3px",
          width: "100%",
          background: "linear-gradient(90deg, #FF9933 0%, #FF9933 33.3%, #FFFFFF 33.3%, #FFFFFF 66.6%, #138808 66.6%, #138808 100%)",
          boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
          zIndex: 1001,
          position: "relative",
        }}
      />

      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          background: "rgba(255, 255, 255, 0.94)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(226, 232, 240, 0.85)",
          boxShadow: "0 4px 20px -4px rgba(15, 23, 42, 0.05)",
          transition: "all 0.2s ease",
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "72px",
            gap: "1rem",
          }}
        >
          {/* Brand Logo & Identification */}
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.85rem",
              textDecoration: "none",
              flexShrink: 0,
            }}
          >
            <EmblemLogo size={42} />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 800,
                    fontSize: "1.25rem",
                    color: "#0F172A",
                    letterSpacing: "-0.03em",
                    lineHeight: 1.2,
                  }}
                >
                  GovAssist
                </span>
                <span
                  style={{
                    background: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
                    color: "#FFFFFF",
                    fontSize: "0.72rem",
                    fontWeight: 800,
                    padding: "2px 7px",
                    borderRadius: "6px",
                    letterSpacing: "0.04em",
                    boxShadow: "0 2px 6px rgba(245, 158, 11, 0.3)",
                  }}
                >
                  AI
                </span>
                <span
                  style={{
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    padding: "2px 8px",
                    borderRadius: "999px",
                    background: "#ECFDF5",
                    color: "#065F46",
                    border: "1px solid #A7F3D0",
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                  className="ga-hide-mobile"
                >
                  <span className="pulse-dot" style={{ marginRight: "2px" }} />
                  Citizen Portal
                </span>
              </div>
              <span
                style={{
                  fontSize: "0.72rem",
                  color: "#64748B",
                  fontWeight: 500,
                  letterSpacing: "-0.01em",
                  marginTop: "1px",
                }}
              >
                National Welfare &amp; Citizen Intelligence
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            style={{ display: "flex", gap: "0.35rem", alignItems: "center" }}
            className="ga-desktop-nav"
          >
            <style>{`
              @media (max-width: 980px) {
                .ga-desktop-nav { display: none !important; }
                .ga-mobile-toggle { display: flex !important; }
                .ga-hide-mobile { display: none !important; }
              }
              @media (min-width: 981px) {
                .ga-mobile-toggle { display: none !important; }
                .ga-mobile-menu { display: none !important; }
              }
              .ga-nav-link {
                display: flex;
                align-items: center;
                gap: 0.45rem;
                padding: 0.5rem 0.85rem;
                border-radius: 9px;
                color: #475569;
                font-family: 'Plus Jakarta Sans', sans-serif;
                font-size: 0.88rem;
                font-weight: 600;
                transition: all 0.18s cubic-bezier(0.16, 1, 0.3, 1);
                text-decoration: none;
                border: 1px solid transparent;
              }
              .ga-nav-link:hover {
                color: #0F172A;
                background: #F1F5F9;
              }
              .ga-nav-link.active {
                color: #1D4ED8;
                background: #EFF6FF;
                border-color: rgba(59, 130, 246, 0.25);
                box-shadow: 0 1px 3px rgba(37, 99, 235, 0.08);
              }
              .ga-ai-spark-tag {
                background: linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%);
                color: #B45309;
                font-size: 0.65rem;
                font-weight: 800;
                padding: 1px 5px;
                border-radius: 4px;
                text-transform: uppercase;
                margin-left: 2px;
                border: 1px solid rgba(245, 158, 11, 0.3);
              }
            `}</style>

            {navLinks.map((link) => {
              const active = isActive(link.to);
              const IconComp = link.icon;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`ga-nav-link ${active ? "active" : ""}`}
                >
                  <IconComp
                    size={17}
                    color={active ? "#1D4ED8" : link.highlight ? "#D97706" : "#64748B"}
                  />
                  <span>{link.label}</span>
                  {link.highlight && (
                    <span className="ga-ai-spark-tag">AI</span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action / Auth Area */}
          <div
            style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}
            className="ga-desktop-nav"
          >
            {isLoggedIn ? (
              <>
                {/* Saved Schemes Link */}
                <Link
                  to="/saved"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    padding: "0.45rem 0.8rem",
                    borderRadius: "8px",
                    background: isActive("/saved") ? "#EFF6FF" : "#F8FAFC",
                    color: isActive("/saved") ? "#1D4ED8" : "#475569",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    textDecoration: "none",
                    border: "1px solid",
                    borderColor: isActive("/saved") ? "rgba(59, 130, 246, 0.3)" : "#E2E8F0",
                    transition: "all 0.15s ease",
                  }}
                  title="Saved Welfare Schemes"
                >
                  <IconBookmark size={15} color={isActive("/saved") ? "#1D4ED8" : "#64748B"} />
                  <span>Saved</span>
                </Link>

                {/* Admin Portal Badge Button */}
                {isAdmin && (
                  <Link
                    to="/admin"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      padding: "0.45rem 0.85rem",
                      borderRadius: "8px",
                      background: isActive("/admin") ? "#D1FAE5" : "#ECFDF5",
                      color: "#065F46",
                      fontSize: "0.82rem",
                      fontWeight: 700,
                      textDecoration: "none",
                      border: "1px solid #A7F3D0",
                      transition: "all 0.15s ease",
                    }}
                  >
                    <IconShield size={15} color="#059669" />
                    <span>Admin</span>
                  </Link>
                )}

                {/* User Profile Pill */}
                <Link
                  to="/profile"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.55rem",
                    color: "#0F172A",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    padding: "0.35rem 0.75rem 0.35rem 0.4rem",
                    borderRadius: "999px",
                    background: "#F8FAFC",
                    border: "1px solid #E2E8F0",
                    textDecoration: "none",
                    transition: "all 0.15s ease",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.borderColor = "#CBD5E1")}
                  onMouseOut={(e) => (e.currentTarget.style.borderColor = "#E2E8F0")}
                >
                  <span
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
                      color: "#FFFFFF",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      boxShadow: "0 2px 5px rgba(37, 99, 235, 0.25)",
                    }}
                  >
                    {userInitial}
                  </span>
                  <span style={{ maxWidth: "120px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {displayName}
                  </span>
                </Link>

                {/* Refined Logout Button */}
                <button
                  onClick={handleLogout}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.35rem",
                    padding: "0.45rem 0.75rem",
                    borderRadius: "8px",
                    background: "#FFFFFF",
                    color: "#64748B",
                    border: "1px solid #E2E8F0",
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.color = "#DC2626";
                    e.currentTarget.style.borderColor = "#FECACA";
                    e.currentTarget.style.background = "#FEF2F2";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.color = "#64748B";
                    e.currentTarget.style.borderColor = "#E2E8F0";
                    e.currentTarget.style.background = "#FFFFFF";
                  }}
                  title="Sign Out"
                >
                  <IconLogout size={14} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <Link
                  to="/login"
                  style={{
                    color: "#334155",
                    fontSize: "0.88rem",
                    fontWeight: 600,
                    padding: "0.5rem 0.95rem",
                    textDecoration: "none",
                    borderRadius: "8px",
                    transition: "all 0.15s ease",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.background = "#F1F5F9")}
                  onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="btn-primary"
                  style={{
                    padding: "0.5rem 1.15rem",
                    fontSize: "0.88rem",
                    borderRadius: "8px",
                  }}
                >
                  Get Started Free
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="ga-mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: "#F8FAFC",
              border: "1px solid #E2E8F0",
              color: "#1E293B",
              padding: "0.45rem",
              borderRadius: "8px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <IconX size={20} /> : <IconMenu size={20} />}
          </button>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div
            className="ga-mobile-menu"
            style={{
              background: "#FFFFFF",
              padding: "1rem 1.25rem 1.5rem",
              borderTop: "1px solid #E2E8F0",
              boxShadow: "0 10px 25px -5px rgba(15, 23, 42, 0.1)",
              display: "flex",
              flexDirection: "column",
              gap: "0.4rem",
            }}
          >
            {navLinks.map((link) => {
              const active = isActive(link.to);
              const IconComp = link.icon;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    color: active ? "#1D4ED8" : "#334155",
                    background: active ? "#EFF6FF" : "transparent",
                    padding: "0.65rem 0.85rem",
                    borderRadius: "8px",
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    gap: "0.65rem",
                    textDecoration: "none",
                    border: active ? "1px solid rgba(59, 130, 246, 0.2)" : "1px solid transparent",
                  }}
                >
                  <IconComp size={18} color={active ? "#1D4ED8" : "#64748B"} />
                  <span>{link.label}</span>
                </Link>
              );
            })}

            <div
              style={{
                marginTop: "0.75rem",
                paddingTop: "0.75rem",
                borderTop: "1px solid #E2E8F0",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              {isLoggedIn ? (
                <>
                  <Link
                    to="/saved"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.65rem",
                      padding: "0.6rem 0.85rem",
                      borderRadius: "8px",
                      color: "#334155",
                      textDecoration: "none",
                      fontWeight: 600,
                    }}
                  >
                    <IconBookmark size={18} color="#64748B" />
                    <span>Saved Schemes</span>
                  </Link>

                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setMobileMenuOpen(false)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.65rem",
                        padding: "0.6rem 0.85rem",
                        borderRadius: "8px",
                        background: "#ECFDF5",
                        color: "#065F46",
                        textDecoration: "none",
                        fontWeight: 700,
                        border: "1px solid #A7F3D0",
                      }}
                    >
                      <IconShield size={18} color="#059669" />
                      <span>Admin Upload Portal</span>
                    </Link>
                  )}

                  <Link
                    to="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.65rem",
                      padding: "0.6rem 0.85rem",
                      borderRadius: "8px",
                      color: "#334155",
                      textDecoration: "none",
                      fontWeight: 600,
                    }}
                  >
                    <span
                      style={{
                        width: "24px",
                        height: "24px",
                        borderRadius: "50%",
                        background: "#3B82F6",
                        color: "#FFF",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                      }}
                    >
                      {userInitial}
                    </span>
                    <span>Account: {displayName}</span>
                  </Link>

                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem",
                      padding: "0.65rem",
                      borderRadius: "8px",
                      background: "#FEF2F2",
                      color: "#DC2626",
                      border: "1px solid #FECACA",
                      fontWeight: 600,
                      cursor: "pointer",
                      marginTop: "0.35rem",
                    }}
                  >
                    <IconLogout size={16} />
                    <span>Sign Out</span>
                  </button>
                </>
              ) : (
                <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="btn-secondary"
                    style={{ flex: 1, textAlign: "center", padding: "0.55rem" }}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="btn-primary"
                    style={{ flex: 1, textAlign: "center", padding: "0.55rem" }}
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
