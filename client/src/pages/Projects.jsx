import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/projects", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(data);
    } catch (error) {
      console.error(error);
    }
  };

  const createProject = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/projects",
        { title },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProjects((prev) => [...prev, data]);
      setTitle("");
    } catch (error) {
      console.error(error);
      alert("You can only create 4 projects.");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <h2 className="text-2xl font-semibold">Your Projects</h2>

      <form onSubmit={createProject} className="flex gap-2">
        <input
          className="input flex-1"
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <button className="btn w-auto px-4">Create</button>
      </form>

      <div className="grid gap-4">
        {projects.map((project) => (
          <div
            key={project._id}
            onClick={() => navigate(`/tasks/${project._id}`)}
            className="card cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <h3 className="text-lg font-bold">{project.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;
