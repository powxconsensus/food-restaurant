const express = require("express");
const Router = express.Router();
const authController = require("./../controllers/authController");
const reviewController = require("./../controllers/reviewController");

Router.route("/").post(
  authController.protectAccess,
  reviewController.addReview
);

Router.route("/:reviewId").delete(
  authController.protectAccess,
  reviewController.deleteReview
);

Router.get(
  "/restaurant/:restaurantId",
  authController.protectAccess,
  reviewController.getReviewWithRestaurantID
);

Router.get(
  "/foodItem/:foodItemId",
  authController.protectAccess,
  reviewController.getReviewByFoodItemId
);

module.exports = Router;
