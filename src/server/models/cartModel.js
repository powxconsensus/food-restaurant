const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    unique: true,
  },
  cartItems: [
    {
      restaurant: { type: mongoose.Schema.ObjectId, ref: "Restaurant" },
      item: [
        {
          foodItem: { type: mongoose.Schema.ObjectId, ref: "FoodItem" },
          quantity: {
            type: Number,
            min: 0,
            default: 1,
          },
        },
      ],
    },
  ],
});

module.exports = mongoose.model("Cart", CartSchema);
