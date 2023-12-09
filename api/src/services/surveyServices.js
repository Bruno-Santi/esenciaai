const { User, Team } = require("../app/db");
const { UserTeam } = require("../app/dbRelations");
const throwError = require("../helpers/customError");
const { daily_survey_post } = require("../microServices/api_mongo");
const { DailySurvey } = require("../microServices/api_mongo/classes");

surveyService = {};

surveyService.createSurvey = async (daily_survey = new DailySurvey()) => {
  const teamExist = await UserTeam.findOne({
    where: { teamId: daily_survey.team_id, userId: daily_survey.user_id },
  });

  if (!teamExist)
    throwError(
      "access_denied",
      403,
      "You not belong to this team or your team not exist."
    );

  const daily = await daily_survey_post(daily_survey);

  if (daily) return "Daily survey created.";
};

module.exports = surveyService;
