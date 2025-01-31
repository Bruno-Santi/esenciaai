import axios from "axios";

//% FACU_EDIT

export const baseURL = 'https://p3q9f71m-3000.brs.devtunnels.ms'
// "https://9qhvw5j9-3000.brs.devtunnels.ms";
//% END

const api = axios.create({
  baseURL,
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
