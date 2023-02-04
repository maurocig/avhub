const UsersDao = require('../models/daos/users/users.mongo.dao');

const User = new UsersDao();

class UsersServices {
  async create(userItem) {
    return await User.save(userItem);
  }

  async getByEmail(email) {
    return await User.getByEmail(email);
  }

  async getAll() {
    return await User.getAll();
  }

  async getById(id) {
    return await User.getById(id);
  }

  async save(cart) {
    return await User.save(cart);
  }

  async update(id, payload) {
    return await User.update(id, payload);
  }

  async delete(id) {
    return await User.delete(id);
  }
}

module.exports = UsersServices;
