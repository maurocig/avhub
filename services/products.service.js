const ProductsDao = require('../models/daos/products/products.mongo.dao');

const Product = new ProductsDao();

class ProductsServices {
  async create(userDto) {
    const product = {
      title: userDto.title.trim(),
      price: userDto.price.trim(),
      image: userDto.image.trim(),
      stock: userDto.stock.trim(),
    };
    return await Product.save(payload);
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
