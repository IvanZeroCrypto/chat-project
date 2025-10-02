import axios from "axios";
import AuthService from "./services/AuthService";

const API_URL = import.meta.env.PROD
  ? "https://chat-project-zuw8.onrender.com"
  : "http://localhost:7000";

export const api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem(
    "accessToken"
  )}`;
  return config;
});
api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    if (error.response.data.message) {
      error.message = error.response.data.message;
    }
    const originalRequest = error.config;
    if (error.response.status == 401) {
      try {
        const response = await AuthService.refresh();
        if (response?.data?.accessToken) {
          localStorage.setItem("accessToken", response?.data?.accessToken);
        } else {
          localStorage.removeItem("accessToken");
        }
        return api.request(originalRequest);
      } catch (error) {}
    } else if (error.response.status == 204) {
      console.log("error 204");
      localStorage.removeItem("accessToken");
    }
    return Promise.reject(error);
  }
);
