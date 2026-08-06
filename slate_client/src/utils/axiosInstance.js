import axios from "axios";

// Using a fallback to ensure it works even if .env isn't picked up
const baseURL =
  "http://localhost:5001/api";
  process.env.REACT_APP_API_BASE_URL ||

const instance = axios.create({
  baseURL: baseURL,
});

// Automatically attach token to all requests
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default instance;
