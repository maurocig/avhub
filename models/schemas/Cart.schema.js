const { Schema } = require('mongoose');

const itemSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'products',
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity must be at least 1.'],
    },
  },
  {
    timestamps: true,
  }
);

const CartSchema = new Schema(
  {
    items: [itemSchema],
    subTotal: {
      type: Number,
      default: 0,
    },
    email: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = CartSchema;
