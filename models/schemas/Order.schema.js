const { Schema } = require('mongoose');

const OrderSchema = new Schema({
  orderNumber: {
    type: Number,
  },
  generated: {
    type: Boolean,
    default: true,
  },
  cartId: {
    type: Schema.Types.ObjectId,
    ref: 'carts',
  },
});

module.exports = OrderSchema;
