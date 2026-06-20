import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar({ showLogout = false, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest(".navbar")) setMenuOpen(false);
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
        Java<span>Hub</span>
      </div>

      <button
        className="menu-toggle"
        aria-label="Toggle Navigation"
        onClick={(e) => { e.stopPropagation(); setMenuOpen(prev => !prev); }}
      >
        {menuOpen ? "✖" : "☰"}
      </button>

      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
        <li><a href="/">Home</a></li>
        <li><a href="/articles">Articles</a></li>
        <li><a href="/project">Projects</a></li>
        <li><a href="/mock">Quiz</a></li>
        {showLogout && (
          <li>
            <a href="#" onClick={(e) => { e.preventDefault(); onLogout?.(); }}>
              Logout
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;