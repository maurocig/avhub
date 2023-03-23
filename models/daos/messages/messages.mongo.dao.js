const MongoContainer = require('../../containers/mongo.container');
const MessageSchema = require('../../schemas/Message.schema');

const collection = 'messages';

class MessagesDao extends MongoContainer {
  constructor() {
    super(collection, MessageSchema);
  }

  async create(messageItem) {
    try {
      const message = await this.save(messageItem);
      return message;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = MessagesDao;
