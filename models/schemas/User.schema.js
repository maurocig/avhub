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
  age: { type: String },
  phone: { type: Number },
  picture: { type: String },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
});

UserSchema.index({ email: 1 });

module.exports = UserSchema;
