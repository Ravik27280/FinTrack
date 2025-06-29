import axios, { InternalAxiosRequestConfig } from "axios";

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

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

// Add response interceptor for debugging
instance.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.config.url, response.data);
    return response;
  },
  (error) => {
    console.error('API Error:', error.config?.url, error.response?.data);
    return Promise.reject(error);
  }
);

export default instance;