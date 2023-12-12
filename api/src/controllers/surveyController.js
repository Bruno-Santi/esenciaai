
const { sendError, sendResponse } = require("../helpers/managerController");
const { daily_survey_post } = require("../microServices/api_mongo");
const { DailySurvey } = require("../microServices/api_mongo/classes");
const {
  createSurvey,
  sendRequestOfDailySurvey,
} = require("../services/surveyServices");

const controller = {};

controller.dailySurveyPost = async (req, res) => {
  try {
    const { daily_survey } = req.body;
    daily_survey.user_id = req.user_id_token;
    const result = await createSurvey(daily_survey);

    sendResponse(res, 200, result);
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
