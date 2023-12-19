const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const { sendError } = require("../helpers/managerController");
const throwError = require("../helpers/customError");
const {
  passwordLength,
  isEmail,
  userName,
  userLastName,
  userGenre,
  isString,
  isDateOfBirth,
  userStatusInfo,
  userRoles,
  userNickname,
  isPhone,
} = require("../helpers/regexValidation");
const { User } = require("../app/db");
dotenv.config();
const { USER_TOKEN_KEY } = process.env;
const middleware = {};

//% Middlewares :

middleware.checkUserValid = async (req, res, next) => {
  try {
    //NAME
    const userNameIsValid = userName(req.body.user.name);
    if (!userNameIsValid) {
      throw new Error(
        `No es valido este -- ${req.body.user.name} --nombre de usuario`
      );
    }

    //LAST NAME
    const lastNameIsValid = userLastName(req.body.user.last_name);
    if (!lastNameIsValid) {
      throw new Error(
        `El apellido -- ${req.body.user.last_name} -- no es valido`
      );
    }

    //EMAIL
    const userEmailIsValid = isEmail(req.body.user.email);
    console.log(userEmailIsValid);
    if (!userEmailIsValid) {
      throw new Error(`El email -- ${req.body.user.email} -- no es valido`);
    }

    //PASSWORD
    //  const passwordIsValid = passwordLength(req.body.user.password);

    //  if (!passwordIsValid) {
    //    throw new Error(`El password -- ${req.body.user.password} -- no es valido`);
    //  }

    next();
  } catch (error) {
    sendError(res, checkUnknownErrors(error));
  }
};

middleware.checkUserToken = async (req, res, next) => {
  try {
    // console.log(req.body)
    const getToken = req.headers["authorization"];

    const tokenDecoded = validateAndGetTokenDecoded(getToken, USER_TOKEN_KEY);

    //? Paso del id de usuario a controlador.
    req.user_id_token = tokenDecoded.id;

    const getUser = await User.findOne({ where: { id: tokenDecoded.id } });

    if (!getUser) throwError("missing", 404, "El usuario no existe.");

    if (getUser.token_password !== tokenDecoded.token_password)
      throwError("access_denied", 401, "Su Token es invalido.");

    next();
  } catch (error) {
    sendError(res, checkUnknownErrors(error));
  }
};

middleware.checkLoggin = async (req, res, next) => {
  try {
  } catch (error) {
    sendError(res, checkUnknownErrors(error));
  }
};

//$ Micro Services :

const validateAndGetTokenDecoded = (token, key) => {
  if (!token)
    return throwError("access_denied", 403, "No has proporciando un Token.");

  const tokenParts = token.split(" ");
  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer")
    return throwError("access_denied", 403, "Formato de Token inválido.");

  const decoded = jwt.verify(tokenParts[1], key);

  return decoded;
};

//! Manager Unknown Errors :

const checkUnknownErrors = (e) => {
  if (e.message === "jwt expired") {
    e.type = "access_denied";
    e.message = "El Token ha vencido.";
  }
  return e;
};

module.exports = middleware;
