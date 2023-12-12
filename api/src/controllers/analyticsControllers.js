const { log } = require("console");
const { sendResponse, sendError } = require("../helpers/managerController");

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
controller.getData = async (req, res, team_id) => {
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
module.exports = controller;
