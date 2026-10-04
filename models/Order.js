const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  orderItems: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }
    }
  ],
  amountDue: { type: Number, required: true },
  invoiceNumber: { type: String, required: true, unique: true },
  paymentMode: { type: String, default: 'Pending' },
  status: { type: String, enum: ['Incomplete', 'Complete'], default: 'Incomplete' },
  paymentStatus: { type: String, enum: ['Pending', 'Paid'], default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);