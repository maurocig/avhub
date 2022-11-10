const MemoryContainer = require('../../containers/memory.container');
const dbConfig = require('../../../DB/db.config');

const data = dbConfig.memory.products;
const resource = 'Product';

class ProductsMemoryDao extends MemoryContainer {
  constructor() {
    super(data, resource);
  }
}

module.exports = ProductsMemoryDao;
