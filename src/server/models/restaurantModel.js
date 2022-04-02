const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  contactNo: {
    type: Number,
    required: true,
  },
  images: {
    type: [String],
    validate: (v) => Array.isArray(v) && v.length < 50,
  },
  rating: {
    type: Number,
    default: 0,
  },
  owner: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
  address: {
    type: String,
    required: true,
  },
  restaurantFoodItems: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "FoodItem",
    },
  ],
  openCloseStatus: {
    type: "String",
    enum: ["Open", "Close"],
    default: "Close",
  },
  applicationStatus: {
    type: String,
    enum: ["accepted", "rejected", "processing"],
    default: "processing",
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  review: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Review",
    },
  ],
});

module.exports = mongoose.model("Restaurant", restaurantSchema);
