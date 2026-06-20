import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { ProjectsData } from "./ProjectsData";
import "./ProjectDetail.css";

function ProjectDetail() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const project = projectsData[projectId];

  // If unknown project ID
  if (!project) {
    return (
      <>
        <Navbar />
        <div className="not-found">
          <h2>Project not found 😕</h2>
          <button onClick={() => navigate("/project")}>← Back to Projects</button>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="project-wrapper">
        <button className="back-btn" onClick={() => navigate("/project")}>
          ← Back to Projects
        </button>

        <div className="project-section">
          <h1 className="project-title">{project.title}</h1>
          <div className="tech-stack">Tech: {project.tech}</div>
          <p className="description">{project.description}</p>

          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="btn-github"
          >
            View Project on GitHub
          </a>
        </div>
      </div>
    </>
  );
}

export default ProjectDetail;