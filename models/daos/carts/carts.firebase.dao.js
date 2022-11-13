const FirebaseContainer = require('../../containers/firebase.container');
const admin = require('firebase-admin');

const collection = 'carts';

class CartsFirebaseDao extends FirebaseContainer {
  constructor() {
    super(collection);
  }

  async addProduct(cartId, productId) {
    const cartRef = await this.query.doc(cartId);
    if (!cartRef) {
      const message = `Cart with id ${cartId} does not exist in our records.`;
      throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
    }
    await cartRef.update({
      products: admin.firestore.FieldValue.arrayUnion(productId),
    });
    const document = await cartRef.get();
    return document.data();
  }

  async removeProduct(cartId, productId) {
    const cartRef = await this.query.doc(cartId);
    if (!cartRef) {
      const message = `Cart with id ${cartId} does not exist in our records.`;
      throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
    }
    await cartRef.update({
      products: admin.firestore.FieldValue.arrayRemove(productId),
    });
    const document = await cartRef.get();
    return document.data();
  }
}

module.exports = CartsFirebaseDao;
