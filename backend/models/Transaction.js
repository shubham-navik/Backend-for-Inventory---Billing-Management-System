// models/Transaction.js
const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  type: { type: String, enum: ["sale", "purchase"], required: true },
  customerId: { type: String }, // only for sales
  vendorId: { type: String },   // only for purchases
  products: [
    {
      productId: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }
    }
  ],
  totalAmount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  businessId: { type: String, required: true } // link to business
});

module.exports = mongoose.model("Transaction", transactionSchema);
