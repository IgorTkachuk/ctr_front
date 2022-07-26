import { configureStore, combineReducers } from "@reduxjs/toolkit";
import auth from "./auth/slice";
import signup from "./signup/slice";
import { vendorApi } from "./vendor/vendorApi";
import { prnApi } from "./printerModel/printerModelApi";
import { cartridgeModelApi } from "./cartridgeModel/cartridgeModelApi";
import { ouApi } from "./ou/ouApi";
import { businessLineApi } from "./businessLine/businessLineApi";
import { employeeApi } from "./employee/employeeApi";
import { docTypeApi } from "./docType/docTypeApi";
import { decomCauseApi } from "./decomCause/decomCauseApi";
import { ctrStatusTypeApi } from "./ctrStatusType/ctrStatusTypeApi";
import { docApi } from "./doc/docApi";
import { usrApi } from "./usr/usrApi";

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
  [cartridgeModelApi.reducerPath]: cartridgeModelApi.reducer,
  [ouApi.reducerPath]: ouApi.reducer,
  [businessLineApi.reducerPath]: businessLineApi.reducer,
  [employeeApi.reducerPath]: employeeApi.reducer,
  [docTypeApi.reducerPath]: docTypeApi.reducer,
  [decomCauseApi.reducerPath]: decomCauseApi.reducer,
  [ctrStatusTypeApi.reducerPath]: ctrStatusTypeApi.reducer,
  [docApi.reducerPath]: docApi.reducer,
  [usrApi.reducerPath]: usrApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (defaultMiddlewre) =>
    defaultMiddlewre({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      vendorApi.middleware,
      prnApi.middleware,
      cartridgeModelApi.middleware,
      ouApi.middleware,
      businessLineApi.middleware,
      employeeApi.middleware,
      docTypeApi.middleware,
      decomCauseApi.middleware,
      ctrStatusTypeApi.middleware,
      docApi.middleware,
      usrApi.middleware
    ),
});

export const persistor = persistStore(store);

export default store;
