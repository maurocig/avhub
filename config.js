const dotenv = require('dotenv');

dotenv.config();

const DB_PASSWORD = process.env.DB_PASSWORD;
const DATASOURCE = process.env.DATASOURCE;
const SESSION_SECRET = process.env.SESSION_SECRET;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const PASSWORD_EMAIL = process.env.PASSWORD_EMAIL;
const ADMIN_PHONE = process.env.ADMIN_PHONE;
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;
const TWILIO_WHATSAPP = process.env.TWILIO_WHATSAPP;

console.log({ DB_PASSWORD, DATASOURCE });

module.exports = {
  DB_PASSWORD,
  DATASOURCE,
  SESSION_SECRET,
  ADMIN_EMAIL,
  PASSWORD_EMAIL,
  ADMIN_PHONE,
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_PHONE_NUMBER,
  TWILIO_WHATSAPP,
};
