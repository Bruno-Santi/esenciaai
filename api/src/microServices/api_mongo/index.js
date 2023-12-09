const { sendReq } = require("../../helpers/axios.js");
const throwError = require("../../helpers/customError.js");
const { DailySurvey } = require("./classes.js");

const name = "mongo_api";

const mongoApi = {};

mongoApi.example_to_endpoint = async () => {
  //* tipo de petición.
  const type = "post";
  //* direción, la bases NO! esto "http://localhost:3000" no, lo siguiente.
  const endpoint = "/";
  //* solo string, si se requiere una id (o lo que sea) que es igual a 30219.
  const params = "";
  //* si se requieren querys de user_id=m2i32 team_id=we12ef.
  const query = { user_id: "m2i32", team_id: "we12ef" };
  //* si se requiere un body así { user_id, email }.
  const body = { user_id: "23", email: "asd@gmail.com " };

  //* se envía la petición y en "response" se guardara la data.
  const response = await sendReq(name, type, endpoint, params, query, body);
  //! en caso de error se lanza un error con throwError.
  console.log(response);
  return response;
};

mongoApi.daily_survey_get = async (team_id) => {
  // * Se me pide por get golpear la ruta "/daily_survey/getallTeam", con los querys : team_id.
  const type = "get";
  const endpoint = "/daily_survey/getallTeam";
  const params = "";
  const query = { team_id };
  const body = {};

  const response = await sendReq(name, type, endpoint, params, query, body);
  // console.log(JSON.stringify(response));
  return response;
};

mongoApi.welcome_get = async () => {
  const type = "get";
  const endpoint = "/";
  const params = "";
  const query = {};
  const body = {};

  const response = await sendReq(name, type, endpoint, params, query, body);
  console.log(response);
  return response;
};

mongoApi.daily_survey_get = async (team_id) => {
  const type = "get";
  const endpoint = "/daily_survey/getAllByTeam";
  const params = "";
  const query = { team_id };
  const body = {};

  const response = await sendReq(name, type, endpoint, params, query, body);

  return response;
};

mongoApi.daily_survey_post = async (body = new DailySurvey()) => {
  const type = "post";
  const endpoint = "/daily_survey";
  const params = "";
  const query = {};
  // const body = {};

  const response = await sendReq(name, type, endpoint, params, query, body);

  return response;
};

module.exports = mongoApi;
