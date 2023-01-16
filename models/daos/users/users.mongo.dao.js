const MongoContainer = require('../../containers/mongo.container');
const { HttpError } = require('../../../utils/api.utils');
const UserSchema = require('../../schemas/User.schema');
const constants = require('../../../constants/api.constants');

const collection = 'Users';

class UsersDao extends MongoContainer {
  constructor() {
    super(collection, UserSchema);
  }

  async createUser(userItem) {
    try {
      const user = await this.save(userItem);
      return user;
    } catch (error) {
      if (
        error.message.toLowerCase().includes('e11000') ||
        error.message.toLowerCase().includes('duplicate')
      ) {
        throw new HttpError(constants.HTTP_STATUS.BAD_REQUEST, 'User with given email already exist');
      }
      throw new HttpError(constants.HTTP_STATUS.INTERNAL_ERROR, error.message, error);
    }
  }

  async getById(id) {
    try {
      const document = await this.model.findById(id, { __v: 0 }).lean();
      if (!document) {
        const errorMessage = `Resource with id ${id} does not exist in our records`;
        throw new HttpError(constants.HTTP_STATUS.NOT_FOUND, errorMessage);
      } else {
        return document;
      }
    } catch (error) {
      throw new HttpError(constants.HTTP_STATUS.INTERNAL_ERROR, error.message, error);
    }
  }

  async getByEmail(email) {
    try {
      const document = await this.model.findOne({ email }, { __v: 0 });
      if (!document) {
        const errorMessage = `Wrong username or password`;
        throw new HttpError(constants.HTTP_STATUS.NOT_FOUND, errorMessage);
      } else {
        return document;
      }
    } catch (error) {
      throw new HttpError(constants.HTTP_STATUS.INTERNAL_ERROR, error.message, error);
    }
  }
}

module.exports = UsersDao;
