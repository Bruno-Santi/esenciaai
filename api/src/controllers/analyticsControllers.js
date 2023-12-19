const { sendResponse, sendError } = require("../helpers/managerController");
const { createRetro } = require("../services/analyticServices");

const controller = {};

// controller.registerPost = async (req, res) => {
//   try {
//     const { user } = req.body;
//     const result = await userRegister(user);
//     sendResponse(res, 200, result);

//   } catch (error) {
//     sendError(res, error);
//   }
// };
controller.getData = async (req, res) => {
  try {
    const { team_id } = req.params;
    console.log(team_id);
    const response = await fetch(
      `https://us-central1-esencia-app.cloudfunctions.net/dashboard_data?team_id=${team_id}`
    ).then((response) => response.json());

    return { data: response };
  } catch (error) {
    throw new Error(error.message);
  }
};

controller.retroPost = async (req, res) => {
  try {
    console.log("controller retro :" + req.body.team_id);
    const { team_id, retroList } = req.body;
    console.log(team_id);
    const user_id = req.user_id_token;
    const result = await createRetro(team_id, user_id, retroList);
    sendResponse(res, 200, result);
  } catch (error) {
    sendError(res, error);
  }
};

module.exports = controller;
