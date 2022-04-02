import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; //local storage
import toggleReducer from "./toggle/toggle.reducer";
import userReducer from "./userReducer/user.reducer";
import RestaurantReducer from "./restaurant/restaurant.reducer";
import CartReducer from "./cart/cart.reducer";

const persistConfig = {
  key: "root",
  storage,
  timeout: null,
};
const appReducer = combineReducers({
  toggle: toggleReducer,
  user: userReducer,
  restaurant: RestaurantReducer,
  cart: CartReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "USER_LOGGED_OUT") {
    storage.removeItem("persist:root");
    // storage.removeItem('persist:otherKey')
    state = undefined;
  }
  return appReducer(state, action);
};

export default persistReducer(persistConfig, rootReducer);
