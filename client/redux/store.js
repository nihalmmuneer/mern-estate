import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice.js";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";

const rootReducer = combineReducers({
  user: userReducer,
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  //   reducer: {
  //     user: userReducer,
  //   },
  reducer: persistedReducer,
  middleware: (getMiddleware) =>
    getMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
