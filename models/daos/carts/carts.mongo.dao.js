const MongoContainer = require('../../containers/mongo.container');
const CartSchema = require('../../schemas/Cart.schema');

const collection = 'carts';

class CartsDao extends MongoContainer {
  constructor() {
    super(collection, CartSchema);
  }

  async getByIdAndPopulate(id) {
    const cart = await this.model
      .findOne({ _id: id }, { __v: 0 })
      .populate('items.productId')
      .lean();
    return cart;
  }

  async addItem(id, item) {
    const updatedCart = await this.model.updateOne({ _id: id }, { $push: { items: item } });
    return updatedCart;
  }

  async removeItem(cartId, itemId) {
    const updatedCart = await this.model.updateOne(
      { _id: cartId },
      { $pull: { items: { _id: itemId } } }
    );
    return updatedCart;
  }
}

module.exports = CartsDao;
