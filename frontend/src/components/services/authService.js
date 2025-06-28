import api from "./api";

export const register = async (formData) => {
  const res = await api.post("/auth/register", formData);
  return res.data;
};

export const login = async (formData) => {
  const res = await api.post("/auth/login", formData);
  // Save token
  localStorage.setItem("token", res.data.token);
  return res.data;
};
