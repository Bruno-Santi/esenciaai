const dotenv = require("dotenv");
const { Sequelize, DataTypes } = require("sequelize");
const fs = require("fs");
const path = require("path");
dotenv.config();
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

let sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "mysql",
  logging: false, // *DEUBUG
});

const basename = path.basename(__filename);
const modelPath = "../models";
const modelDefiners = [];

fs.readdirSync(path.join(__dirname, modelPath))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, modelPath, file)));
  });

modelDefiners.forEach((model) => model(sequelize));
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

module.exports = {
  ...sequelize.models,
  sequelize,
  conn: sequelize,
};
