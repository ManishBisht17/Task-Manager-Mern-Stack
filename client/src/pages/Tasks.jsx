import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

function Tasks() {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem("token");

  const fetchTasks = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/tasks/${projectId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTasks(data);
    } catch (error) {
      console.error(error);
    }
  };

  const createTask = async (task) => {
    try {
      const payload = { ...task, projectId };
      const { data } = await axios.post(
        "http://localhost:5000/api/tasks",
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTasks((prev) => [data, ...prev]);
    } catch (error) {
      console.error(error);
    }
  };

  const updateTask = async (id, updateData) => {
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/tasks/${id}`,
        updateData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTasks((prev) => prev.map((task) => (task._id === id ? data : task)));
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [projectId]);

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <TaskForm onAdd={createTask} />
      <TaskList tasks={tasks} onUpdate={updateTask} onDelete={deleteTask} />
    </div>
  );
}

export default Tasks;
