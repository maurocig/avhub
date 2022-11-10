const MemoryContainer = require('../../containers/files.container');
const dbConfig = require('../../../DB/db.config');

const collection = dbConfig.memory.products;

class ProductsMemoryDao extends MemoryContainer {
  constructor() {
    super(collection);
  }
}

module.exports = ProductsMemoryDao;
