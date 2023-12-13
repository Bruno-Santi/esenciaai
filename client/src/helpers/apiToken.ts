import axios from "axios";

const api = axios.create({
  baseURL: "https://esencia-api-1b5d609d081b.herokuapp.com",
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
