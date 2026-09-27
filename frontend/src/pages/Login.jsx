import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(
        err?.response?.data?.detail ||
        err?.response?.data?.message ||
        "Login failed. Please check your email and password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "calc(100vh - 120px)",
        background: "#f6f8fc",
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
          maxWidth: "430px",
          background: "#ffffff",
          borderRadius: "14px",
          padding: "38px 40px",
          boxSizing: "border-box",
          border: "1px solid #e1e5eb",
          boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
        }}
      >
        {/* Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              width: "52px",
              height: "52px",
              margin: "0 auto 15px",
              borderRadius: "12px",
              background: "#fff4d6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
            }}
          >
            🔐
          </div>

          <h1
            style={{
              margin: 0,
              color: "#17365d",
              fontSize: "28px",
              fontWeight: 700,
            }}
          >
            Welcome Back!
          </h1>

          <p
            style={{
              margin: "8px 0 0",
              color: "#6b7280",
              fontSize: "14px",
            }}
          >
            Sign in to continue to GovAssist AI
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {/* Email */}
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "7px",
                color: "#243447",
                fontSize: "14px",
                fontWeight: 600,
              }}
            >
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
              style={{
                width: "100%",
                height: "46px",
                padding: "0 13px",
                boxSizing: "border-box",
                border: "1px solid #cfd6df",
                borderRadius: "8px",
                outline: "none",
                fontSize: "14px",
              }}
            />
          </div>

          {/* Password */}
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "7px",
              }}
            >
              <label
                style={{
                  color: "#243447",
                  fontSize: "14px",
                  fontWeight: 600,
                }}
              >
                Password
              </label>

              <Link
                to="/forgot-password"
                style={{
                  color: "#244394",
                  fontSize: "13px",
                  textDecoration: "none",
                }}
              >
                Forgot password?
              </Link>
            </div>

            <div
              style={{
                position: "relative",
              }}
            >
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                style={{
                  width: "100%",
                  height: "46px",
                  padding: "0 65px 0 13px",
                  boxSizing: "border-box",
                  border: "1px solid #cfd6df",
                  borderRadius: "8px",
                  outline: "none",
                  fontSize: "14px",
                }}
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
                  color: "#244394",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div
              style={{
                padding: "11px 13px",
                borderRadius: "7px",
                background: "#fff1f2",
                border: "1px solid #fecdd3",
                color: "#be123c",
                fontSize: "13px",
              }}
            >
              {error}
            </div>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              height: "46px",
              border: "none",
              borderRadius: "8px",
              background: "#f5a400",
              color: "#ffffff",
              fontSize: "15px",
              fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        {/* Register */}
        <div
          style={{
            marginTop: "25px",
            paddingTop: "20px",
            borderTop: "1px solid #edf0f4",
            textAlign: "center",
            color: "#6b7280",
            fontSize: "14px",
          }}
        >
          Don't have an account?

          <Link
            to="/register"
            style={{
              marginLeft: "5px",
              color: "#244394",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}