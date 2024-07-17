import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/v1/api", // Adjust to your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
