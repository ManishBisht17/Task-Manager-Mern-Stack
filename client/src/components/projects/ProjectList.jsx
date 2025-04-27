import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import ProjectCard from "./ProjectCard";
import CreateProject from "./CreateProject";
import * as projectService from "../services/project.service";
import "./ProjectList.css";
const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await projectService.getProjects();
      setProjects(data);
    } catch (err) {
      setError("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  const handleProjectCreated = (newProject) => {
    setProjects([...projects, newProject]);
    setShowCreateForm(false);
  };

  if (loading) {
    return <div className="loading">Loading projects...</div>;
  }

  return (
    <div className="projects-container">
      <div className="projects-header">
        <h2>My Projects</h2>
        {projects.length < 4 && !showCreateForm && (
          <button
            className="btn btn-primary"
            onClick={() => setShowCreateForm(true)}
          >
            <FaPlus /> New Project
          </button>
        )}
      </div>

      {error && <div className="error-message">{error}</div>}

      {showCreateForm && (
        <div className="create-project-container">
          <CreateProject onProjectCreated={handleProjectCreated} />
          <button
            className="btn btn-text"
            onClick={() => setShowCreateForm(false)}
          >
            Cancel
          </button>
        </div>
      )}

      {projects.length === 0 ? (
        <div className="no-projects">
          <p>You don't have any projects yet.</p>
          {!showCreateForm && (
            <button
              className="btn btn-primary"
              onClick={() => setShowCreateForm(true)}
            >
              Create Your First Project
            </button>
          )}
        </div>
      ) : (
        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectList;
