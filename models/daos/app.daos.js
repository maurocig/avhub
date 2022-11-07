const envConfig = require('../../config');

let ProductsDao;
let UsersDao;

switch (envConfig.DATASOURCE) {
  case 'mongo':
    ProductsDao = require('./products/products.mongo.dao');
    UsersDao = require('./users/users.mongo.dao');
    CartsDao = require('./carts/carts.mongo.dao');
    break;

  case 'firebase':
    ProductsDao = require('./products/products.firebase.dao');
    UsersDao = require('./users/users.firebase.dao');
    break;

  default:
    throw new Error('Invalid Datasource');
}

module.exports = {
  ProductsDao,
  UsersDao,
  CartsDao,
};
