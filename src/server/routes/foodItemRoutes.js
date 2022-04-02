const { Route } = require("express");
const express = require("express");

const Router = express.Router();
const authController = require("./../controllers/authController");
const foodItemController = require("./../controllers/foodItemController");

Router.route("/").post(
  authController.protectAccess,
  authController.onlyRestaurantOwner,
  foodItemController.addFoodItemInRestaurant
);

Router.get(
  "/restaurant/:restaurantId",
  authController.protectAccess,
  foodItemController.getFoodItemByRestaurantId
);

Router.route("/:foodItemId/restaurant/:restaurantId/").patch(
  authController.protectAccess,
  authController.onlyRestaurantOwner,
  foodItemController.uploadFoodItemImage,
  foodItemController.resizeFoodItemImage,
  foodItemController.updateFoodItem
);

Router.route("/:foodItemId")
  .get(authController.protectAccess, foodItemController.getFoodItemById)
  .delete(authController.protectAccess, foodItemController.deleteFoodItem);

module.exports = Router;
