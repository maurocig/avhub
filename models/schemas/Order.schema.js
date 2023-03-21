const { Schema } = require('mongoose');

const OrderSchema = new Schema(
  {
    items: [],
    email: {
      type: String,
    },
    address: {},
    generated: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = OrderSchema;
