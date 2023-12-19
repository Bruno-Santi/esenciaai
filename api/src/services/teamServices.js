const { Team, User } = require("../app/db");
const { UserTeam } = require("../app/dbRelations");
const throwError = require("../helpers/customError");
const { v4: uuidv4 } = require("uuid");
const { getServices, addServices } = require(".");

const teamServices = {};

teamServices.createTeamTest = async (userId, team) => {
  const existUser = await User.findByPk(userId);

  if (!existUser) throw new Error("no existe este usuario por ID");

  const existTeam = await Team.findOne({ where: { name: team.name } });

  if (existTeam) throw new Error("ya existe este Team");

  const newTeam = await Team.create(team);
  await UserTeam.create({
    userId,
    teamId: newTeam.id,
    role: "admin",
    job_role: "scrum master",
    status: "accepted",
  });

  return { team: { id: newTeam.id, name: newTeam.name, logo: newTeam.logo } };
};

teamServices.viewMembers = async (teamId) => {
  const adminUser = await UserTeam.findAll({
    where: { teamId, role: "user" },
    include: [
      {
        model: User,
        attributes: ["id", "first_name", "last_name", "email"],
      },
    ],
  });

  return {
    user_list: adminUser.map((item) => {
      const {
        User: { id, first_name, last_name, email },
      } = item;
      return { id, first_name, last_name, email };
    }),
  };
};

teamServices.addUserToTeam = async (teamId, user) => {
  console.log(user.email);
  const existingUser = await User.findOne({
    where: { email: user.email },
  });

  if (existingUser) {
    // El usuario ya existe, no es necesario crear uno nuevo.
    console.log("El usuario ya existe.");
  } else {
    // Crea un nuevo usuario solo si no existe.

    const getTeam = await Team.findOne({ where: { id: teamId } });

    if (!getTeam) {
      return "No se encontró el equipo con el ID proporcionado.";
    }

    const newUser = await User.create(user);
    console.log(newUser);

    await UserTeam.create({
      userId: newUser.id,
      teamId: getTeam.id,
      role: "user",
      job_role: "developer",
      status: "accepted",
    });
    return {
      user: {
        id: newUser.id,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
      },
    };
  }
};

teamServices.removeUserFromTeam = async (teamId, userId) => {
  console.log(userId);
  const existingUser = await User.findOne({
    where: { id: userId },
  });

  if (!existingUser) {
    console.log("El usuario no existe.");
    return "El usuario no existe.";
  }

  const getTeam = await Team.findOne({ where: { id: teamId } });

  if (!getTeam) {
    console.log("No se encontró el equipo con el ID proporcionado.");
    return "No se encontró el equipo con el ID proporcionado.";
  }

  await UserTeam.destroy({
    where: {
      userId: existingUser.id,
      teamId: getTeam.id,
    },
  });

  console.log("Usuario eliminado del equipo.");
  return "Usuario eliminado del equipo.";
};
teamServices.inviteUserByEmail = async (
  userId,
  job_role = "scrum master",
  email,
  password,
  first_name,
  last_name,
  teamId
) => {
  const existScrum = await UserTeam.findOne({
    where: {
      userId,
      job_role,
    },
  });

  if (existScrum) {
    throw new Error("Ya existe un SCRUM MASTER para este usuario en este equipo");
  }

  const newUser = await User.create({
    email,
    password,
    first_name,
    last_name,
  });

  await UserTeam.create({
    userId: newUser.id,
    teamId,
    role: "user", // Asigna un valor adecuado a 'role'
    job_role,
    status: "accepted",
  });

  return newUser;
};

teamServices.scrumGetTeam = async (teamId, role = "admin") => {
  const teamExists = await Team.findByPk(teamId);
  if (!teamExists) throw new Error("No existe este scrum por ID");

  const { id, name, logo } = teamExists;

  const getUserList = await UserTeam.findAll({
    where: { teamId, role: "user" },
    include: [
      {
        model: User,
        attributes: ["id", "first_name", "last_name", "email"],
      },
    ],
  });

  const user_list = getUserList.map((item) => ({
    id: item.User.id,
    first_name: item.User.first_name,
    last_name: item.User.last_name,
    email: item.User.email,
  }));

  return { team: { id, name, logo }, user_list };

  // const existScrum = await UserTeam.findOne({
  //   where: {
  //     userId,
  //     role,
  //   },
  // });

  // if (!existScrum) {
  //   throw new Error("No existe el scrum master");
  // } else {
  //   const teams = await UserTeam.findAll({
  //     where: {
  //       userId,
  //       job_role,
  //     },
  //     attributes: ["id", "role", "job_role"],
  //     include: [
  //       {
  //         model: Team,
  //         attributes: ["id", "name", "logo", "description"],
  //       },
  //       {
  //         model: User,
  //         attributes: ["id", "first_name", "last_name", "email"],
  //       },
  //     ],
  //   });

  //   return teams;
  // }
};

module.exports = teamServices;
