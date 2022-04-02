import rootReducer from "./root-reducer";
import { persistStore } from "redux-persist";
import logger from "redux-logger";
import { applyMiddleware, createStore } from "redux";

const middlewares = [logger];

export const store = createStore(rootReducer, applyMiddleware(...middlewares));
export const persistor = persistStore(store);

export default { store, persistor };
