const { sendReq } = require("../../helpers/axios.js");
const throwError = require("../../helpers/customError.js");
const { DailySurvey, Retro } = require("./classes.js");

const name = "mongo_api";

const mongoApi = {};

mongoApi.example_to_endpoint = async () => {
  const type = "post";
  const endpoint = "/";
  const params = "";
  const query = { user_id: "m2i32", team_id: "we12ef" };
  const body = { user_id: "23", email: "asd@gmail.com " };

  const response = await sendReq(name, type, endpoint, params, query, body);
  //! en caso de error se lanza un error con throwError.
  console.log(response);
  return response;
};

mongoApi.daily_survey_get = async (team_id) => {
  const type = "get";
  const endpoint = "/daily_survey_get_all_by_team";
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
  //console.log(response);
  return response;
};

mongoApi.daily_survey_post = async (body = new DailySurvey()) => {
  const type = "post";
  const endpoint = "/daily_survey";
  const params = "";
  const query = {};
  body.sprint = 0;
  // const body = {};

  const response = await sendReq(name, type, endpoint, params, query, body);

  return response;
};

mongoApi.daily_survey_comment_put = async (team_id, user_id, comment) => {
  const type = "get";
  const endpoint = "/daily_survey_comment";
  const params = "";
  const query = { team_id, user_id, comment };
  const body = {};

  const response = await sendReq(name, type, endpoint, params, query, body);
   //console.log(JSON.stringify(response));
  return response;
};

mongoApi.retro_post = async(body = new Retro()) => {
  const type = "post";
  const endpoint = "/retro";
  const params = "";
  const query = {};
  body.sprint = 0

  const response = await sendReq(name, type, endpoint, params, query, body);
   //console.log(JSON.stringify(response));
  return response;
};



module.exports = mongoApi;
