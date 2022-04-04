const INITIAL_STATE = {
  restaurantWithItems: [],
  currentRestaurant: "",
};

const RestaurantReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_CURRENT_RESTAURANT":
      return {
        ...state,
        currentRestaurant: action.payload,
      };
    case "SET_RESTAURANT_WITH_DISHES":
      return {
        ...state,
        restaurantWithItems: action.payload,
      };
    case "ADD_RESTAURANT_REVIEW": {
      return {
        ...state,
        restaurantWithItems: state.restaurantWithItems.map((res) => {
          if (res._id === action.payload.restaurant_id) {
            return {
              ...res,
              review: [...res.review, action.payload],
            };
          } else return res;
        }),
      };
    }
    case "TOOGLE_ACCOUNT_ACTIVITY":
      return {
        ...state,
        restaurantWithItems: state.restaurantWithItems.map((res) => {
          if (res._id === action.payload.id) {
            return {
              ...res,
              isActive: action.payload.isActive,
            };
          } else return { ...res };
        }),
      };

    case "BAN_RESTAURANT":
      return {
        ...state,
        restaurantWithItems: state.restaurantWithItems.filter(
          (res) => res._id !== action.payload._id
        ),
      };

    default:
      return state;
  }
};

export default RestaurantReducer;
