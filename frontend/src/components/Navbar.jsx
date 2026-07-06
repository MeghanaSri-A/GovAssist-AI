import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header style={{ background: "var(--color-primary)", color: "white" }}>
      <nav className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 1.5rem" }}>
        <Link to="/" style={{ fontWeight: 700, fontSize: "1.2rem" }}>
          GovAssist AI
        </Link>
        <div style={{ display: "flex", gap: "1.25rem", alignItems: "center" }}>
          <Link to="/explorer">Schemes</Link>
          <Link to="/eligibility">Eligibility</Link>
          <Link to="/chat">AI Chat</Link>
          <Link to="/compare">Compare</Link>
          {isLoggedIn ? (
            <>
              <Link to="/saved">Saved</Link>
              <Link to="/profile">Profile</Link>
              <button className="btn-accent" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="btn-accent">
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
