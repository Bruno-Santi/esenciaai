const {
  getAllUser,
  getById,
  getByEmail,
  changePassword,
  deleteUser,
  editProfileUser,
  scrumGet,
} = require("../services/userServices");
const { sendResponse, sendError } = require("../helpers/managerController");
const controller = {};

//GET ALL //
controller.usersGet = async (req, res) => {

  // const { user_id } = req.body;

  // $ T1 que devuelva solo un usuario.
  // $ T2 que devuelva la lista de teams a los que pertenece el usuario. Ojo solo las id de los teams en las lista.

  // const user = await getAllUser();
  // const teamsList = await getTeamList();

  // const result = { user, teamsList };

  const { user_id } = req.params
  const result = await scrumGetAllTeams(user_id)
  res.status(200).json(result)
  try {
    res.status(200).json("result");
  } catch (error) {
    res.status(error.status || 404).json(error.payload || error.message);
  }
};

//GET SCRUM MASTER
controller.userScrumGet = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await scrumGet(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 404).json(error.payload || error.message);
  }
};

// GET BY ID //
controller.userById = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await getById(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//GET BY EMAIL//
controller.userByEmail = async (req, res) => {
  const email = req.params.email;
  try {
    const result = await getByEmail(email);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

controller.updatePasswordPut = async (req, res) => {
  try {
    const { email, password, new_password } = req.body;

    const result = await changePassword(email, password, new_password);
    sendResponse(res, 200, result);
  } catch (error) {
    sendError(res, error);
  }
};

controller.deletedUser = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await deleteUser(id);
    res.status(200).json(result);
  } catch (error) {
    throw error;
  }
};

controller.updateUser = async (req, res) => {
  const user = req.body;
  try {
    const result = await editProfileUser(user);
    res.status(200).json(result);
  } catch (error) {
    throw error;
  }
};
module.exports = controller;
