import { useState } from "react";
import { Link } from "react-router-dom";
import { FaTasks } from "react-icons/fa";
import "./ProjectCard.css";

const ProjectCard = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);
  const createdDate = new Date(project.createdAt).toLocaleDateString();

  return (
    <div
      className={`project-card ${isHovered ? "hovered" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h3 className="project-title">{project.title}</h3>
      <div className="project-details">
        <p>Created: {createdDate}</p>
      </div>
      <Link
        to={`/projects/${project._id}/tasks`}
        className="project-tasks-link"
      >
        <FaTasks /> Manage Tasks
      </Link>
    </div>
  );
};

export default ProjectCard;
