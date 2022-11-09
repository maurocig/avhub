const FilesContainer = require('../../containers/files.container');
const dbConfig = require('../../../DB/db.config');

const collection = dbConfig.file.products;

class ProductsFilesDao extends FilesContainer {
  constructor() {
    super(collection);
  }
}

module.exports = ProductsFilesDao;
