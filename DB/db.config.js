const envConfig = require('../config');
const firebaseConfig = require('./firebase/firebase.config');

module.exports = {
  file: {
    products: './DB/data/products.json',
    carts: './DB/data/carts.json',
  },
  mongodb: {
    uri: `mongodb+srv://maurocig:${envConfig.DB_PASSWORD}@coderxx.fm0gxl1.mongodb.net/?retryWrites=true&w=majority`,
  },
  firebase: {
    credentials: firebaseConfig,
  },
  // sql: {
  // 	mariadb: {
  // 		client: 'mysql',
  // 		host:
  // 	}
  // }
};
