const express = require("express");
const paymentController = require("./../controllers/paymentController");
const authController = require("./../controllers/authController");
const Router = express.Router();

Router.post(
  "/order",
  authController.protectAccess,
  paymentController.createPayment
);

Router.post(
  "/verify",
  authController.protectAccess,
  paymentController.verifyPayment
);

module.exports = Router;
