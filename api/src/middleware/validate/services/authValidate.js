const dotenv = require("dotenv");
// const { User } = require("../app/db");
dotenv.config();

const { USER_TOKEN_KEY } = process.env;
const middleware = {};

//% Middlewares :

middleware.checkEmail = async () => {
  try {
    // const getUser = await User.findOne({ where: { id: tokenDecoded.id } });
    // if (!getUser) throwError("missing", 404, "El usuario no existe.");

  } catch (error) {
    sendError(res, checkUnknownErrors(error));
  }
};

middleware.checkPhone = async () => {
  try {
    // const getUser = await User.findOne({ where: { id: tokenDecoded.id } });

    // if (!getUser) throwError("missing", 404, "El usuario no existe.");

  } catch (error) {
    sendError(res, checkUnknownErrors(error));
  }
};

middleware.checkNickname = async () => {
  try {
    // const getUser = await User.findOne({ where: { id: tokenDecoded.id } });

    // if (!getUser) throwError("missing", 404, "El usuario no existe.");

  } catch (error) {
    sendError(res, checkUnknownErrors(error));
  }
};

//$ Micro Services :

module.exports = middleware;
