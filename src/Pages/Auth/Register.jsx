import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";


function Register() {
  const navigate = useNavigate();
  const [form, setForm]       = useState({ firstName: "", lastName: "", username: "", email: "", password: "" });
  const [error, setError]     = useState("");
  const [success, setSuccess] = useState("");

  const update = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }));

  async function register() {
    setError(""); setSuccess("");
    const { firstName, lastName, username, email, password } = form;

    if (!firstName || !lastName || !username || !email || !password) {
      setError("All fields are required!"); return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters!"); return;
    }

    try {
      const res  = await fetch("/api/auth/register", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ firstName, lastName, username, email, password }),
      });
      const data = await res.json();

      if (res.ok) {
        setSuccess("Account created! Redirecting to signin...");
        setTimeout(() => navigate("/signin", { replace: true }), 2000);
      } else {
        setError(data.message || "Registration failed!");
      }
    } catch {
      setError("Server error — please try again!");
    }
  }

  return (
    <div className="auth-bg">
      <div className="auth-card">
        <h1>Create Account </h1>
        <p className="subtitle">Join JavaHub today</p>

        <div className="form-row">
          <div className="form-group">
            <label>First Name</label>
            <input type="text" placeholder="John" value={form.firstName} onChange={update("firstName")} />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input type="text" placeholder="Doe" value={form.lastName} onChange={update("lastName")} />
          </div>
        </div>

        <div className="form-group">
          <label>Username</label>
          <input type="text" placeholder="johndoe" value={form.username} onChange={update("username")} />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" placeholder="john@example.com" value={form.email} onChange={update("email")} />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Min 8 characters"
            value={form.password}
            onChange={update("password")}
            onKeyDown={e => e.key === "Enter" && register()}
          />
        </div>

        {error   && <p className="auth-error">{error}</p>}
        {success && <p className="auth-success">{success}</p>}

        <button className="auth-btn" onClick={register}>Create Account</button>

        <div className="auth-link">
          Already have an account? <span onClick={() => navigate("/signin")}>Sign in</span>
        </div>
      </div>
    </div>
  );
}

export default Register;