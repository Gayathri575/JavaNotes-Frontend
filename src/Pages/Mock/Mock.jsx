import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { isLoggedIn, clearSession } from "../Auth/auth";
import { quizTopics } from "../Quiz/quizTopics";
import "../Articles/Articles.css";

function Mock() {
  const navigate = useNavigate();

  // ── Auth guard ─────────────────────────────────────────────
  useEffect(() => {
    if (!isLoggedIn()) navigate("/signin", { replace: true });
  }, []);

  function logout() {
    clearSession();
    navigate("/signin", { replace: true });
  }

  return (
    <>
      <Navbar onLogout={logout} showLogout />

      <section className="articles-grid">
        <h2>Quiz Topics</h2>
        <div className="grid-container">
          {Object.entries(quizTopics).map(([id, topic]) => (
            <div
              key={id}
              className="grid-item"
              onClick={() => navigate(`/quiz/${id}`)}
            >
              <span style={{ fontSize: "1.5rem", display: "block", marginBottom: "8px" }}>
                {topic.icon}
              </span>
              {topic.label}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Mock;