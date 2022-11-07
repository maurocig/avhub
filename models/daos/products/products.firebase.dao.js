const FirebaseContainer = require('../../containers/firebase.container');

const collection = 'products';

class ProductsFirebaseDao extends FirebaseContainer {
  constructor() {
    super(collection);
  }
}

module.exports = ProductsFirebaseDao;
