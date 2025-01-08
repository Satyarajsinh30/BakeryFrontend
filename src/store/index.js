import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import storage from "redux-persist/lib/storage"
import {persistReducer,persistStore } from "redux-persist";

const rootReducer = combineReducers({
    auth: authReducer, // Combine the auth slice
  });

const persistConfig = {
    key: "root",
    storage,
    whitelist: ['auth'],
}

const persistedReducer = persistReducer(persistConfig,rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        },
      }),
  });

export const persistor = persistStore(store);