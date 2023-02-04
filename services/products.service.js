const ProductsDao = require('../models/daos/products/products.mongo.dao');

const Product = new ProductsDao();

class ProductsServices {
  async create(userItem) {
    return await Product.save(userItem);
  }

  async getAll() {
    return await Product.getAll();
  }

  async getById(id) {
    return await Product.getById(id);
  }

  async update(id, payload) {
    return await Product.update(id, payload);
  }

  async delete(id) {
    return await Product.delete(id);
  }
}

module.exports = ProductsServices;
