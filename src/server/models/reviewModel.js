const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  reviewer: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
    max: 5,
    required: true,
  },
  reviewOn: {
    type: String,
    enum: ["restaurant", "foodItem"],
    required: true,
  },
  restaurant: { type: mongoose.Schema.ObjectId, ref: "Restaurant" },
  foodItem: { type: mongoose.Schema.ObjectId, ref: "FoodItem" },
});

module.exports = mongoose.model("Review", ReviewSchema);
