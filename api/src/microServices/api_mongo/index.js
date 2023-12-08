const { query } = require("express");
const { exampleToEndpoint } = require("./endpoints");
const { dailySurvey } = require("./mongoClass");

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
  return sendRequest;
};

microServices.createRetro = async () => {};

//* Services to get data from mongo.

microServices.getAnalytics = async (
  daily_survey = 0,
  date = 0,
  self_satisfaction = 15,
  survey = 0,
  user_id = "",
  sprint = 1,
  question1 = 5,
  question2 = 5,
  question3 = 6,
  question4 = 6,
  comment = "good team",
  team_collaboration = 12,
  work_engagement = 10,
  workspace = 8
) => {
  const query = {
    daily_survey,
    date,
    self_satisfaction,
    survey,
    user_id,
    sprint,
    question1,
    question2,
    question3,
    question4,
    comment,
    team_collaboration,
    work_engagement,
    workspace,
  };
  return sendRequest;
};

microServices.getReports = async (user_id = "text", comment = "text") => {
  const body = {
    user_id,
    comment,
  };
  return sendRequest;
};

microServices.getAnalyticsTimeline = async () => {};

const micro = (daily = new dailySurvey()) => {
  exampleToEndpoint(daily);
};

micro(new dailySurvey("1", "2"));

module.exports = microServices;
