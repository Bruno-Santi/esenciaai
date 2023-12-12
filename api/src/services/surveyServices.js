const { addServices, getServices } = require(".");
const { User, Team } = require("../app/db");
const { UserTeam } = require("../app/dbRelations");
const throwError = require("../helpers/customError");
const { daily_survey_post } = require("../microServices/api_mongo");
const { DailySurvey } = require("../microServices/api_mongo/classes");
const { sendExternalEmail } = require("../microServices/email/nodeMailer");

surveyService = {};
addServices("survey", surveyService);

surveyService.sendRequestOfDailySurvey = async (teamId, scrumMasterId) => {
  const getUserList = await UserTeam.findAll({
    where: { teamId },
    attributes: ["role"],
    include: [
      {
        model: User,
        attributes: ["id", "first_name", "last_name", "email", "password"],
      },
      {
        model: Team,
        attributes: ["name"],
      },
    ],
  });

  let checkScrumMasterId = "";
  let teamName = "";
  const user_list = [];

  getUserList.forEach((item) => {
    if (item.role === "admin") {
      checkScrumMasterId = item.User.id;
      teamName = item.Team.name;
    } else
      user_list.push({
        id: item.User.id,
        first_name: item.User.first_name,
        last_name: item.User.last_name,
        email: item.User.email,
        password: item.User.password,
      });
  });

  if (checkScrumMasterId !== scrumMasterId)
    throwError(
      "access_denied",
      403,
      "You not belong to this team or your team not exist."
    );
  await sendSurveyByEmail(teamId, teamName, user_list);

  return "Daily Survey Request sent to all team members successfully.";
};

sendSurveyByEmail = async (teamId, teamName, userList) => {
  for (let i = 0; i < userList.length; i++) {
    const { token } = await getServices("auth").userLogin(
      userList[i].email,
      userList[i].password
    );

    function capitalizeFirstLetter(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const subject = `Daily Survey ${capitalizeFirstLetter(teamName)}.`;

    await sendExternalEmail(userList[i].email, subject, {
      token,
      team_id: teamId,
      first_name: userList[i].first_name,
      team_name: teamName,
    });
  }
};

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
