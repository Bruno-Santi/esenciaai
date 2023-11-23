const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const { sendError, sendResponse } = require("../../../helpers/managerController");
const throwError = require("../../../helpers/customError");
const { User } = require("../../../app/db")
const { Datatypes } =require("sequelize")

dotenv.config();

const { USER_TOKEN_KEY } = process.env;
const middleware = {};

//% Middlewares :

middleware.checkEmail = async (req, res, next) => {
  const emailValid = await User.findOne({where: { email: req.body.user.email }})
  try {
    if(emailValid) {
      throwError("bad_request", 400, `Este email -- ${req.body.user.email} -- existe`)
    }
    if(!emailValid) {
      sendResponse(res, 200, "Este email no existe")
    }

    next();
  } catch (error) {
    sendError(res, checkUnknownErrors(error));
  }
};

middleware.checkPhone = async (req, res, next) => {
  try {
    const phoneValid = await User.findAll({where: { phone: req.body.user.phone }})
    if(phoneValid) {
      throwError("Bad_request", 400, `Este numero celular -- ${req.body.user.phone} --  ya existe`)
    }
    if(!phoneValid) {
      sendResponse(res, 200, "Este numero celular no existe")
    }

    next();
  } catch (error) {
    sendError(res, checkUnknownErrors(error));
  }
};

middleware.checkNickname = async (req, res, next) => {
  try {
    const nicknameValid = await User.findAll({where: { nickname: req.body.user.nickname }})
    if(nicknameValid) {
      throwError("Bad_request", 400, `Este nickname -- ${req.body.user.nickname} -- ya existe`)
    } 
    if(!nicknameValid) {
      sendResponse(res, 200, "Este nickname no existe")
    }
    next();
  } catch (error) {
    sendError(res, checkUnknownErrors(error));
  }
};

//$ Micro Services :

//! Manager Unknown Errors :

const checkUnknownErrors = (e) => {
  if (e.message === "jwt expired") {
    e.type = "access_denied";
    e.message = "El Token ha vencido.";
  }
  return e;
};

module.exports = middleware;
