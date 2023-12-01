const { sendResponse, sendError } = require("../helpers/managerController");
const { createTeamTest, viewMembers } = require("../services/teamServices")

const controller = {}

controller.teamPost = async(req, res) => {
try {
    const  {team, user_id}  = req.body   
    const result = await createTeamTest(team, user_id)
    res.status(200).json(result)
} catch (error) {
    res.status(400).json({ error: error.message });
}
}

controller.teamMembersGet = async(req, res) => {
    try {
        const { id } = req.params
        const result = await viewMembers(id)
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = controller