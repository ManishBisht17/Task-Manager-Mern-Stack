import { useState } from "react";

function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");

  const submit = (e) => {
    e.preventDefault();
    onAdd({ title, description, status });
    setTitle("");
    setDescription("");
    setStatus("Pending");
  };

  return (
    <form onSubmit={submit} className="card space-y-4">
      <input
        className="input"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        className="input"
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select
        className="input"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <button className="btn">Add Task</button>
    </form>
  );
}

export default TaskForm;
