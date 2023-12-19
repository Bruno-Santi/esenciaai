const { sendError, sendResponse } = require("../helpers/managerController");
const { daily_survey_post, daily_survey_comment_put } = require("../microServices/api_mongo");
const { DailySurvey } = require("../microServices/api_mongo/classes");
const {
  createSurvey,
  sendRequestOfDailySurvey,
  getSurveyByTeam,
  putCommentDailySurvey,
} = require("../services/surveyServices");

const controller = {};

controller.commentPut = async(req, res) => {
  try {
    const { team_id ,comment } = req.query 
    const user_id = req.user_id_token;
    const result = await putCommentDailySurvey(team_id,user_id, comment)
    sendResponse(res, 200, result);
  } catch (error) {
  sendError(res, error)    
  }
}

controller.surveyGet = async (req, res) => {
  try {
    const { team_id } = req.query;
    const result = await getSurveyByTeam(team_id, req.user_id_token);
    
    sendResponse(res, 200, result);
  } catch (error) {
    sendError(res, error);
  }
};

controller.dailySurveyPost = async (req, res) => {
  try {
    const { daily_survey } = req.body;
    daily_survey.user_id = req.user_id_token;
    const result = await createSurvey(daily_survey);

  res.status(200).json(result)
  } catch (error) {
    sendError(res, error);
  }
};

controller.sendAllMembersPost = async (req, res) => {
  try {
    const { team_id } = req.params;

    const result = await sendRequestOfDailySurvey(team_id, req.user_id_token);

    sendResponse(res, 200, result);
  } catch (error) {
    sendError(res, error);
  }
};

module.exports = controller;