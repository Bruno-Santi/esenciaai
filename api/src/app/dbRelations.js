const { DataTypes } = require("sequelize");
const { Team, User, sequelize } = require("../app/db");

//% Global Properties.

const role = {
  type: DataTypes.ENUM,
  values: ["admin", "user"],
  defaultValue: ["user"],
  allowNull: false,
};

const job_role = {
  type: DataTypes.STRING,
  defaultValue: ["none"],
  validate: { notEmpty: true },
  allowNull: false,
};

const status = {
  type: DataTypes.ENUM,
  values: ["pending", "accepted", "joined", "banned"],
  defaultValue: ["joined"],
  allowNull: false,
};

//$ ["user_group"].

User.belongsToMany(Team, { through: "UserTeam" });
Team.belongsToMany(User, { through: "UserTeam" });

const UserTeam = sequelize.define(
  "UserTeam",
  { role, job_role, status },
  { paranoid: true },
  { freezeTableName: true }
);

UserTeam.belongsTo(User, { foreignKey: "userId", targetKey: "id" });
UserTeam.belongsTo(Team, { foreignKey: "teamId", targetKey: "id" });

//$ END.

module.exports = {
  UserTeam
};
