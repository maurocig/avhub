const CartsDao = require('../models/daos/carts/carts.mongo.dao');
const Cart = new CartsDao();

class CartsServices {
  async create() {
    return await Cart.save({ items: [] });
  }

  async getAll() {
    return await Cart.getAll();
  }

  async getById(id) {
    return await Cart.getById(id);
  }

  async save(cart) {
    return await Cart.save(cart);
  }

  async update(id, payload) {
    return await Cart.update(id, payload);
  }

  async delete(id) {
    return await Cart.delete(id);
  }

  async addItem(cartId, productId, quantity) {
    const cart = await Cart.getById({ _id: cartId }, { __v: 0 });
    if (cart) {
      const cartItem = {
        productId,
        quantity,
      };
      if (cart.items.some((item) => item.productId == cartItem.productId)) {
        return false;
      }
      const updatedCart = await Cart.addItem(cartId, cartItem);
      return updatedCart;
    }

    const message = `Cart with id ${cartId} does not exist in our records.`;
    throw new HttpError(404, message);
  }

  async removeItem(cartId, itemId) {
    const cart = await Cart.getById({ _id: cartId }, { __v: 0 });
    if (cart) {
      const updatedCart = await Cart.removeItem(cartId, itemId);
      return updatedCart;
    }
    const message = `Cart with id ${cartId} does not exist in our records.`;
    throw new HttpError(404, message);
  }
}

module.exports = CartsServices;
