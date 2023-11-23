const bodyParser = require("body-parser");
const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");
const app = express();

const sequelize = new Sequelize("testing", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});

// Define the User and Group models
const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: false }
);

const Group = sequelize.define(
  "group",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: false }
);

// usergroup
User.belongsToMany(Group, { through: "UserGroup" });
Group.belongsToMany(User, { through: "UserGroup" });

const role = {
  type: DataTypes.ENUM,
  values: ["creator", "admin", "user", "out"],
  defaultValue: "user",
  allowNull: false,
};

const status = {
  type: DataTypes.ENUM,
  values: ["pending", "accepted", "join"],
  defaultValue: "pending",
  allowNull: false,
};
// usergroups

const UserGroup = sequelize.define(
  "UserGroup",
  { role, status },
  { freezeTableName: true }
);
UserGroup.belongsTo(User, { foreignKey: "userId", targetKey: "id" });
UserGroup.belongsTo(Group, { foreignKey: "groupId", targetKey: "id" });

// Función para inicializar usuarios y grupos por defecto
const initializeDefaultData = async () => {
  try {
    // Agregar tres usuarios por defecto
    await User.bulkCreate([
      { id: 1, name: "User 1" },
      { id: 2, name: "User 2" },
      { id: 3, name: "User 3" },
    ]);

    // Agregar tres grupos por defecto
    await Group.bulkCreate([
      { id: 1, name: "Grupo 1" },
      { id: 2, name: "Grupo 2" },
      { id: 3, name: "Grupo 3" },
    ]);

    console.log("Default data initialized");
  } catch (error) {
    console.error("Error initializing default data:", error);
  }
};

// Sincronizar los modelos con la base de datos
sequelize
  .sync()
  .then(async () => {
    console.log("Tables synchronized");
    // Llamar a la función de inicialización después de sincronizar las tablas
  })
  .catch((err) => {
    console.error("Error synchronizing tables:", err);
  });

// Ruta para agregar usuarios y grupos por defecto

// Resto de tu código

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/initial", async (req, res) => {
  try {
    // Llamar a la función de inicialización
    await initializeDefaultData();

    res.json({ message: "Default users and groups added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding default data" });
  }
});

app.post("/add_user_to_group", async (req, res) => {
  try {
    const { user_id, group_id } = req.body;
    const getUser = await User.findByPk(user_id);
    const getGroup = await Group.findByPk(group_id);

    // await getUser.addGroup(group_id);

    // await UserGroup.create({
    //   userId: user_id,
    //   groupId: group_id,
    //   status: "accepted",
    //   role: "creator",
    // });

    res.json({ message: "User added to group successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding user to group" });
  }
});

app.put("/update_user_to_group", async (req, res) => {
  try {
    const { user_id, group_id, new_status } = req.body;

    // Buscar la relación UserGroup existente
    const userGroup = await UserGroup.findOne({
      where: { userId: user_id, groupId: group_id },
    });

    if (userGroup) {
      userGroup.status = new_status;
      await userGroup.save();

      res.json({ message: "Status updated successfully" });
    } else {
      res.status(404).json({ message: "UserGroup relation not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating status" });
  }
});

app.listen(3000, () => {
  console.log("Express server running on port 3000");
});
