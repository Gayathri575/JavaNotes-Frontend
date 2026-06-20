import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./Articles.css";

const topics = [
  { label: "Core Java",      path: "/topic/corejava" },
  { label: "DSA",            path: "/topic/dsa" },
  { label: "MySQL",          path: "/topic/mysql" },
  { label: "Hibernate",      path: "/topic/hibernate" },
  { label: "Springboot",     path: "/topic/springboot" },
  { label: "Spring Security",path: "/topic/springsecurity" },
];

function Articles() {
  const navigate = useNavigate();
  document.title = "Articles | JavaHub";

  return (
    <>
      <Navbar />

      <section className="articles-grid">
        <h2>Topics</h2>
        <div className="grid-container">
          {topics.map((topic) => (
            <div
              key={topic.path}
              className="grid-item"
              onClick={() => navigate(topic.path)}
            >
              {topic.label}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Articles;