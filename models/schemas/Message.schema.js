const { Schema } = require('mongoose');

const MessageSchema = new Schema(
  {
    email: {
      type: String,
    },
    type: {
      type: String,
    },
    body: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = MessageSchema;
