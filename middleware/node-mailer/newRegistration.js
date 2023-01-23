const nodemailer = require('nodemailer');
const { ADMIN_EMAIL, PASSWORD_EMAIL } = require('../../config');

const TEST_MAIL = 'gerardo96@ethereal.email';
const PASSWORD = 'UBz6nSDYNPSqhD1e9a';

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email', // servidor integrado de nodemailer.
  port: 587,
  auth: {
    user: TEST_MAIL,
    pass: PASSWORD,
  },
});

const mailPayload = {
  from: TEST_MAIL,
  to: 'mcigliuti01@gmail.com',
  subject: 'Este es un mail de prueba desde Node.js 2',
  html: '<h1 style="color:teal;">Contenido de prueba desde <span style="color:red;">Node.js con Nodemailer</span></h1>',
};

const sendNewRegEmail = async (userInfo, adminEmail) => {
  try {
    const mailResponse = await transporter.sendMail({
      from: `enviador <${TEST_MAIL}>`,
      to: `Usuario <${adminEmail}>`,
      subject: 'E-commerce- Nuevo registro de usuario',
      text: userInfo,
    });
    console.log(mailResponse);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  sendNewRegEmail,
};
