import axios from "axios";

const api = axios.create({
  baseURL: "https://9qhvw5j9-3000.brs.devtunnels.ms/",
});

api.interceptors.request.use(
  (config) => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      const cleanedToken = storedToken.replace(/^"(.*)"$/, "$1");
      config.headers.Authorization = `Bearer ${cleanedToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
