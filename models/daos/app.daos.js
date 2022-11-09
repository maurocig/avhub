const envConfig = require('../../config');

let ProductsDao;
let UsersDao;
let CartsDao;

switch (envConfig.DATASOURCE) {
  case 'mongo':
    ProductsDao = require('./products/products.mongo.dao');
    CartsDao = require('./carts/carts.mongo.dao');
    break;

  case 'firebase':
    ProductsDao = require('./products/products.firebase.dao');
    CartsDao = require('./carts/carts.firebase.dao');
    break;

  case 'files':
    ProductsDao = require('./products/products.files.dao');
    CartsDao = require('./carts/carts.files.dao');
    break;

  default:
    throw new Error('Invalid Datasource');
}

module.exports = {
  ProductsDao,
  UsersDao,
  CartsDao,
};
