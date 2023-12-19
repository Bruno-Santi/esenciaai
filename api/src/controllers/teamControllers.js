const { sendResponse, sendError } = require("../helpers/managerController");
const {
  createTeamTest,
  viewMembers,
  addUserToTeam,
  scrumGetTeam,
  removeUserFromTeam,
} = require("../services/teamServices");

const controller = {};

controller.teamPost = async (req, res) => {
  try {
    const { team } = req.body;
    const user_id = req.user_id_token;

    const result = await createTeamTest(user_id, team);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message, details: error.stack });
  }
};

controller.teamByScrumGet = async (req, res) => {
  try {
    //$ T1 el usuario que viene el token debe exisitir en el team.
    //$ T2 debe devolver las prop. del team y una lista de los miembros del team.

    const { id } = req.params;
    const result = await scrumGetTeam(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

controller.userInvitedPost = async (req, res) => {
  try {
    const { team_id, user } = req.body;
    const result = await addUserToTeam(team_id, user);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

controller.teamMembersGet = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await viewMembers(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

controller.removeUserFromTeam = async (req, res) => {
  try {
    const { team_id, user_id } = req.body;

    const result = await removeUserFromTeam(team_id, user_id);

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = controller;
