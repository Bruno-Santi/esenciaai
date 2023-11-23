const nodemailer = require("nodemailer");
const { getDocument } = require("./emailBody");
const dotenv = require("dotenv");
dotenv.config();

services = {};

const transport = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

 const sendExternalEmail = async (recipientEmail, subject) => {
  const body = await createBody("new_user");
  return await sendEmail(recipientEmail, subject, body);
};

const createBody = async (taskName, recipientName) => {
  let body = "";
  switch (taskName) {
    case "new_user":
      body = await getDocument(taskName, recipientName);
      break;

    case "password_changed":
      body = await getDocument(taskName, recipientName);
      break;
    default:
      break;
  }
  return body;
};

const sendEmail = async (recipientEmail, subject = "Holidays", body) => {
  const info = await transport.sendMail({
    from: "holidaysrama14@gmail.com",
    to: recipientEmail,
    subject,
    text: "",
    html: body,
  });
};


module.exports = { sendExternalEmail };
