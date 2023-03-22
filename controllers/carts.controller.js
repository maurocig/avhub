const HTTP_STATUS = require('../constants/api.constants');
// const { CartsDao } = require('../models/daos/app.daos');
const CartsDao = require('../models/daos/carts/carts.mongo.dao');
const { successResponse } = require('../utils/api.utils');
const logger = require('../middleware/logger');

const cartsDao = new CartsDao();

class CartsController {
  async getCarts(req, res, next) {
    try {
      logger.info('[GET] => /carts');
      const carts = await cartsDao.getAll();
      const response = successResponse(carts);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async getCartsById(req, res, next) {
    const { id } = req.params;
    logger.info(`[GET] => /carts/${id}`);
    try {
      const cart = await cartsDao.getById(id);
      const response = successResponse(cart);
      res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  async saveCart(req, res, next) {
    const cart = {
      timestamp: new Date(),
      ...req.body,
    };
    logger.info('[POST] => /carts');
    try {
      const newCart = await cartsDao.save(cart);
      const response = successResponse(newCart);
      res.status(HTTP_STATUS.CREATED).json(response);
    } catch (error) {
      next(error);
    }
  }

  async updateCart(req, res, next) {
    const { id } = req.params;
    logger.info(`[PUT] => /carts/${id}`);
    try {
      const updatedCart = await cartsDao.update(id, req.body);
      const response = successResponse(updatedCart);
      res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  async deleteCart(req, res, next) {
    const { id } = req.params;
    logger.info(`[DELETE] => /carts/${id}`);
    try {
      const deletedCart = await cartsDao.delete(id);
      const response = successResponse(deletedCart);
      res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  async getCartProducts(req, res, next) {
    const { id } = req.params;
    try {
      const cartProducts = await cartsDao.getProducts(id);
      return cartProducts;
    } catch (error) {
      next(error);
    }
  }

  async addToCart(req, res, next) {
    const { cartId, productId } = req.params;
    const { quantity } = req.body;

    try {
      const updatedCart = await cartsDao.addItemToCart(cartId, productId, quantity);
      if (!updatedCart) {
        res.send('This item is already on your cart.');
      }

      res.redirect('/cart');
    } catch (error) {
      next(error);
    }
  }

  async removeFromCart(req, res, next) {
    const { cartId, itemId } = req.params;
    try {
      const updatedCart = await cartsDao.removeItemFromCart(cartId, itemId);
      res.redirect('/cart');
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = new CartsController();
