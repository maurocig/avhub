const HTTP_STATUS = require('../constants/api.constants');
const { CartsDao } = require('../models/daos/app.daos');
const { successResponse } = require('../utils/api.utils');

const cartsDao = new CartsDao();

class CartsController {
  async getCarts(req, res, next) {
    try {
      const carts = await cartsDao.getAll();
      const response = successResponse(carts);
      res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  async getCartsById(req, res, next) {
    const { id } = req.params;
    try {
      const cart = await cartsDao.getById(id);
      const response = successResponse(cart);
      res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  async saveCart(req, res, next) {
    try {
      const cart = {
        timestamp: new Date(),
        ...req.body,
      };
      const newCart = await cartsDao.save(cart);
      const response = successResponse(newCart);
      res.status(HTTP_STATUS.CREATED).json(response);
    } catch (error) {
      next(error);
    }
  }

  async updateCart(req, res, next) {
    const { id } = req.params;
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
    try {
      const updatedCart = await cartsDao.addProduct(cartId, productId);
      const response = successResponse(updatedCart);
      res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  async removeFromCart(req, res, next) {
    const { cartId, productId } = req.params;
    try {
      const updatedCart = await cartsDao.removeProduct(cartId, productId);
      const response = successResponse(updatedCart);
      res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = new CartsController();
