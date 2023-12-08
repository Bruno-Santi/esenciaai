const { default: axios } = require("axios");
const api = require("../../helpers/axiosConfig.js");
const throwError = require("../../helpers/customError.js");

const sendRequest = async (
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
    console.log(err.response.data);
    throwError(
      "send_endpoint_" + endpoint,
      err.response.status,
      err.response.data
    );
  });
  return result;
};

const exampleToEndpoint = async (body) => {
  const type = "post";
  const endpoint = "/";
  const params = "";
  const query = { test: "!" };
  // const body = {};
  console.log(await sendRequest(type, endpoint, params, query, body));
  // return await sendRequest(type, endpoint, params, query, body);
};

module.exports = { exampleToEndpoint };
