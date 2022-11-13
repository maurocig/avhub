const admin = require('firebase-admin');
const { getFirestore } = require('firebase-admin/firestore');

const dbConfig = require('../../DB/db.config');

admin.initializeApp({
  credential: admin.credential.cert(dbConfig.firebase.credentials),
});

class FirebaseContainer {
  constructor(collection) {
    const db = getFirestore();
    this.query = db.collection(collection);
  }

  static async connect() {}

  async getAll() {
    const docRef = await this.query.get();
    const documents = docRef.docs;
    return documents.map((document) => {
      return {
        id: document.id,
        ...document.data(),
      };
    });
  }

  async getById(id) {
    const docRef = this.query.doc(id);
    const docSnap = await docRef.get();
    if (!docRef) {
      const message = `Resource with id ${id} does not exist in our records.`;
      throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
    }
    return docSnap.data();
  }

  async save(item) {
    const docRef = this.query.doc();
    return await docRef.set(item);
  }

  async update(id, item) {
    const docRef = this.query.doc(id);
    if (!docRef) {
      const message = `Resource with id ${id} does not exist in our records.`;
      throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
    }
    return await docRef.update(item);
  }

  async delete(id) {
    const docRef = this.query.doc(id);
    return await docRef.delete();
  }
}

module.exports = FirebaseContainer;
