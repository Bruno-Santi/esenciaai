const axios = require("axios");
const throwError = require("./customError");

const api = axios.create({
  baseURL: "https://ds0zg6rj-8000.brs.devtunnels.ms/",
  // baseURL: "http://localhost:3002/",
});

const sendReq = async (
  name = "api_mongo",
  type = "get",
  endpoint = "",
  params = "",
  query = {},
  body = {}
) => {
  if (params) endpoint += endpoint === "/" ? params : `/${params}`;

  if (Object.keys(query).length !== 0) {
    endpoint += "?";
    let count = 0;
    for (const key in query) {
      count++;
      endpoint += `${key}=${query[key]}`;
      if (count < Object.keys(query).length) endpoint += "&";
    }
  }

  let result = {};

  await new Promise((resolve, reject) => {
    api[type](endpoint, body)
      .then((resp) => {
        result = resp.data;
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  }).catch((err) => {
    throwError(name, err.response.status, err.response.data);
  });
  return result;
};

module.exports = { api, sendReq };