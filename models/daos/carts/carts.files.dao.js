const FilesContainer = require('../../containers/files.container');
const dbConfig = require('../../../db/db.config');

const HTTP_STATUS = require('../../../constants/api.constants');
const { HttpError } = require('../../../utils/api.utils');

const collection = dbConfig.file.carts;

class CartsFilesDao extends FilesContainer {
  constructor() {
    super(collection);
  }

  async addProduct(cartId, productId) {
    const file = await this.getFile();
    const filtrado = file.filter((cart) => cart.id === cartId);
    if (filtrado <= 0) {
      const message = `Cart with id ${cartId} does not exist in our records.`;
      throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
    }
    const cart = filtrado[0];
    cart.products.push(productId);
    return await this.update(cartId, cart);
  }

  async removeProduct(cartId, productId) {
    const file = await this.getFile();
    const filtrado = file.filter((cart) => cart.id === cartId);
    if (!filtrado) {
      const message = `Cart with id ${cartId} does not exist in our records.`;
      throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
    }
    const cart = filtrado[0];
    const index = cart.products.findIndex((item) => item === productId);
    cart.products.splice(index, 1);
    return await this.update(cartId, cart);
  }
}

module.exports = CartsFilesDao;
