import { configureStore, combineReducers } from "@reduxjs/toolkit";
import auth from "./auth/slice";
import signup from "./signup/slice";
import { vendorApi } from "./vendor/vendorApi";
import { prnApi } from "./printerModel/printerModelApi";

import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  auth,
  signup,
  [vendorApi.reducerPath]: vendorApi.reducer,
  [prnApi.reducerPath]: prnApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (defaultMiddlewre) =>
    defaultMiddlewre({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(vendorApi.middleware)
      .concat(prnApi.middleware),
});

export const persistor = persistStore(store);

export default store;
