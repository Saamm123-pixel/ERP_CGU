import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/api";
import logo from "../assets/logo.png";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await loginUser({ email: form.email, password: form.password });
      const user = res.data.user;
      if (!user || !user.role) throw new Error("Invalid response from server");
      localStorage.setItem("user", JSON.stringify(user));
      if (user.role === "admin") navigate("/admin");
      else if (user.role === "student") navigate("/student");
      else if (user.role === "faculty") navigate("/faculty");
      else setError("Unknown role. Contact administrator.");
    } catch (err) {
      if (!err.response) {
        setError("⚠️ Cannot connect to server. Make sure the backend is running.");
      } else {
        const data = err.response.data;
        if (data?.banned) {
          const until = data.banUntil ? new Date(data.banUntil).toLocaleString() : "further notice";
          setError(`🚫 Account banned: "${data.banReason}" — until ${until}`);
        } else {
          setError(data?.message || "Invalid email or password");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-bg">
      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 420 }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <img
            src={logo}
            alt="CGU Logo"
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              objectFit: "cover",
              margin: "0 auto 16px",
              display: "block",
              border: "3px solid rgba(99,102,241,0.5)",
              boxShadow: "0 0 0 6px rgba(99,102,241,0.12), 0 12px 32px rgba(0,0,0,0.4)",
            }}
          />
          <h1 style={{ color: "#f1f5f9", fontWeight: 700, fontSize: "1.5rem", margin: 0, letterSpacing: "-0.02em" }}>
            CGU College ERP
          </h1>
          <p style={{ color: "rgba(148,163,184,0.5)", fontSize: "0.8125rem", marginTop: 6 }}>
            Sign in to your portal account
          </p>
        </div>

        {/* Card */}
        <div className="auth-card">
          {error && (
            <div style={{
              background: "rgba(244,63,94,0.1)", border: "1px solid rgba(244,63,94,0.25)",
              borderRadius: 8, padding: "10px 14px", marginBottom: 20,
              fontSize: "0.8125rem", color: "#fda4af", lineHeight: 1.5,
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label className="text-label" style={{ display: "block", marginBottom: 6 }}>Email Address</label>
              <input className="input-field" type="email" name="email"
                placeholder="you@cgu.ac.in" value={form.email}
                onChange={handleChange} required />
            </div>
            <div>
              <label className="text-label" style={{ display: "block", marginBottom: 6 }}>Password</label>
              <input className="input-field" type="password" name="password"
                placeholder="••••••••" value={form.password}
                onChange={handleChange} required />
            </div>

            <button type="submit" disabled={loading} className="btn-primary"
              style={{ width: "100%", justifyContent: "center", padding: "11px 16px", fontSize: "0.875rem", marginTop: 4, opacity: loading ? 0.6 : 1 }}>
              {loading ? "Signing in..." : "Sign In"}
              {!loading && (
                <svg style={{ width: 16, height: 16 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              )}
            </button>
          </form>

          <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "20px 0" }} />

          <p style={{ textAlign: "center", fontSize: "0.8125rem", color: "rgba(148,163,184,0.45)", margin: 0 }}>
            Don't have an account?{" "}
            <Link to="/register" style={{ color: "#a5b4fc", fontWeight: 600, textDecoration: "none" }}>
              Create account
            </Link>
          </p>
        </div>

        <p style={{ textAlign: "center", fontSize: "0.7rem", color: "rgba(148,163,184,0.25)", marginTop: 20 }}>
          🔒 Secured by CGU ERP System · v1.0.0
        </p>
      </div>
    </div>
  );
};

export default Login;
