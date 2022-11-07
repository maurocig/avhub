const HTTP_STATUS = require('../constants/api.constants');
const { UsersDao } = require('../models/daos/app.daos');
const { successResponse } = require('../utils/api.utils');

const usersDao = new UsersDao();

class UsersController {
  async getUsers(req, res, next) {
    try {
      const users = await usersDao.getAll();
      const response = successResponse(users);
      res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async getUsersById(req, res, next) {
    const { id } = req.params;
    try {
      const user = await usersDao.getById(id);
      const response = successResponse(user);
      res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  async saveUser(req, res, next) {
    try {
      const newUser = await usersDao.save(req.body);
      const response = successResponse(newUser);
      res.status(HTTP_STATUS.CREATED).json(response);
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req, res, next) {
    const { id } = req.params;
    try {
      const updatedUser = await usersDao.update(id, req.body);
      const response = successResponse(updatedUser);
      res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req, res, next) {
    const { id } = req.params;
    try {
      const deletedUser = await usersDao.delete(id);
      const response = successResponse(deletedUser);
      res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  /* async populate(req, res, next) { */
  /*   const { qty } = req.query; */
  /*   try { */
  /*     const users = usersDao.populate(qty); */
  /*     const response = successResponse(users); */
  /*     res.status(HTTP_STATUS.OK).json(response); */
  /*   } catch (error) { */
  /*     next(error); */
  /*   } */
  /* } */
}

module.exports = new UsersController();
