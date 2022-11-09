const FilesContainer = require('../../containers/files.container');

const collection = 'carts';

class CartsFilesDao extends FilesContainer {
  constructor() {
    super(collection);
  }
}

module.exports = CartsFilesDao;
