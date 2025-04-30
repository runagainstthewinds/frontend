// src/api/client.ts
import axios from "axios";

const api = axios.create({
  baseURL: "/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// request interceptor, runs before every request
api.interceptors.request.use(
  (cfg) => {
    const token = localStorage.getItem("token");
    if (token) {
      cfg.headers!["Authorization"] = `Bearer ${token}`;
    }
    return cfg;
  },
  (err) => Promise.reject(err),
);

export default api;
