import { useState, useEffect } from "react";

export default function ProjectForm({ onAdd, token }) {
  const [title, setTitle] = useState(
    localStorage.getItem("project-title") || ""
  );

  useEffect(() => {
    localStorage.setItem("project-title", title);
  }, [title]);

  const submit = async (e) => {
    e.preventDefault();
    await onAdd({ title }, token);
    setTitle("");
    localStorage.removeItem("project-title");
  };

  return (
    <form
      onSubmit={submit}
      className="space-y-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow"
    >
      <input
        required
        placeholder="New project title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
      />
      <button className="w-full py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
        Create Project
      </button>
    </form>
  );
}
