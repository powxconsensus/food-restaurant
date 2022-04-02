const catchAsync = require("../utils/catchAsync");
const FoodItem = require("./../models/foodItemsModel");
const Restaurant = require("./../models/restaurantModel");
const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");
const { mkDir, filterObj } = require("./../utils/util");

exports.addFoodItemInRestaurant = catchAsync(async (req, res, next) => {
  const { name, description, pricePerQuantity, restaurantId, quantity } =
    req.body;
  const foodItem = await FoodItem.create({
    name,
    description,
    pricePerQuantity,
    restaurant: restaurantId,
    quantity,
  });
  req.restaurant.restaurantFoodItems.push(foodItem._id);
  req.restaurant.save();
  res.status(200).json({
    status: "OK",
    message: "food item have been added successfully",
    foodItem,
  });
});

exports.deleteFoodItem = catchAsync(async (req, res, next) => {
  const { foodItemId } = req.params;
  const foodItem = await FoodItem.findById(foodItemId).populate({
    path: "restaurant",
  });
  if (!foodItem)
    return res.status(404).json({
      status: "fail",
      message: "no foodItem found with givenId",
    });
  if (foodItem.restaurant.owner.toString() !== req.user.id)
    return res.status(200).json({
      status: "fail",
      message: "this action can only be done by owner of restaurant",
    });
  await FoodItem.findByIdAndDelete(foodItemId);
  const restaurant = await Restaurant.findById(foodItem.restaurant._id);
  restaurant.restaurantFoodItems = restaurant.restaurantFoodItems.filter(
    (item) => item.toString() != foodItem._id
  );
  restaurant.save();
  res.status(200).json({
    status: "OK",
    message: "food Item successfully delete",
  });
});

exports.getFoodItemByRestaurantId = catchAsync(async (req, res, next) => {
  const { restaurantId } = req.params;
  const restaurant = await Restaurant.findById(restaurantId);
  if (!restaurant)
    return res.status(404).json({
      message: "no restaurant found with givenId",
      status: "fail",
    });
  const foodItems = await FoodItem.find({ restaurant: restaurant._id });
  res.status(200).json({
    status: "OK",
    message: "food Items in given restaurant are as follows",
    foodItems,
  });
});

exports.getFoodItemById = catchAsync(async (req, res, next) => {
  const foodItem = await FoodItem.findById(req.params.foodItemId);
  if (!foodItem)
    return res.status(404).json({
      status: "fail",
      message: "No food item found with given Id",
    });
  res.status(200).json({
    status: "OK",
    message: "food item with given id is",
    foodItem,
  });
});

//update foodItem
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

exports.uploadFoodItemImage = upload.fields([{ name: "images", maxCount: 5 }]);

exports.resizeFoodItemImage = catchAsync(async (req, res, next) => {
  if (!req.files || !req.files.images) return next();
  if (req.files.images.length > 0) {
    req.images = [];
    await Promise.all(
      req.files.images.map(async (image) => {
        const imageName = `foodItem-${req.restaurant._id}-${Date.now()}.jpeg`;
        req.images = [...req.images, imageName];
        let dir = `public/restaurant/${req.restaurant._id}`;
        if (!fs.existsSync(dir)) await mkDir(dir);

        await sharp(image.buffer)
          .resize(500, 500)
          .toFormat("jpeg")
          .jpeg({ quality: 90 })
          .toFile(`${dir}/foodItems/${imageName}`);
      })
    );
    return next();
  }

  next();
});

exports.updateFoodItem = catchAsync(async (req, res, next) => {
  const foodItem = await FoodItem.findOne({
    _id: req.params.foodItemId,
    restaurant: req.restaurant._id,
  });
  if (!foodItem)
    return res.status(404).json({
      status: "fail",
      message: "no food item found by given foodItemId",
    });
  // if (foodItem.restaurant.toString() !== req.restaurant._id.toString())
  //   return res.status(404).json({
  //     status: "fail",
  //     message: "this food item is not belongs to your restaurant",
  //   });
  let updatedObject = filterObj(
    req.body,
    "name",
    "quantity",
    "description",
    "pricePerQuantity"
  );
  if (req.images)
    updatedObject = {
      ...updatedObject,
      images: [...foodItem.images, ...req.images],
    };
  const updatedFoodItem = await FoodItem.findByIdAndUpdate(
    foodItem._id,
    updatedObject,
    { runValidators: true, new: true }
  );
  res.status(200).json({
    status: "OK",
    message: "food Item have been successfully updated",
    updatedFoodItem,
  });
});
