const axios = require("axios");

const api = axios.create({
  // baseURL: "https://ds0zg6rj-8000.brs.devtunnels.ms/",
  baseURL: "http://localhost:3000/",
});

module.exports = api;
