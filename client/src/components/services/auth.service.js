import api from "./api";

export const login = async (email, password) => {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
};

export const register = async (name, email, password, country) => {
  const response = await api.post("/auth/signup", {
    name,
    email,
    password,
    country,
  });
  return response.data;
};
