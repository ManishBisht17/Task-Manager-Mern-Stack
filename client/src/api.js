import axios from "axios";

const API_URL = "http://localhost:5000/api";

// ===== Auth APIs =====
export const signup = (userData) => {
  return axios.post(`${API_URL}/auth/signup`, userData);
};

export const login = (credentials) => {
  return axios.post(`${API_URL}/auth/login`, credentials);
};

// ===== Project APIs =====
export const fetchProjects = (token) => {
  return axios.get(`${API_URL}/projects`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createProjectAPI = (projectData, token) => {
  return axios.post(`${API_URL}/projects`, projectData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// ===== Task APIs =====
export const fetchTasks = (token, projectId) => {
  return axios.get(`${API_URL}/tasks/${projectId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createTask = (taskData, token) => {
  return axios.post(`${API_URL}/tasks`, taskData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateTask = (taskId, updateData, token) => {
  return axios.put(`${API_URL}/tasks/${taskId}`, updateData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteTask = (taskId, token) => {
  return axios.delete(`${API_URL}/tasks/${taskId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
