const { addServices, getServices } = require(".");
const { User, Team } = require("../app/db");
const { UserTeam } = require("../app/dbRelations");
const throwError = require("../helpers/customError");
const { retro_post } = require("../microServices/api_mongo");
const { Retro } = require("../microServices/api_mongo/classes");

const analyticServices = {};
addServices("analytic", analyticServices);

analyticServices.createRetro = async (team_id, retroList) => {
  try {
    const existTeam = await UserTeam.findOne({
      where: { teamId: team_id },
    });
    if (!existTeam)
      throwError(
        "access_denied",
        403,
        "You not belong to this team or your team not exist."
      );

    const retro = new Retro(team_id);

    retro.c1 = retroList[0].tagsList;
    retro.c2 = retroList[1].tagsList;
    retro.c3 = retroList[2].tagsList;
    retro.c4 = retroList[3].tagsList;

    return await retro_post(retro);
  } catch (error) {
    console.log(error.message);
  }
};



module.exports = analyticServices;
