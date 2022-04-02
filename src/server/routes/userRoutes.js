const express = require("express");

const UserController = require("./../controllers/userController");
const authController = require("./../controllers/authController");

const Router = express.Router();

Router.post("/signup", authController.signup);
Router.post("/signin", authController.signin);
Router.get("/signout", authController.signout);

Router.patch(
  "/updateMe",
  authController.protectAccess,
  UserController.uploadProfilePhoto,
  UserController.resizeProfilePhoto,
  UserController.updateMe
);
Router.patch(
  "/updateRole",
  authController.protectAccess,
  authController.restrictTo("admin"),
  UserController.updateUserRole
);
Router.delete(
  "/deleteMe",
  authController.protectAccess,
  UserController.deleteMe
);
Router.route("/").get(
  authController.protectAccess,
  UserController.getLoggedInUser
);
module.exports = Router;
