const Mongoose = require('mongoose');
const ProductsDto = require('../models/dtos/Products.dto');
const ProductsServices = require('../services/products.service');
const { successResponse } = require('../utils/api.utils');
const logger = require('../middleware/logger');

const Product = new ProductsServices();

class ProductsController {
  async create(req, res, next) {
    try {
      const product = {
        _id: Mongoose.Types.ObjectId(),
        ...req.body,
      };
      await Product.create(product);
      const response = successResponse(product);
      res.status(201).json(response);
    } catch (error) {
      logger.error(error);
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const products = await Product.getAll();
      res.render('products/index', { products });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async getById(req, res, next) {
    const { id } = req.params;
    try {
      const product = await Product.getById(id);
      const user = req.user;
      res.render('products/show', { product, user });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    const { id } = req.params;
    try {
      const updatedProduct = {
        id,
        ...req.body,
      };
      await Product.update(id, req.body);
      const response = successResponse(updatedProduct);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    const { id } = req.params;
    try {
      const deletedProduct = await Product.delete(id);
      const response = successResponse(deletedProduct);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProductsController();
