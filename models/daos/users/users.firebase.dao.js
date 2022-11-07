const FirebaseContainer = require('../../containers/firebase.container');

const collection = 'users';

class UsersFirebaseDao extends FirebaseContainer {
  constructor() {
    super(collection);
  }
}

module.exports = UsersFirebaseDao;
