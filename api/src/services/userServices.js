const { Op } = require("sequelize");
const { User } = require("../app/db");
const throwError = require("../helpers/customError");
const { v4: uuidv4 } = require("uuid");
const { getServices, addServices } = require(".");
const bcrypt = require("bcrypt")
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

    return newUser;
  } catch (error) {
    throw error;
  }
};


userService.getAllUser = async(user) => {
  const getUsers = await User.findAll(user)
  try {
    if(getUsers.length === 0 ) throw new Error("no hay usuarios registrado")
    return getUsers
    
  } catch (error) {
    throw error
  }
}


userService.changePassword = async (email, password, new_password) => {
  const getUser = await User.findOne({ where: { email} });
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
      attributes: [
        "id",
        "name",
        "last_name",
        "email",
        "city",
        "state",
        "country",
      ],
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
    attributes: ["id", "name", "last_name", "email", "city", "country"],
  });
  console.log("usuario :", userEmail)
  if (!userEmail) {
    throw Error("no se encuentra el email de este usuario");
  }
  return userEmail;
};


userService.deleteUser = async (id) => {
  if(!id) {
    throw new Error("el ID del usuario no proporcionado")
  } else {
    const user = await User.findByPk(id);

    if(!user) {
      throw new Error("El usuario no existe")
    }
    const deleteUser = await User.destroy({where: {id}})
   
    if(deleteUser === 0) {
      throw new Error("El usuario no se pudo eliminar")
    }
    return (`El usuario ${user.name} ${user.last_name} ha sido eliminado`)
  }
}

userService.editProfileUser = async({id, name, last_name, genre, city, state, country }) => {
  if(!id) {
    throw new Error("datos incompletos")
  } else {
    const user = await User.findOne({where: {id}})
    if(!user) {
      throw new Error("El usuario no esta registrado")
    }

    userUpdate = {};

    if(name && name != user.name) userUpdate.name = name;
    if(last_name && last_name != user.last_name) userUpdate.last_name = last_name;
    if(genre && genre != user.genre) userUpdate.genre = genre;
    if(city && city != user.city) userUpdate.city = city;
    if(state && state != user.state) userUpdate.state = state
    if(country && country != user.country) userUpdate.country = country

    const updateUser = await User.update(userUpdate, {where: {id}})

    if(updateUser[0] === 0) {
      throw new Error("El usuario no fue actualizado")
    }

    return (`El Usuario ${user.name} ${user.last_name} ha sido actualizado`)
  }

}

module.exports = userService;
