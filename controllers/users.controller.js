const UsersServices = require('../services/users.service');
const { successResponse } = require('../utils/api.utils');
const Mongoose = require('mongoose');

const User = new UsersServices();

class UsersController {
  async getAll(req, res, next) {
    try {
      const users = await User.getAll();
      const response = successResponse(users);
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async getById(req, res, next) {
    const { id } = req.params;
    try {
      const user = await User.getById(id);
      const response = successResponse(user);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async save(req, res, next) {
    try {
      const user = {
        _id: Mongoose.Types.ObjectId(),
        ...req.body,
      };
      await User.save(user);
      const response = successResponse(user);
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    const { id } = req.params;
    try {
      const updatedUser = {
        _id: id,
        ...req.body,
      };
      await User.update(id, req.body);
      const response = successResponse(updatedUser);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    const { id } = req.params;
    try {
      const deletedUser = await User.delete(id);
      const response = successResponse(deletedUser);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UsersController();
