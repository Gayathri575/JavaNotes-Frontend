import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedIn, saveSession } from "./auth";
import "./Auth.css";
function SignIn() {
  const navigate  = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  // Already logged in? skip to mock
  useEffect(() => {
    if (isLoggedIn()) navigate("/mock", { replace: true });
  }, []);

  async function signin() {
    setError("");
    if (!username || !password) {
      setError("Please enter username and password!");
      return;
    }
    setLoading(true);
    try {
      const res  = await fetch("/api/auth/login", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (data.access_token) {
        saveSession(data);
        navigate("/mock", { replace: true });
      } else {
        setError(data.message || "Invalid username or password");
      }
    } catch {
      setError("Server error — please try again!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-bg">
      <div className="auth-card">
        <h1>Welcome back </h1>
        <p className="subtitle">Sign in to access JavaHub</p>

        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            onKeyDown={e => e.key === "Enter" && signin()}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === "Enter" && signin()}
          />
        </div>

        {error && <p className="auth-error">{error}</p>}
        {loading && <p className="auth-loading">Signing in...</p>}

        <button className="auth-btn" onClick={signin} disabled={loading}>
          Sign In
        </button>

        <div className="auth-link">
          Don't have an account? <span onClick={() => navigate("/register")}>Register here</span>
        </div>
      </div>
    </div>
  );
}

export default SignIn;