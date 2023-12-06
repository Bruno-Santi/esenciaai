const { sendResponse, sendError } = require("../helpers/managerController");
const {
  createTeamTest,
  viewMembers,
  addUserToTeam,
  scrumGetTeam,
} = require("../services/teamServices");

const controller = {};

controller.teamPost = async (req, res) => {
  try {
    const { team } = req.body;

    const user_id = req.user_id_token;

    //$ T1 crear un team.
    //$ T2 añadir al scrum master como admin del team, la id del scrum master la sacas del token.

    const result = await createTeamTest(team, user_id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
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
    const { teamId, user } = req.body;
    const result = await addUserToTeam(teamId, user);
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

module.exports = controller;
