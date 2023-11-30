const { sendResponse, sendError } = require("../helpers/managerController");
const { userRegister, userLogin, userDecrypt, getTokenIdName } = require("../services/authServices");
const jwt = require("jsonwebtoken");
const path = require('path');
const controller = {};


controller.registerPost = async (req, res) => {
  try {
    const { user, loginType, step } = req.body;
    const result = await userRegister(user, loginType);
    sendResponse(res, 200, result);
    
  } catch (error) {
    sendError(res, error);
  }
};

controller.viewPassword = async(req, res) => {
  try {
    const { email } = req.params.email;
    const result = await userDecrypt(email)
    sendResponse(res, 200, result)
  } catch (error) {
    sendError(res, error)
  }
}

controller.loginPost = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await userLogin(email, password);
    sendResponse(res, 200, result);
  } catch (error) {
    sendError(res, error);
  }
};

controller.viewToken = async(req, res) => {
  try {
    const { user_id } = req.body;
    const result = await getTokenIdName( user_id )
    sendResponse(res, 200, result)
  } catch (error) {
    sendError(res, error)
  }
}
controller.logoutPost = async (req, res) => {
  try {
    // const { user, loginType, step } = req.body;

    // const result = await registerUser(user, loginType, step);
    sendResponse(res, 200, "result");
  } catch (error) {
    sendError(res, error);
  }
};

controller.policyUseGet = (req, res) => {
  const filePath = path.join(__dirname, '../pdf/policy_use.pdf');
  res.download(filePath, 'policy_use.pdf');
}

module.exports = controller;
