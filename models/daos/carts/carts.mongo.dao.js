const { Schema } = require('mongoose');
const MongoContainer = require('../../containers/mongo.container');

const collection = 'carts';
const cartsSchema = new Schema(
  {
    products: { type: Schema.Types.Array },
    timestamp: { type: Schema.Types.Date },
  },
  {
    timestamps: false,
  }
);

class CartsMongoDao extends MongoContainer {
  constructor() {
    super(collection, cartsSchema);
  }

  async addProduct(cartId, productId) {
    const cart = await this.model.findOne({ _id: cartId }, { __v: 0 });
    if (!cart) {
      const message = `Cart with id ${cartId} does not exist in our records.`;
      throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
    }
    const updatedCart = await this.model.updateOne(
      { _id: cartId },
      { $push: { products: productId } }
    );
    return updatedCart;
  }

  async removeProduct(cartId, productId) {
    const cart = await this.model.findOne({ _id: cartId }, { __v: 0 });
    if (!cart) {
      const message = `Cart with id ${cartId} does not exist in our records.`;
      throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
    }
    const updatedCart = await this.model.updateOne(
      { id: cartId },
      { $pull: { products: productId } }
    );
    return updatedCart;
  }
}

module.exports = CartsMongoDao;
