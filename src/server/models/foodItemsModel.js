const mongoose = require("mongoose");

const FoodItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    validate: (v) => Array.isArray(v) && v.length < 20,
  },
  rating: {
    type: Number,
    default: 0,
  },
  pricePerQuantity: {
    type: Number,
    required: true,
  },
  restaurant: { type: mongoose.Schema.ObjectId, ref: "Restaurant" },
  quantity: {
    type: Number,
    default: 0,
  },
  review: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Review",
    },
  ],
});

module.exports = mongoose.model("FoodItem", FoodItemSchema);
