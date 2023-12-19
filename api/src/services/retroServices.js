const { addServices, getServices } = require(".");
const { User, Team } = require("../app/db");
const { UserTeam } = require("../app/dbRelations");
const throwError = require("../helpers/customError");
const {
  trending_topics_get,
  recommendation_get,
  boucle_recommendation_full_get,
  topic_get,
} = require("../microServices/api_mongo");
const { DailySurvey } = require("../microServices/api_mongo/classes");
const {
  sendExternalEmail,
  sendRetro,
} = require("../microServices/email/nodeMailer");

retroService = {};
addServices("retro", retroService);

retroService.sendRequestOfRetro = async (teamId) => {
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

  trending_topics_get(teamId);
  boucle_recommendation_full_get(teamId);
  topic_get(teamId);

  await sendSurveyByEmail(teamId, "teamName", user_list);

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

    const subject = `Retrospective ${capitalizeFirstLetter(teamName)}.`;

    await sendRetro(userList[i].email, subject, {
      team_id: teamId,
      first_name: userList[i].first_name,
      team_name: teamName,
    });
  }
};

module.exports = retroService;
