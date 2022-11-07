const dotenv = require('dotenv');

dotenv.config();

const DB_PASSWORD = process.env.DB_PASSWORD;
const DATASOURCE = process.env.DATASOURCE;
console.log({ DB_PASSWORD, DATASOURCE });

module.exports = {
  DB_PASSWORD,
  DATASOURCE,
};
