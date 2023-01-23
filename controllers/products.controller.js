const HTTP_STATUS = require('../constants/api.constants');
const { ProductsDao } = require('../models/daos/app.daos');
const { successResponse } = require('../utils/api.utils');
const Mongoose = require('mongoose');
const logger = require('../middleware/logger');

const productsDao = new ProductsDao();

class ProductsController {
  async getProducts(req, res, next) {
    try {
      const products = await productsDao.getAll();
      res.render('products/index', { products });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async getProductsById(req, res, next) {
    const { id } = req.params;
    try {
      const product = await productsDao.getById(id);
      const user = req.user;
      res.render('products/show', { product, user });
    } catch (error) {
      next(error);
    }
  }

  async saveProduct(req, res, next) {
    try {
      const product = {
        _id: Mongoose.Types.ObjectId(),
        timestamp: new Date(),
        ...req.body,
      };
      await productsDao.save(product);
      const response = successResponse(product);
      res.status(HTTP_STATUS.CREATED).json(response);
    } catch (error) {
      next(error);
    }
  }

  async updateProduct(req, res, next) {
    const { id } = req.params;
    try {
      const updatedProduct = {
        id,
        ...req.body,
      };
      await productsDao.update(id, req.body);
      const response = successResponse(updatedProduct);
      res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  async deleteProduct(req, res, next) {
    const { id } = req.params;
    try {
      const deletedProduct = await productsDao.delete(id);
      const response = successResponse(deletedProduct);
      res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProductsController();
