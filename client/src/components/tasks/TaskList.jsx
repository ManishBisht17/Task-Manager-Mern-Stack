import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FaPlus, FaArrowLeft } from "react-icons/fa";
import TaskItem from "./TaskItem";
import CreateTask from "./CreateTask";
import * as taskService from "../services/task.service";
import "./TaskList.css";

const TaskList = () => {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    loadTasks();
  }, [projectId]);

  const loadTasks = async () => {
    try {
      const data = await taskService.getTasks(projectId);
      setTasks(data);
    } catch (err) {
      setError("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const handleTaskCreated = (newTask) => {
    setTasks([...tasks, newTask]);
    setShowCreateForm(false);
  };

  const handleTaskUpdated = (updatedTask) => {
    setTasks(
      tasks.map((task) => (task._id === updatedTask._id ? updatedTask : task))
    );
  };

  const handleTaskDeleted = (taskId) => {
    setTasks(tasks.filter((task) => task._id !== taskId));
  };

  const filterTasks = () => {
    if (filter === "all") return tasks;
    return tasks.filter((task) => task.status === filter);
  };

  const filteredTasks = filterTasks();

  if (loading) {
    return <div className="loading">Loading tasks...</div>;
  }

  return (
    <div className="tasks-container">
      <div className="tasks-header">
        <Link to="/projects" className="back-link">
          <FaArrowLeft /> Projects
        </Link>
        <h2>Project Tasks</h2>

        {tasks.length !== 0 && (
          <button
            className="btn btn-primary"
            onClick={() => setShowCreateForm(true)}
          >
            <FaPlus /> New Task
          </button>
        )}
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="task-filters">
        <button
          className={`filter-btn ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={`filter-btn ${filter === "Pending" ? "active" : ""}`}
          onClick={() => setFilter("Pending")}
        >
          Pending
        </button>
        <button
          className={`filter-btn ${filter === "In Progress" ? "active" : ""}`}
          onClick={() => setFilter("In Progress")}
        >
          In Progress
        </button>
        <button
          className={`filter-btn ${filter === "Completed" ? "active" : ""}`}
          onClick={() => setFilter("Completed")}
        >
          Completed
        </button>
      </div>

      {showCreateForm && (
        <div className="create-task-container">
          <CreateTask
            projectId={projectId}
            onTaskCreated={handleTaskCreated}
            onCancel={() => setShowCreateForm(false)}
          />
        </div>
      )}

      {filteredTasks.length === 0 ? (
        <div className="no-tasks">
          <p>No tasks found for this project.</p>
          {!showCreateForm && (
            <button
              className="btn btn-primary"
              onClick={() => setShowCreateForm(true)}
            >
              Create Your First Task
            </button>
          )}
        </div>
      ) : (
        <div className="tasks-list">
          {filteredTasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              onTaskUpdated={handleTaskUpdated}
              onTaskDeleted={handleTaskDeleted}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
