const { query } = require("express");
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
  const body = {
    team_id,
    sprint,
    c1,
    c2,
    c3,
    c4
  }
const sendRequest = await  daily_survey_post(body);
return sendRequest;
};

//* Services to get data from mongo.

microServices.getAnalytics = async (                      
  daily_survey = 0,
  date = 0,
  self_satisfaction = 15,
  survey = 0,
  user_id= "",
  sprint = 1,
  question1 = 5,
  question2 = 5,
  question3 = 6,
  question4 = 6,
  comment = "good team",                   
  team_collaboration = 12,
  work_engagement= 10,
  workspace= 8    
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
    workspace   
  };
  const sendRequest = await daily_survey_post(query);
  return sendRequest;
} 


microServices.getReports = async ( 
  user_id="text",
  comment="text"
) =>{
  const body = {
    user_id,
    comment
  };
  const sendRequest = await daily_survey_post(body);
  return sendRequest;
}

microServices.getAnalyticsTimeline = async () => {

} 

module.exports = microServices;
