import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./Projects.css";


const projects = [
  { label: "Electricity Management System", path: "/projects/ems" },
  { label: "Banking Management System",     path: "/projects/lms" },
  { label: "Student Management System",     path: "/projects/sms" },
  { label: "News API",                      path: "/projects/newsApi" },
];

function Projects() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <section className="articles-grid">
        <h2>Projects</h2>
        <div className="grid-container">
          {projects.map((project) => (
            <div
              key={project.path}
              className="grid-item"
              onClick={() => navigate(project.path)}
            >
              {project.label}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Projects;