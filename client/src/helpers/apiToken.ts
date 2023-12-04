import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:3000",
});

api.interceptors.request.use(
  (config) => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      config.headers.Authorization = `Bearer ${storedToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
