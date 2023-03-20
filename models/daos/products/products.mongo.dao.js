const { Schema } = require('mongoose');
const MongoContainer = require('../../containers/mongo.container');

const collection = 'products';
const productsSchema = new Schema({
  title: { type: String, required: true },
  price: { type: Number },
  image: { type: String },
  stock: { type: Number },
  category: { type: String },
});

class ProductsMongoDao extends MongoContainer {
  constructor() {
    super(collection, productsSchema);
  }
}

module.exports = ProductsMongoDao;
