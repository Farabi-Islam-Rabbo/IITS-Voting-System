import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import logger from "redux-logger";

import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import mainReducers from "../Main/index";

const middleware = [thunk];

const rootReducer = combineReducers({
  mainReducers,
});

// if (process.env.NODE_ENV !== "production") {
//   if (typeof logger === "function") {
//     middleware.push(logger);
//   }
// }

const persistConfig = {
  key: "root",
  storage,
  stateReconciler: autoMergeLevel2, // see "Merge Process" section for details.
  blacklist: ["navigation"],
  timeout: 0, // The code base checks for falsy, so 0 disables
};

const pReducer = persistReducer(persistConfig, rootReducer);

function configureStore() {
  const enhancer = compose(applyMiddleware(...middleware));
  return createStore(pReducer, {}, enhancer);
}

export const store = configureStore();
export const persistor = persistStore(store);

/* Uncomment to purge store */
// persistor.purge()
