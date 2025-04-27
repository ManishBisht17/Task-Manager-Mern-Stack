import api from "./api";

export const getProjects = async () => {
  const response = await api.get("/projects");
  return response.data;
};

export const createProject = async (title) => {
  const response = await api.post("/projects", { title });
  return response.data;
};
