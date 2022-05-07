const nodemailer = require("nodemailer");
require('dotenv').config({ path: '.env' });

const { EMAIL_USER, EMAIL_PASSWORD, PORT } = process.env;

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD,
  },
});

module.exports.sendInvitationEmail = async (name, email, token) => {
  try {
    console.log("Check");
    console.log(EMAIL_USER);
    console.log(EMAIL_PASSWORD);
    await transport.sendMail({
      from: EMAIL_USER,
      to: email,
      subject: "Este es un mensaje de prueba",
      html: `<h1>Correo de invitacion para nuestra plataforma</h1>
          <h2>Hola ${name}</h2>
          <p>Aca va un mensaje que fueron seleccionados para bla bla bla</p>
          <a href=http://localhost:${PORT}/confirm/${token}> Haga Click</a>
          </div>`,
    });
  } catch (error) {
    console.error(error);
  }
};