const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, 'Invalid email'],
  },
  password: { type: String, required: true },
  name: { type: String, required: true },
  address: { type: String },
  age: { type: Number },
  phone: { type: Number },
  image: { type: String },
  cart: { type: Schema.Types.ObjectId, ref: 'carts' },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
});

UserSchema.index({ email: 1 });

module.exports = UserSchema;
