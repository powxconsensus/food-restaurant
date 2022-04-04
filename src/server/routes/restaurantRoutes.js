const express = require("express");
const authController = require("./../controllers/authController");
const restaurantController = require("./../controllers/restaurantController");
const Router = express.Router();

Router.route("/")
  .post(authController.protectAccess, restaurantController.addRestaurant)
  .get(restaurantController.getRecommendationRestaurant);
Router.route("/admin").get(
  authController.protectAccess,
  restaurantController.getRestaurantToAcceptAndReject
);
Router.get(
  "/searchItems",
  restaurantController.getFilteredRestaurantAndFoodItem
);

Router.route("/mine").get(
  authController.protectAccess,
  restaurantController.getRestaurantByUserId
);

Router.route("/:restaurantId")
  .get(restaurantController.getRestaurantById)
  .patch(
    authController.protectAccess,
    authController.onlyRestaurantOwner,
    restaurantController.uploadRestaurantImage,
    restaurantController.resizeRestaurantImage,
    restaurantController.updateRestaurant
  )
  .delete(authController.protectAccess, restaurantController.deleteRestaurant);
Router.patch(
  "/acceptOrReject/:restaurantId",
  authController.protectAccess,
  restaurantController.acceptOrRejectRestaurantApplication
);

module.exports = Router;
