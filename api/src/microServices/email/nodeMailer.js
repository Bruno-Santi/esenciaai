const nodemailer = require("nodemailer");
const { getDocument } = require("./emailBody");
const dotenv = require("dotenv");
dotenv.config();

services = {};

const transport = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const generateLink = ({ token, team_id, user_id }) => {
  return `http://localhost:3000/auth/link?token=${token}&team_id=${team_id}`;
};

const sendExternalEmail = async (
  recipientEmail,
  subject,
  { token, team_id, user_id }
) => {
  const body = await createBody(
    "add_user",
    generateLink({ token, team_id, user_id })
  );
  return await sendEmail(recipientEmail, subject, body);
};

const createBody = async (taskName, link) => {
  let body = "";
  switch (taskName) {
    case "add_user":
      body = `<div>
      <p>Tu link de registro es:</p>
      <p>${link}</p>
      </div>
      `;
      // body = await getDocument(taskName, recipientName);
      break;

    case "password_changed":
      body = await getDocument(taskName);
      break;
    default:
      break;
  }
  return body;
};

const sendEmail = async (recipientEmail, subject = "Holidays", body) => {
  const info = await transport.sendMail({
    from: process.env.EMAIL_USER,
    to: recipientEmail,
    subject,
    text: "",
    html: body,
  });
};

module.exports = { sendExternalEmail };
