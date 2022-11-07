const envConfig = require('../config');
const firebaseConfig = require('./firebase/firebase.config.json');

module.exports = {
  file: {
    users: '/DB/data/users.json',
    products: '/DB/data/products.json',
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
