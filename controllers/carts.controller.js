const { successResponse } = require('../utils/api.utils');
const logger = require('../middleware/logger');
const CartsServices = require('../services/carts.service');

const Cart = new CartsServices();

class CartsController {
  async getAll(req, res, next) {
    logger.info('[GET] => /carts');
    try {
      const carts = await Cart.getAll();
      const response = successResponse(carts);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    const { id } = req.params;
    logger.info(`[GET] => /carts/${id}`);
    try {
      const cart = await Cart.getById(id);
      const response = successResponse(cart);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async saveCart(req, res, next) {
    logger.info('[POST] => /carts');
    const cart = {
      ...req.body,
    };
    try {
      const newCart = await Cart.save(cart);
      const response = successResponse(newCart);
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  async updateCart(req, res, next) {
    const { id } = req.params;
    logger.info(`[PUT] => /carts/${id}`);
    try {
      const updatedCart = await Cart.update(id, req.body);
      const response = successResponse(updatedCart);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async deleteCart(req, res, next) {
    const { id } = req.params;
    logger.info(`[DELETE] => /carts/${id}`);
    try {
      const deletedCart = await Cart.delete(id);
      const response = successResponse(deletedCart);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async addItem(req, res, next) {
    const { cartId, productId } = req.params;
    const { quantity } = req.body;

    try {
      const updatedCart = await Cart.addItem(cartId, productId, quantity);
      if (!updatedCart) {
        res.send('This item is already on your cart.');
      }

      res.redirect('/cart');
    } catch (error) {
      next(error);
    }
  }

  async removeItem(req, res, next) {
    const { cartId, itemId } = req.params;
    logger.info(`[DELETE] => /carts/${cartId}/${itemId}`);

    try {
      const updatedCart = await Cart.removeItem(cartId, itemId);
      if (!updatedCart) {
        res.send('cart was not updated');
      }

      res.redirect('/cart');
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = new CartsController();
