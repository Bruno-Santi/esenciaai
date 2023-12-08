const { default: axios } = require("axios");
const api = require("../../helpers/axiosConfig.js");

const daily_survey_post = async (body) => {
  const response = await api.post("/daily_survey", body);
  return response.data;
};

const put_dailySurvey_comment = async () => {
  const response = await api.get("/");
  console.log(response.data.msg);
};
const postRetro = async () => {
  const response = await api.get("/");
  console.log(response.data.msg);
};

const getWelcome = async () => {
  const response = await api.get("/");
  console.log(response.data.msg);
};

const getDailySurvey_getallByTeam = async () => {
  const response = await api.get("/");
  console.log(response.data.msg);
};

const getRetro_get = async () => {
  const response = await api.get("/");
  console.log(response.data.msg);
};

const getDashboard_getAllData = async () => {
  const response = await api.get("/");
  console.log(response.data.msg);
};

const getReport_generate = async () => {
  const response = await api.get("/");
  console.log(response.data.msg);
};

const getDashboard = async () => {
  const response = await api.get("/");
  console.log(response.data.msg);
};

module.exports = { daily_survey_post, testRequest };
