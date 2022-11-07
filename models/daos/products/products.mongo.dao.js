const { Schema } = require('mongoose');
const MongoContainer = require('../../containers/mongo.container');

const collection = 'products';
const productsSchema = new Schema({
  // id: { type: Schema.Types.ObjectId },
  title: { type: String },
  price: { type: Number },
  image: { type: String },
  stock: { type: Number },
});

class ProductsMongoDao extends MongoContainer {
  constructor() {
    super(collection, productsSchema);
  }
}

module.exports = ProductsMongoDao;
