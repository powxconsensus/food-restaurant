export const setRestaurantWithItem = (payload) => {
  return {
    type: "SET_RESTAURANT_WITH_DISHES",
    payload,
  };
};

export const addRestaurantReview = (payload) => {
  return {
    type: "ADD_RESTAURANT_REVIEW",
    payload,
  };
};

export const toggleAccountActivity = (payload) => {
  return {
    type: "TOOGLE_ACCOUNT_ACTIVITY",
    payload,
  };
};

export const banRestaurant = (payload) => {
  return {
    type: "BAN_RESTAURANT",
    payload,
  };
};

export const setCurrentRestaurant = (payload) => {
  return {
    type: "SET_CURRENT_RESTAURANT",
    payload,
  };
};
