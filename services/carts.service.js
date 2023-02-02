const CartsDao = require('../models/daos/carts/carts.mongo.dao');

const Cart = new CartsDao();

const createCart = async () => {
  return await Cart.save({ items: [] });
};

const addItemToCart = async (cartId, productId, quantity) => {
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
  throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
};

const removeItemFromCart = async (cartId, itemId) => {
  const cart = await Cart.getById({ _id: cartId }, { __v: 0 });

  if (cart) {
    const updatedCart = await Cart.removeItem(cartId, itemId);
    return updatedCart;
  }
  const message = `Cart with id ${cartId} does not exist in our records.`;
  throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
};

module.exports = { createCart, addItemToCart, removeItemFromCart };
