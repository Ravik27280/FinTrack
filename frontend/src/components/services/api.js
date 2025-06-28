import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL;

const instance = axios.create({
  baseURL: API,
});

// Add auth token to headers if exists
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
