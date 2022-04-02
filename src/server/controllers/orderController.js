const Cart = require("../models/cartModel");
const Order = require("./../models/orderModel");
const catchAsync = require("./../utils/catchAsync");
const FoodItem = require("./../models/foodItemsModel");

exports.createOrder = catchAsync(async (req, res) => {
  // direct order from page;-> will be implementated later

  const userCart = await Cart.findById(req.params.orderId);
  if (userCart.length <= 0)
    return res.status(200).json({
      status: "fail",
      message: "your cart is empty therefore order cann't be completed",
    });
  let allOrder = [];
  await Promise.all(
    userCart.cartItems.map(async (resObj) => {
      // should transfer money to restaurant back account -> not needed for us
      let totalAmountRecieved = 0;
      let newFoodItemList = [];
      await Promise.all(
        resObj.item.map(async (item) => {
          const foodItem = await FoodItem.findById(item.foodItem);

          const totalAmount = foodItem.pricePerQuantity * item.quantity;
          newFoodItemList = [
            ...newFoodItemList,
            {
              pricePerQuantity: foodItem.pricePerQuantity,
              totalAmount,
              quantity: item.quantity,
              foodItemId: item.foodItem,
            },
          ];
          totalAmountRecieved += totalAmount;
        })
      );
      const newOrder = await Order.create({
        user: userCart.user,
        restaurant: resObj.restaurant,
        foodItem: newFoodItemList,
        amountRecieved: totalAmountRecieved,
      });
      allOrder = [...allOrder, newOrder];
    })
  );
  // order created, pay now
  res.status(200).json({
    status: "OK",
    message: "order have successfully created, keep checking status",
    allOrder,
  });
});
exports.rejectOrAcceptOrder = catchAsync(async (req, res, next) => {
  const { orderId, isAccepted } = req.params;
  const order = await Order.findById(orderId);
  if (!order)
    return res.status(404).json({
      status: "fail",
      message: "no order found with given Id",
    });
  if (order.status !== "pending")
    return res.status(401).json({
      status: "fail",
      message: "already status have been set",
    });
  if (isAccepted !== "accepted" && isAccepted !== "rejected")
    return res.status(401).json({
      status: "fail",
      message: "can only be accepted or rejected",
    });
  if (isAccepted === "rejected")
    order.rejectReason = req.body.rejectReason
      ? req.body.rejectReason
      : "restaurant not accepting this order, sorry for inconvenience caused";
  order.status = isAccepted;
  order.save();
  res.status(200).json({
    status: "OK",
    message: "successfully updated the status of order",
    updatedOrder: order,
  });
});

exports.getOrderByRestaurantId = catchAsync(async (req, res, next) => {
  const ordersInRestaurant = await Order.find({
    restaurant: req.params.restaurantId,
  });
  res.status(200).json({
    status: "OK",
    message: "list of order in given restaurant are as follows",
    ordersInRestaurant,
  });
});

exports.getOrderByUserId = catchAsync(async (req, res, next) => {
  const ordersByYou = await Order.find({
    user: req.user.id,
  });
  res.status(200).json({
    status: "OK",
    message: "order created by you are as follows",
    ordersByYou,
  });
});

exports.cancelOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.orderId);
  if (!order)
    return res.status(404).json({
      status: "fail",
      message: "no order found with given order Id",
    });
  if (order.status !== "pending")
    return res.status(401).json({
      status: "fail",
      message: "order cannot be cancel once accepted or rejected by restaurant",
    });
  // other way around, can be cancelled without deleting, therefore user can track cancelled order from thier side
  await Order.findByIdAndDelete(req.params.orderId);
  res.status(200).json({
    status: "OK",
    message: "order successfully cancelled",
  });
});

exports.getOrderById = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.orderId);
  if (!order)
    return res.status(404).json({
      status: "fail",
      message: "no order found with given order Id",
    });
  res.status(200).json({
    status: "OK",
    message: "order with given order ID is",
    order,
  });
});
