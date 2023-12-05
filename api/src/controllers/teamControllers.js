const { sendResponse, sendError } = require("../helpers/managerController");
const {
  createTeamTest,
  viewMembers,
  addUserToTeam,
  scrumGetTeam
} = require("../services/teamServices");

const controller = {};

controller.teamPost = async (req, res) => {
  try {
    const { team, user_id } = req.body;
    const result = await createTeamTest(team, user_id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

controller.teamByScrumGet = async(req, res) => {
try {
  const { id } = req.params
  const result = await scrumGetTeam(id)
  res.status(200).json(result);
} catch (error) {
  res.status(400).json({ error: error.message });
}
}


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
