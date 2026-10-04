const mongoose = require('mongoose');

const orderrSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  orderItems: [
    {
      title: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }
    }
  ],
  totalPrice: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Orderr', orderrSchema);