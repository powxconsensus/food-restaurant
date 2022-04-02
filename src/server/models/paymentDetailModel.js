const mongoose = require("mongoose");

const PaymentDetailSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    unique: true,
    required: true,
  },
  orders: [{ type: mongoose.Schema.ObjectId, ref: "Order" }], //required: true
  amountRecieved: {
    type: Number,
    required: true,
  },
  receiptId: {
    type: String,
    required: true,
  },
  paymentId: {
    type: String,
  },
  signature: {
    type: String,
  },
  currency: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
  },
  status: {
    type: String,
  },
});

module.exports = mongoose.model("PaymentDetail", PaymentDetailSchema);
