// src/libs/axiosInstance.js
import axios from "axios";

const baseURL = "http://localhost:5000/v1/api";
const axiosInstance = axios.create({ baseURL });

// add interceptor to automatically add token
axiosInstance.interceptors.request.use((config) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
