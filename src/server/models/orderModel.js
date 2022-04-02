const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    unique: true,
    required: true,
  },
  restaurant: {
    type: mongoose.Schema.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  foodItem: {
    type: [
      {
        item: { type: mongoose.Schema.ObjectId, ref: "FoodItem" },
        quantity: {
          type: Number,
          default: 0,
        },
      },
    ],
    validate: (v) => Array.isArray(v) && v.length > 0,
  },
  status: {
    type: String,
    enum: ["accepted", "rejected", "pending"],
    default: "pending",
  },
  rejectReason: String,
  amountRecieved: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Order", OrderSchema);
