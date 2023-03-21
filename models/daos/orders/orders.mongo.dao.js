const OrderSchema = require('../../schemas/Order.schema');
const MongoContainer = require('../../containers/mongo.container');

const collection = 'orders';

class OrdersDao extends MongoContainer {
  constructor() {
    super(collection, OrderSchema);
  }
}

module.exports = OrdersDao;
