const { promisify } = require("util");
const crypto = require("crypto");
const Restaurant = require("./../models/restaurantModel");
const catchAsync = require("./../utils/catchAsync");
const User = require("./../models/userModel");
const jwt = require("jsonwebtoken");
const AppError = require("./../utils/appError");

const SignToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = SignToken(user._id);
  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  });

  // Remove password from output
  user.password = undefined;
  res.status(statusCode).json({
    status: "OK",
    token: token,
    user,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  // Creating a new User
  const newUser = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    DOB: req.body.DOB,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    userPhoto: "profileD.png",
  });
  createSendToken(newUser, 201, req, res);
});

exports.signin = catchAsync(async (req, res, next) => {
  // Geting the req body
  const { email, password } = { ...req.body };
  if (!password || !email) {
    // check password and email
    return next(new AppError("Username or password required", 500));
  }
  const user = await User.findOne({ email }).select("+password");
  if (user && (await user.CheckPass(password, user.password))) {
    createSendToken(user, 200, req, res);
  } else {
    return next(new AppError("email or Password is not correct", 401));
  }
});

exports.signout = (req, res, next) => {
  res.cookie("jwt", "", {
    expires: new Date(Date.now() + 5 * 1000),
    httpOnly: true,
  });
  res.status(200).json({
    status: "OK",
    message: "signout of user is successful",
  });
};

// Protecting User not to access non-authorized data if he/she is not logged in
exports.protectAccess = catchAsync(async (req, res, next) => {
  // 1) Get token and checks if it's exist
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (req.cookies.jwt) token = req.cookies.jwt;
  if (!token) {
    return next(
      new AppError("You are not Logged in! Please Login to get access", 401)
    );
  }

  // 2) validate if Token is valid
  console.log(token);
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if User still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        "The User Belonging to this token does no longer exists !",
        401
      )
    );
  }
  // GRANT ACCESS TO PROTECTED ROUTES
  req.user = currentUser;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles is an array => ['admin','lead-guide]. role = 'user'
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You don not have permission to perform this action", 403)
      );
    }
    next();
  };
};

exports.onlyRestaurantOwner = catchAsync(async (req, res, next) => {
  let { restaurantId } = req.params;
  if (!restaurantId) restaurantId = req.body.restaurantId;
  const restaurant = await Restaurant.findById(restaurantId);
  if (!restaurant)
    return res.status(404).json({
      status: "fail",
      message: "no restaurant found with given Id",
    });
  if (restaurant.owner.toString() !== req.user.id.toString())
    return res.status(401).json({
      status: "fail",
      message: "this action is not allowed for you",
    });
  req.restaurant = restaurant;
  next();
});
