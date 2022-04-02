const INITIAL_STATE = {
  restaurantWithItems: [],
};

const RestaurantReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_RESTAURANT_WITH_DISHES":
      return {
        ...state,
        restaurantWithItems: action.payload,
      };
    case "ADD_RESTAURANT_REVIEW": {
      return {
        ...state,
        restaurantWithItems: state.restaurantWithItems.map((res) => {
          if (res.id == action.payload.restaurant_id) {
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
          if (res.id === action.payload.id) {
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
          (res) => res.id !== action.payload.id
        ),
      };

    default:
      return { ...state };
  }
};

export default RestaurantReducer;
