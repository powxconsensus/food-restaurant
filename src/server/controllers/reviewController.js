const catchAsync = require("../utils/catchAsync");
const Review = require("./../models/reviewModel");
const Restaurant = require("./../models/restaurantModel");
const FoodItem = require("../models/foodItemsModel");

exports.addReview = catchAsync(async (req, res, next) => {
  const { review, rating, reviewOn, restaurant, foodItem } = req.body;
  let searchedRestaurant, searchedFoodItem;
  if (reviewOn === "restaurant") {
    searchedRestaurant = await Restaurant.findById(restaurant);
    if (!searchedRestaurant)
      return res.status(200).json({
        message: "no restaurant found by given Id",
      });
  } else {
    searchedFoodItem = await FoodItem.findById(foodItem);
    if (!searchedFoodItem)
      return res.status(200).json({
        message: "no foodItem found by given Id",
      });
  }
  const addedReview = await Review.create({
    review,
    rating,
    reviewOn,
    restaurant,
    foodItem,
    reviewer: req.user.id,
  });
  if (reviewOn === "restaurant") {
    searchedRestaurant.rating =
      (searchedRestaurant.rating * searchedRestaurant.review.length +
        parseInt(rating)) /
      (searchedRestaurant.review.length + 1);
    searchedRestaurant.review.push(addedReview._id);
    searchedRestaurant.save();
  } else {
    searchedFoodItem.rating =
      (searchedFoodItem.rating * searchedFoodItem.review.length +
        parseInt(rating)) /
      (searchedFoodItem.review.length + 1);

    searchedFoodItem.review.push(addedReview._id);
    searchedFoodItem.save();
  }
  res.status(200).json({
    status: "OK",
    message: "review has been added successfully",
    review: addedReview,
  });
});

exports.deleteReview = catchAsync(async (req, res, next) => {
  const { reviewId } = req.params;
  const review = await Review.findById(reviewId);
  if (!review)
    return res.status(404).json({
      status: "fail",
      message: "No review found with given Id",
    });
  if (
    review.reviewer !== req.user.id &&
    req.user.role !== "admin" &&
    req.user.role !== "moderator"
  )
    return res.status(200).json({
      status: "fail",
      message: "this action is not allowed for you",
    });

  await Review.findByIdAndDelete(reviewId);
  if (review.reviewOn === "restaurant") {
    const searchedRestaurant = await Restaurant.findById(review.restaurant);
    searchedRestaurant.rating =
      (searchedRestaurant.rating * searchedRestaurant.review.length -
        parseInt(review.rating)) /
      (searchedRestaurant.review.length - 1);
    searchedRestaurant.review = searchedRestaurant.review.filter(
      (item) => item.toString() != review._id.toString()
    );
    searchedRestaurant.save();
  } else {
    const foodItem = await FoodItem.findById(review.foodItem);
    foodItem.rating =
      (foodItem.rating * foodItem.review.length - parseInt(review.rating)) /
      (foodItem.review.length - 1);
    foodItem.review = foodItem.review.filter(
      (item) => item.toString() != review._id.toString()
    );
    foodItem.save();
  }
  res.status(200).json({
    status: "OK",
    message: "review had been delete successfully",
  });
});

exports.getReviewWithRestaurantID = catchAsync(async (req, res, next) => {
  const reviewsOnRestaurant = await Review.find({
    reviewOn: "restaurant",
    restaurant: req.params.restaurantId,
  });
  res.status(200).json({
    status: "OK",
    message: "reviews on restaurant with given restaurantId are",
    length: reviewsOnRestaurant.length,
    reviewsOnRestaurant,
  });
});

exports.getReviewByFoodItemId = catchAsync(async (req, res, next) => {
  const reviewsOnFoodItem = await Review.find({
    reviewOn: "foodItem",
    foodItem: req.params.foodItemId,
  });
  res.status(200).json({
    status: "OK",
    message: "reviews on foodItem with given Id are",
    length: reviewsOnFoodItem.length,
    reviewsOnFoodItem,
  });
});
