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
  console.log(response);
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

mongoApi.retro_post = async (body = new Retro()) => {
  const type = "post";
  const endpoint = "/retro";
  const params = "";
  const query = {};
  body.sprint = 0;

  const response = await sendReq(name, type, endpoint, params, query, body);
  console.log(JSON.stringify(response));
  return response;
};

mongoApi.recommendation_get = async (team_id) => {
  try {
    const type = "get";
    const endpoint = "/short_recommendation";
    const params = "";
    const query = { team_id };
    const body = {};

    const response = await sendReq(name, type, endpoint, params, query, body);
    console.log(JSON.stringify(response));
    return response;
  } catch (error) {
    console.log(error);
  }
};

mongoApi.trending_topics_get = async (team_id) => {
  try {
    const type = "get";
    const endpoint = "/trending_topics";
    const params = "";
    const query = { team_id };
    const body = {};

    const response = await sendReq(name, type, endpoint, params, query, body);
    console.log(JSON.stringify(response));
    return response;
  } catch (error) {
    console.log(error);
  }
};

mongoApi.recommendation_full_get = async (team_id) => {
  try {
    const type = "get";
    const endpoint = "/recommendation";
    const params = "";
    const query = { team_id };
    const body = {};

    const response = await sendReq(name, type, endpoint, params, query, body);
    console.log(JSON.stringify(response));
    return response;
  } catch (error) {
    console.log(error);
  }
};

mongoApi.boucle_recommendation_full_get = async () => {
  for (let i = 0; i < 3; i++) {
    const request = await mongoApi.trending_topics_get(
      "22d91f4c-ea5d-41bf-a93d-bfbca3a6709c"
    );
    if (JSON.stringify(request) === `{"status":200}`) {
      console.log("get");
      break;
    } else {
      console.log("not working recommendation, send again...");
    }
  }
};

module.exports = mongoApi;
