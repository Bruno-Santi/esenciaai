const { Resend } = require("resend");
const resend = new Resend("re_BPin5jZi_BTe1pGzUmGgUNJAbwAwE1uW4");

resend.emails.send({
  from: "onboarding@resend.dev",
  to: "facu995electro@hotmail.com",
  subject: "El team de esencia",
  html: "<p>te hablamos de esencia <strong>funciona</strong>!</p>",
});
