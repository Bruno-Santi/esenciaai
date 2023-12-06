const { Op } = require("sequelize");
const { User, Team } = require("../app/db");
const { UserTeam } = require("../app/dbRelations");
const throwError = require("../helpers/customError");
const { v4: uuidv4 } = require("uuid");
const { getServices, addServices } = require(".");
const bcrypt = require("bcrypt");
//* Create a services and dependencies injection.

const userService = {};
addServices("user", userService);

const saltRounds = 10;

//* Services :'

userService.createUser = async (user) => {
  try {
    const userExists = await User.findOne({ where: { email: user.email } });
    if (userExists) throwError("missing", 400, "El usuario ya existe.");
    const newUser = await User.create(user);

    return "User created successfully.";
  } catch (error) {
    throw error;
  }
};

userService.getUserAndTheirTeams = async (userId) => {
  //logo, name, id
  const userExists = await User.findByPk(userId);
  if (!userExists) throw new Error("No existe este scrum por ID");

  const { id, first_name, last_name, email } = userExists;

  const getTeamList = await UserTeam.findAll({
    where: { userId },
    attributes: ["teamId"],
    include: [
      {
        model: Team,
        attributes: ["id", "name", "logo"]
      }
    ]
  });

  const team_list = getTeamList.map((item) => ({
    id: item.Team.id,
    name: item.Team.name,
    logo: item.Team.logo
  }));

  return { user: { id, first_name, last_name, email }, team_list };
};


userService.inviteUser = async () => {};

userService.getAllUser = async (user) => {
  const getUsers = await User.findAll(user);
  try {
    if (getUsers.length === 0) throw new Error("no hay usuarios registrado");
    return getUsers;
  } catch (error) {
    throw error;
  }
};

userService.changePassword = async (email, password, new_password) => {
  const getUser = await User.findOne({ where: { email } });
  //  list.findAll(user => user.email === email && user.password === password);
  if (!getUser) {
    throwError("missing", 400, "El usuario no existe.");
  } else if (getUser.password !== password) {
    throwError("bad_request", 403, "Contraseña incorrecta.");
  }

  const updateUser = await User.update(
    { password: new_password, token_password: uuidv4() },
    { where: { email } }
  );

  return "Tu contraseña ha sido actualizada.";
};

userService.getById = async (id) => {
  if (!id) {
    throw Error("Datos incompletos");
  } else {
    const user = await User.findOne({
      where: { id },
      attributes: ["id", "first_name", "last_name", "email"],
    });
    if (!user) {
      throw Error("El usuario no se encuentra registrado");
    }
    return user;
  }
};

userService.getByEmail = async (email) => {
  const userEmail = await User.findAll({
    where: { email },
    attributes: ["id", "first_name", "last_name", "email", "city", "country"],
  });
  console.log("usuario :", userEmail);
  if (!userEmail) {
    throw Error("no se encuentra el email de este usuario");
  }
  return userEmail;
};

userService.deleteUser = async (id) => {
  if (!id) {
    throw new Error("el ID del usuario no proporcionado");
  } else {
    const user = await User.findByPk(id);

    if (!user) {
      throw new Error("El usuario no existe");
    }
    const deleteUser = await User.destroy({ where: { id } });

    if (deleteUser === 0) {
      throw new Error("El usuario no se pudo eliminar");
    }
    return `El usuario ${user.name} ${user.last_name} ha sido eliminado`;
  }
};

module.exports = userService;
