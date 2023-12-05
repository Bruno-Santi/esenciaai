const dotenv = require("dotenv");
const { Op } = require("sequelize");
const { User } = require("../app/db");
const { USER_TOKEN_KEY, ENCRYPTED_KEY } = process.env;
const { getServices, addServices } = require(".");
const jwt = require("jsonwebtoken");
const throwError = require("../helpers/customError");
dotenv.config();
//const crypto = require("crypto");
const nodemailer = require("nodemailer");
const { sendExternalEmail } = require("../microServices/email/nodeMailer");
const {  } = require("../services/userServices")
const passwordGenerator = require('password-generator');


//* Create a services and dependencies injection.

const services = {};
addServices("auth", services);

//* Services :|

services.userRegister = async (user) => {
 
  // if (getUser && getUser.password) {
  //   const password = getUser.password;
  //   const secretKey = ENCRYPTED_KEY;
  //   const cipher = crypto.createCipher("aes-256-cbc", secretKey);
  //   const encryptedPassword =
  //     cipher.update(password, "utf8", "hex") + cipher.final("hex");

    return await getServices("user").createUser(user);
  // } else {
  //   // Manejo de error o manejo de casos en los que no se proporciona una contraseña válida.
  //   throw new Error("Contraseña no válida o datos de usuario incompletos.");
  // }
};

services.userDecrypt = async (email) => {
  const getUserEmail = await User.findOne({
    where: { email },
    attributes: ["id", "email", "first_name", "last_name", "password"],
  });

  if (!getUserEmail) {
    throw new Error("No se ha encontrado el usuario con este email");
  } else {
    const passwordEncrypted = Buffer.from(getUserEmail.password, "hex"); // Convertir a Buffer en lugar de usar 'hex'
    const secretKey = Buffer.from(ENCRYPTED_KEY, "utf8"); // Convierte la clave a Buffer
    const decipher = crypto.createDecipheriv(
      "aes-256-cbc",
      secretKey,
      Buffer.alloc(16)
    ); // Usar createDecipheriv

    let decryptedPassword = decipher.update(passwordEncrypted, null, "utf8");
    decryptedPassword += decipher.final("utf8");

    // La contraseña desencriptada está ahora en la variable decryptedPassword.
    return decryptedPassword;
  }
};

services.userLogin = async (email, password) => {
  const getUser = await User.findOne({ where: { email } });

  if (!getUser) {
    throwError("missing", 400, "El usuario no existe.");
  } else if (getUser.password !== password) {
    throwError("bad_request", 403, "Contraseña incorrecta.");
  }



  // Crear un token con la información del usuario
 return await createUserToken(
    getUser.id,
    getUser.token_password,
    USER_TOKEN_KEY
  );

  // Devolver un objeto que contiene el token y la información del usuario
  return { token, ...userData };
};
  

  services.userInvited = async (user) => {

      const getUser = await User.findOne({
        where: { email: user.email }, 
      });
  
      if (getUser) {
        throwError("missing", 400, "El usuario ya existe.");
      } else {
        // Generar contraseña
        const password = passwordGenerator(6, false);
  
        const userCreate = await User.create({
          email: user.email,
          password: password,
        });
  
        const token = await createUserToken(
          userCreate.id,
          userCreate.token_password,
          USER_TOKEN_KEY
        );
  
        return token;
      }
      }  //AGREGAR ID, NOMBRE Y APELLIDO
//RENDERIZAR TODOS LOS TEAM DE UN SCRUM MASTUR BY ID




services.changeTokenPassword = async (email, password, loginType) => {
  const getUser = await User.findOne({ where: { email } });

  if (!getUser) {
    throwError("missing", 400, "El usuario no existe.");
  } else if (getUser.password !== password) {
    throwError("bad_request", 400, "Contraseña Incorrecta.");
  }

  return await createUserToken(
    getUser.id,
    getUser.token_password,
    USER_TOKEN_KEY
  );
};

services.getTokenIdName = async(id) => {
  if(!id) {
    throw new Error("Datos incompletos")
  } else {
    const getUser = await User.findOne({where: { id },
    attributes:  [
      "id",
      "first_name",
      "last_name",
      "email", 
      "token_password"
    ]})
    if(!getUser) throw new Error("no existe este usuario")
     
    return getUser
  }
}
//$ Micro Services :


const createUserToken = async (
  userId,
  token_password,
  secret,
  expiresInDays = 30
) => {
  const getToken = jwt.sign({ id: userId, token_password }, secret, {
    expiresIn: expiresInDays * 86400,
  });
  return { token: getToken };
};

module.exports = services;
