const { daily_survey_post, testRequest } = require("./endpoints");
const microServices = {};

//* Services to modify data from mongo.

//% Envía la encuesta diaria para cada usuario del team.

microServices.createDailySurvey = async (
  user_id = "",
  team_id = "",
  sprint = 1,
  question1 = 0,
  question2 = 0,
  question3 = 0,
  question4 = 0,
  comment = ""
) => {
  const body = {
    user_id,
    team_id,
    sprint,
    question1,
    question2,
    question3,
    question4,
    comment,
  };

  const sendRequest = await daily_survey_post(body);
  return sendRequest;
};

microServices.addCommentInDailySurvey = async (
  user_id = "",
  team_id = "",
  comment = ""
) => {
  const query = {
    user_id,
    team_id,
    comment,
  };
  const sendRequest = await daily_survey_post(query);
  return sendRequest;
};

microServices.createRetro = async (
  team_id = "",
  sprint = 0,
  c1 = [],
  c2 = [],
  c3 = [],
  c4 = []
) => {
  daily_survey_post(body);
};

//* Services to get data from mongo.

microServices.getAnalytics = async (body) => {
  daily_survey_post(body);
};

microServices.getReports = async (body) => {
  daily_survey_post(body);
};

microServices.getAnalyticsTimeline = async (body) => {
  daily_survey_post(body);
};

module.exports = microServices;
