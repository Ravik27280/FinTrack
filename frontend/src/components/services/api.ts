import axios, { InternalAxiosRequestConfig } from "axios";

const API = import.meta.env.VITE_API_BASE_URL;

const instance = axios.create({
  baseURL: `${API}/api`,
});

// Add auth token to headers if exists
instance.interceptors.request.use((config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const token = localStorage.getItem("token");

  if (token) {
    // `headers` is always defined on InternalAxiosRequestConfig
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default instance;