const dotenv = require('dotenv');

dotenv.config();

const DB_PASSWORD = process.env.DB_PASSWORD;
const DATASOURCE = process.env.DATASOURCE;
const SESSION_SECRET = process.env.SESSION_SECRET;

console.log({ DB_PASSWORD, DATASOURCE });

module.exports = {
  DB_PASSWORD,
  DATASOURCE,
  SESSION_SECRET,
};
