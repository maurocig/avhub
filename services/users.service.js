const UsersDao = require('../models/daos/users/users.mongo.dao');

const User = new UsersDao();

const createUser = async (userItem) => {
  return await User.create(userItem);
};

const getUserByEmail = async (email) => {
  return await User.getByEmail(email);
};

const getUserById = async (id) => {
  return await User.getById(id);
};

module.exports = { createUser, getUserByEmail, getUserById };
