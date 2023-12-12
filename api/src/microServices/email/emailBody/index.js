const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

const getDocument = async (bodyName = "dailySurvey", link, fullName) => {
  let document = "";
  const fileHTML = path.join(__dirname, bodyName + ".html");

  await new Promise((resolve, reject) => {
    fs.readFile(fileHTML, "utf8", (error, data) => {
      if (error) {
        console.error("Error al leer el archivo:", error);
        reject();
      } else {
        document = data;
        resolve();
      }
    });
  });

  return document;
};


// async function name() {
//   console.log(await getDocument("dailySurvey"));
// }
// name();

module.exports = { getDocument };
