const Cart = require("./../models/cartModel");
const FoodItem = require("./../models/foodItemsModel");
const catchAsync = require("./../utils/catchAsync");
// const { redisClient } = require('./../utils/redis');

exports.createCartIfNotExist = catchAsync(async (req, res, next) => {
  let userCart = req.user.cart;
  if (!userCart) {
    userCart = await Cart.create({ user: req.user.id });
    req.user.cart = userCart._id;
    req.user.save({ validateBeforeSave: false });
  } else userCart = await Cart.findById(userCart);
  req.userCart = userCart;
  next();
});
exports.addOrRemoveItemFromCart = catchAsync(async (req, res, next) => {
  const userCart = req.userCart;
  const { foodItemId, quantity } = req.body;
  const searchedFoodItem = await FoodItem.findById(foodItemId);
  if (!searchedFoodItem)
    return res.status(404).json({
      message: "No food item found by given Id",
      status: "fail",
    });

  const toBeAddedInRestaurant = searchedFoodItem.restaurant;
  let restaurantAlreadyExist = undefined;
  userCart.cartItems.map((resObj) => {
    if (resObj.restaurant.toString() === toBeAddedInRestaurant.toString())
      restaurantAlreadyExist = resObj;
  });
  const newFoodItemlist = userCart.cartItems.filter((resObj) => {
    resObj.restaurant.toString() !== toBeAddedInRestaurant.toString();
  });

  // restaurant does not exist
  if (!restaurantAlreadyExist) {
    if (quantity <= 0)
      return res.status(401).json({
        status: "fail",
        message: "quantity can not be less than 0",
      });
    const newObject = {
      restaurant: toBeAddedInRestaurant,
      item: [
        {
          foodItem: foodItemId,
          quantity,
        },
      ],
    };
    userCart.cartItems.push(newObject);
    userCart.save();
    return res.status(200).json({
      status: "OK",
      message: "cart have been updated by quantity",
      updatedCart: userCart,
    });
  }

  let isFoodItemAlreadyExist = undefined;
  restaurantAlreadyExist.item.map((fI) => {
    if (fI.foodItem.toString() === foodItemId.toString())
      isFoodItemAlreadyExist = fI;
  });
  const newRestaurantFoodItemList = restaurantAlreadyExist.item.filter(
    (fI) => fI.foodItem.toString() !== foodItemId.toString()
  );
  // restaurantAlreadyExist but food item doesn't exist
  if (!isFoodItemAlreadyExist) {
    if (quantity <= 0)
      return res.status(401).json({
        status: "fail",
        message: "quantity can not be less than 0",
      });
    userCart.cartItems = [
      ...newFoodItemlist,
      {
        restaurant: toBeAddedInRestaurant,
        item: [
          ...newRestaurantFoodItemList,
          {
            foodItem: foodItemId,
            quantity,
          },
        ],
      },
    ];
    userCart.save();
    res.status(200).json({
      status: "OK",
      message: "cart havess been updated by quantity",
      updatedCart: userCart,
    });
  }

  // restaurantAlreadyExist and food also exist
  const newQuantity =
    parseInt(isFoodItemAlreadyExist.quantity) + parseInt(quantity);
  if (newQuantity <= 0) {
    if (newRestaurantFoodItemList.length == 0) {
      userCart.cartItems = [...newFoodItemlist];
    } else {
      userCart.cartItems = [
        ...newFoodItemlist,
        {
          restaurant: toBeAddedInRestaurant,
          item: [...newRestaurantFoodItemList],
        },
      ];
    }
  } else {
    userCart.cartItems = [
      ...newFoodItemlist,
      {
        restaurant: toBeAddedInRestaurant,
        item: [
          ...newRestaurantFoodItemList,
          {
            foodItem: foodItemId,
            quantity: newQuantity,
          },
        ],
      },
    ];
  }
  userCart.save();

  res.status(200).json({
    status: "OK",
    message: "cart havess been updated by quantity",
    updatedCart: userCart,
  });
});

exports.clearCart = catchAsync(async (req, res, next) => {
  req.userCart.cartItems = [];
  req.userCart.save();
  res.status(200).json({
    status: "OK",
    message: "cart successfully cleared",
  });
});

exports.getCartItems = catchAsync(async (req, res, next) => {

  // const data = await redisClient.get("userCart");
  // if(data != null){
  //   return res.status(200).json({
  //     status:"OK",
  //     message:"user cart is as follows",
  //     userCart:data,
  //   });
  // } else{
  //   try{
      // await redisClient.set("userCart",JSON.stringify(req.userCart));
      res.status(200).json({
        status: "OK",
        message: "user cart is as follows",
        userCart: req.userCart,
      });
    // }
  //   catch(error){
  //     console.log(error);
  //     return error;
  //   }
  // }  
});
