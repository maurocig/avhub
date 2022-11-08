const FirebaseContainer = require('../../containers/firebase.container');

const collection = 'carts';

class CartsFirebaseDao extends FirebaseContainer {
  constructor() {
    super(collection);
  }
}

module.exports = CartsFirebaseDao;
