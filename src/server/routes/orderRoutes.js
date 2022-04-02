const express = require("express");
const authController = require("./../controllers/authController");
const orderController = require("./../controllers/orderController");

const Router = express.Router();

Router.route("/user").get(
  authController.protectAccess,
  orderController.getOrderByUserId
);

Router.route("/:orderId")
  .post(authController.protectAccess, orderController.createOrder)
  .get(authController.protectAccess, orderController.getOrderById)
  .delete(authController.protectAccess, orderController.cancelOrder);

Router.route("/:restaurantId/:isAccepted/:orderId").patch(
  authController.protectAccess,
  authController.onlyRestaurantOwner,
  orderController.rejectOrAcceptOrder
);

Router.route("/restaurant/:restaurantId").get(
  authController.protectAccess,
  authController.onlyRestaurantOwner,
  orderController.getOrderByRestaurantId
);

module.exports = Router;
