import { useState } from "react";
import { FaEdit, FaTrash, FaCheck } from "react-icons/fa";
import * as taskService from "../services/task.service";
import "./TaskItem.css";
const TaskItem = ({ task, onTaskUpdated, onTaskDeleted }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setEditedTask({
      ...editedTask,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const updatedTask = await taskService.updateTask(task._id, editedTask);
      onTaskUpdated(updatedTask);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update task:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await taskService.deleteTask(task._id);
        onTaskDeleted(task._id);
      } catch (error) {
        console.error("Failed to delete task:", error);
      }
    }
  };

  const handleStatusChange = async (newStatus) => {
    const updatedTaskData = { ...task, status: newStatus };
    if (newStatus === "Completed" && !task.completedAt) {
      updatedTaskData.completedAt = new Date().toISOString();
    }

    try {
      const updatedTask = await taskService.updateTask(
        task._id,
        updatedTaskData
      );
      onTaskUpdated(updatedTask);
    } catch (error) {
      console.error("Failed to update task status:", error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Completed":
        return "status-completed";
      case "In Progress":
        return "status-in-progress";
      default:
        return "status-pending";
    }
  };

  if (isEditing) {
    return (
      <div className="task-item editing">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={editedTask.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={editedTask.description || ""}
            onChange={handleChange}
            rows="3"
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={editedTask.status}
            onChange={handleChange}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div className="task-actions">
          <button
            onClick={handleUpdate}
            disabled={loading}
            className="btn btn-primary btn-small"
          >
            {loading ? "Saving..." : "Save"}
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="btn btn-text btn-small"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`task-item ${getStatusClass(task.status)}`}>
      <div className="task-header">
        <h3 className="task-title">{task.title}</h3>
        <span className={`task-status ${getStatusClass(task.status)}`}>
          {task.status}
        </span>
      </div>
      {task.description && (
        <div className="task-description">{task.description}</div>
      )}
      <div className="task-dates">
        <div>Created: {formatDate(task.createdAt)}</div>
        {task.status === "Completed" && (
          <div>Completed: {formatDate(task.completedAt)}</div>
        )}
      </div>
      <div className="task-actions">
        {task.status !== "Completed" && (
          <button
            onClick={() => handleStatusChange("Completed")}
            className="btn btn-icon btn-success"
            title="Mark as Completed"
          >
            <FaCheck />
          </button>
        )}
        <button
          onClick={() => setIsEditing(true)}
          className="btn btn-icon"
          title="Edit Task"
        >
          <FaEdit />
        </button>
        <button
          onClick={handleDelete}
          className="btn btn-icon btn-danger"
          title="Delete Task"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
