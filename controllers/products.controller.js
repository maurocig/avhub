const Mongoose = require('mongoose');
const { ProductsDao } = require('../models/daos/app.daos');
const { successResponse } = require('../utils/api.utils');
const logger = require('../middleware/logger');

const productsDao = new ProductsDao();

class ProductsController {
  async getAll(req, res, next) {
    try {
      const products = await productsDao.getAll();
      if (req.user) {
        res.render('products/index', { products });
      } else {
        res.redirect('/login');
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async getById(req, res, next) {
    const { id } = req.params;
    try {
      const product = await productsDao.getById(id);
      const user = req.user;
      res.render('products/show', { product, user });
      // res.send(product);
    } catch (error) {
      next(error);
    }
  }

  async save(req, res, next) {
    try {
      const user = req.user;
      const product = {
        _id: Mongoose.Types.ObjectId(),
        timestamp: new Date(),
        ...req.body,
      };
      await productsDao.save(product);
      const response = successResponse(product);
      res.status(201).json(response);
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
      await productsDao.update(id, req.body);
      const response = successResponse(updatedProduct);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    const { id } = req.params;
    try {
      const deletedProduct = await productsDao.delete(id);
      const response = successResponse(deletedProduct);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async getByCategory(req, res, next) {
    const { id } = req.params;
    const products = await productsDao.getAll({ category: id });
    if (products.length === 0) {
      res.send('No existen productos con esa categoría.');
    }
    res.render('products/index', { products });
  }
}

module.exports = new ProductsController();
