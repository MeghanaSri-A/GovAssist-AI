import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/auth";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      navigate("/login", { state: { message: "Account created successfully! Please log in." } });
    } catch (err) {
      setError(
        err?.response?.data?.detail ||
        err?.response?.data?.message ||
        "Registration failed. Please try a different email."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "calc(100vh - 120px)",
        background: "#F8FAFC",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "50px 20px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "440px",
          background: "#FFFFFF",
          borderRadius: "16px",
          padding: "38px 40px",
          boxSizing: "border-box",
          border: "1px solid #E2E8F0",
          boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <div
            style={{
              width: "52px",
              height: "52px",
              margin: "0 auto 15px",
              borderRadius: "12px",
              background: "#EEF2FF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
            }}
          >
            🏛️
          </div>

          <h1 style={{ margin: 0, color: "#0F172A", fontSize: "26px", fontWeight: 700 }}>
            Create Citizen Account
          </h1>

          <p style={{ margin: "8px 0 0", color: "#64748B", fontSize: "14px" }}>
            Save schemes, track eligibility, and access AI assistance
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          {/* Full Name */}
          <div>
            <label style={{ display: "block", marginBottom: "6px", color: "#334155", fontSize: "14px", fontWeight: 600 }}>
              Full Name
            </label>
            <input
              type="text"
              placeholder="e.g. Rahul Sharma"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="input-field"
            />
          </div>

          {/* Email */}
          <div>
            <label style={{ display: "block", marginBottom: "6px", color: "#334155", fontSize: "14px", fontWeight: 600 }}>
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              autoComplete="email"
              required
              className="input-field"
            />
          </div>

          {/* Password */}
          <div>
            <label style={{ display: "block", marginBottom: "6px", color: "#334155", fontSize: "14px", fontWeight: 600 }}>
              Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Choose a strong password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                className="input-field"
                style={{ paddingRight: "65px" }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  border: "none",
                  background: "transparent",
                  color: "#2541B2",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div
              style={{
                padding: "10px 14px",
                borderRadius: "8px",
                background: "#FEF2F2",
                border: "1px solid #FECACA",
                color: "#DC2626",
                fontSize: "13px",
              }}
            >
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="btn-accent"
            disabled={loading}
            style={{
              width: "100%",
              height: "46px",
              fontSize: "15px",
              fontWeight: 700,
              marginTop: "4px",
            }}
          >
            {loading ? "Creating Account..." : "Register Free"}
          </button>
        </form>

        {/* Login Link */}
        <div
          style={{
            marginTop: "24px",
            paddingTop: "18px",
            borderTop: "1px solid #F1F5F9",
            textAlign: "center",
            color: "#64748B",
            fontSize: "14px",
          }}
        >
          Already have an account?
          <Link
            to="/login"
            style={{
              marginLeft: "6px",
              color: "#2541B2",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Sign in here
          </Link>
        </div>
      </div>
    </div>
  );
}
