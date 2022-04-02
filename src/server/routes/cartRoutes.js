const express = require("express");
const authController = require("./../controllers/authController");
const cartController = require("./../controllers/cartController");
const Router = express.Router();

Router.route("/")
  .patch(
    authController.protectAccess,
    cartController.createCartIfNotExist,
    cartController.addOrRemoveItemFromCart
  )
  .get(
    authController.protectAccess,
    cartController.createCartIfNotExist,
    cartController.getCartItems
  )
  .delete(
    authController.protectAccess,
    cartController.createCartIfNotExist,
    cartController.clearCart
  );

module.exports = Router;
