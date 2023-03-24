const { Schema } = require('mongoose');

const MessageSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    type: {
      type: String,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = MessageSchema;
