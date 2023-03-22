const logger = require('../../../middleware/logger');
const { HttpError, errorResponse } = require('../../../utils/api.utils');
const MongoContainer = require('../../containers/mongo.container');
const CartSchema = require('../../schemas/Cart.schema');

const collection = 'carts';

class CartsDao extends MongoContainer {
  constructor() {
    super(collection, CartSchema);
  }

  async getByIdAndPopulate(id) {
    const cart = await this.model.findOne({ _id: id }, { __v: 0 }).populate('items.productId').lean();
    logger.info(cart);
    return cart;
  }

  async addItemToCart(cartId, productId, quantity) {
    const cart = await this.model.findOne({ _id: cartId }, { __v: 0 });
    if (cart) {
      const cartItem = {
        productId,
        quantity,
      };

      if (cart.items.some((item) => item.productId == cartItem.productId)) {
        return false;
      }

      const updatedCart = await this.model.updateOne({ _id: cartId }, { $push: { items: cartItem } });
      return updatedCart;
    }

    const message = `Cart with id ${cartId} does not exist in our records.`;
    throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
  }

  async removeItemFromCart(cartId, itemId) {
    const cart = await this.model.findOne({ _id: cartId }, { __v: 0 });
    if (!cart) {
      const message = `Cart with id ${cartId} does not exist in our records.`;
      throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
    }

    /* const updatedCart = await this.model.updateOne( */
    /*   { id: cartId }, */
    /*   { $pull: { items: itemId } }, */
    /*   { new: true } */
    /* ); */

    cart.items.pull(itemId);
    await cart.save();

    return cart;
  }
}

module.exports = CartsDao;
