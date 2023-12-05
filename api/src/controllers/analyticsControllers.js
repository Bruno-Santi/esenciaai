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


module.exports = controller;
