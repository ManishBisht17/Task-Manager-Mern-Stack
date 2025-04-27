import api from "./api";

export const getTasks = async (projectId) => {
  const response = await api.get(`/tasks/${projectId}`);
  return response.data;
};

export const createTask = async (task) => {
  const response = await api.post("/tasks", task);
  return response.data;
};

export const updateTask = async (id, task) => {
  const response = await api.put(`/tasks/${id}`, task);
  return response.data;
};

export const deleteTask = async (id) => {
  const response = await api.delete(`/tasks/${id}`);
  return response.data;
};

export const deleteAllTasks = async (projectId) => {
  const response = await api.delete(`/tasks/project/${projectId}`);
  return response.data;
};
