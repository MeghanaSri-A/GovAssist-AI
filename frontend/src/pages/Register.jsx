import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/auth";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await register(form.name, form.email, form.password);
      navigate("/login");
    } catch (err) {
      setError(err?.response?.data?.detail || "Registration failed");
    }
  };

  return (
    <div className="container" style={{ paddingTop: "3rem", maxWidth: 400, marginInline: "auto" }}>
      <h2>Register</h2>
      <form className="card" onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
        <input placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required
          style={{ padding: "0.6rem", borderRadius: 8, border: "1px solid var(--color-border)" }} />
        <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required
          style={{ padding: "0.6rem", borderRadius: 8, border: "1px solid var(--color-border)" }} />
        <input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required
          style={{ padding: "0.6rem", borderRadius: 8, border: "1px solid var(--color-border)" }} />
        {error && <p style={{ color: "crimson", fontSize: "0.85rem" }}>{error}</p>}
        <button type="submit" className="btn-primary">Create Account</button>
      </form>
      <p style={{ marginTop: "1rem", color: "var(--color-muted)" }}>
        Already have an account? <Link to="/login" style={{ color: "var(--color-primary)", fontWeight: 600 }}>Login</Link>
      </p>
    </div>
  );
}
