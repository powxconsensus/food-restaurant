const Restaurant = require("../models/restaurantModel");
const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");
const { filterObj } = require("./../utils/util");
const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");
const { mkDir } = require("./../utils/util");

exports.addRestaurant = catchAsync(async (req, res, next) => {
  const { name, description, address, contactNo } = req.body;
  const restaurant = await Restaurant.create({
    name,
    description,
    address,
    contactNo,
    owner: req.user.id,
    images: ["defaultRes.png"],
  });
  res.status(200).json({
    status: "OK",
    message: "resaurant application got succesfully executed",
    restaurant,
  });
});

exports.getRestaurantByUserId = catchAsync(async (req, res) => {
  const { status } = req.query;
  const restaurants = await Restaurant.find({
    owner: req.user.id,
    applicationStatus: status,
  });
  res.status(200).json({
    restaurants,
  });
});

const checkRestaurantApplicationStatus = (res) => {
  res.status(401).json({
    status: "fail",
    message: "restaurant application is under process",
  });
};

exports.deleteRestaurant = catchAsync(async (req, res) => {
  const { restaurantId } = req.params;
  const restaurant = await Restaurant.findById(restaurantId);
  if (!restaurant)
    return res.status(404).json({
      status: "fail",
      message: "No restaurant found with given id",
    });
  if (req.user.id != restaurant.owner) {
    return res.status(401).json({
      status: "fail",
      message: "restaurant can only be deleted by owner of restaurant",
    });
  }
  await Restaurant.findByIdAndDelete(restaurantId);
  res.status(200).json({
    status: "Ok",
    data: null,
  });
});

exports.getRecommendationRestaurant = catchAsync(async (req, res) => {
    const recommendationRestaurant = await Restaurant.find({
    applicationStatus: "accepted",
  });
  res.status(200).json({
    status: "OK",
    recommendationRestaurant,
  });
});

exports.getRestaurantById = catchAsync(async (req, res) => {
  const { restaurantId } = req.params;
  const restaurant = await Restaurant.findById(restaurantId);
  if (!restaurant)
    return res.status(404).json({
      status: "fail",
      message: "No restaurant found with given id",
    });
  res.status(200).json({
    status: "OK",
    restaurant,
  });
});

//::TODO once accepted restaurant, admin or moderator can not able to change the status
exports.acceptOrRejectRestaurantApplication = catchAsync(
  async (req, res, next) => {
    const { restaurantId } = req.params;
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant)
      return res.status(404).json({
        status: "fail",
        message: "No restaurant found with given id",
      });
    if (req.user.role !== "admin" && req.user.role !== "moderator") {
      return res.status(404).json({
        status: "fail",
        message: "you are not allowed to do this action",
      });
    }
    const status = req.body.isAccepted == "true" ? "accepted" : "rejected";
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      restaurantId,
      { applicationStatus: status },
      { new: true }
    );
    res.status(200).json({
      status: "OK",
      updatedRestaurant,
    });
  }
);

//update restaurant

const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an Image! Upload Appropiate Image!!", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadRestaurantImage = upload.fields([
  { name: "images", maxCount: 5 },
]);

exports.resizeRestaurantImage = catchAsync(async (req, res, next) => {
  if (!req.files || !req.files.images) return next();
  if (req.files.images.length > 0) {
    req.images = [];
    await Promise.all(
      req.files.images.map(async (image) => {
        const imageName = `restaurant-${req.restaurant._id}-${Date.now()}.jpeg`;
        req.images = [...req.images, imageName];
        let dir = `public/restaurant/${req.restaurant._id}`;
        if (!fs.existsSync(dir)) await mkDir(dir);
        dir = `public/restaurant/${req.restaurant._id}/images`;
        if (!fs.existsSync(dir)) await mkDir(dir);
        await sharp(image.buffer)
          .resize(500, 500)
          .toFormat("jpeg")
          .jpeg({ quality: 90 })
          .toFile(`${dir}/${imageName}`);
      })
    );
    return next();
  }

  next();
});

exports.updateRestaurant = catchAsync(async (req, res) => {
  const { restaurantId } = req.params;
  const restaurant = await Restaurant.findById(restaurantId);
  if (!restaurant)
    return res.status(404).json({
      status: "fail",
      message: "No restaurant found with given id",
    });
  const restaurantToBeUpdated = await Restaurant.findById(restaurantId);

  if (restaurantToBeUpdated.applicationStatus === "processing")
    return checkRestaurantApplicationStatus(res);
  let updatedObject = filterObj(
    req.body,
    "name",
    "contactNo",
    "description",
    "openCloseStatus"
  );
  if (req.images)
    updatedObject = {
      ...updatedObject,
      images: [...restaurant.images, ...req.images],
    };
  const updatedRestaurant = await Restaurant.findByIdAndUpdate(
    restaurantId,
    updatedObject,
    { new: true, runValidators: true }
  );
  res.status(200).json({
    status: "OK",
    message: "restaurant with given id had been updated",
    updatedRestaurant,
  });
});

exports.getFilteredRestaurantAndFoodItem = catchAsync(async (req, res) => {
  res.status(200).json({
    message: "yet to be implemented",
  });
});

exports.getRestaurantToAcceptAndReject = catchAsync(async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(401).json({
      message: "you are not allowed to this tasks",
      status: "fail",
    });

  const restaurants = await Restaurant.find({
    applicationStatus: "processing",
  });
  res.status(200).json({
    message: "here is list",
    status: "OK",
    restaurants,
  });
});
