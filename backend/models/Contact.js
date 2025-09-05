// models/Contact.js
const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String },
  email: { type: String },
  address: { type: String },
  type: { type: String, enum: ["customer", "vendor"], required: true },
  businessId: { type: String, required: true } // link to business
});

module.exports = mongoose.model("Contact", contactSchema);
