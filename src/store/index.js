import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { createFilter } from "redux-persist-transform-filter";
import app from "./app";
import auth from "./auth";
import user from "./user";
import general from "./general";

const appReducerFilter = createFilter("app", ["language"]);
const authReducerFilter = createFilter("auth", ["access_token"]);
const userReducerFilter = createFilter("user", ["cart"]);

const persistConfig = {
  key: "sadeed_web_app",
  whitelist: ["app", "auth", "user"],
  storage,
  transforms: [appReducerFilter, authReducerFilter, userReducerFilter],
  stateReconciler: autoMergeLevel2,
};

const rootReducer = combineReducers({
  app,
  auth,
  user,
  general,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
