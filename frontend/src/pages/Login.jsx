import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err?.response?.data?.detail || "Login failed");
    }
  };

  return (
    <div className="container" style={{ paddingTop: "3rem", maxWidth: 400, marginInline: "auto" }}>
      <h2>Login</h2>
      <form className="card" onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required
          style={{ padding: "0.6rem", borderRadius: 8, border: "1px solid var(--color-border)" }} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required
          style={{ padding: "0.6rem", borderRadius: 8, border: "1px solid var(--color-border)" }} />
        {error && <p style={{ color: "crimson", fontSize: "0.85rem" }}>{error}</p>}
        <button type="submit" className="btn-primary">Login</button>
      </form>
      <p style={{ marginTop: "1rem", color: "var(--color-muted)" }}>
        Don't have an account? <Link to="/register" style={{ color: "var(--color-primary)", fontWeight: 600 }}>Register</Link>
      </p>
    </div>
  );
}
