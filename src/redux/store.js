import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth/slice";
import signup from "./signup/slice";
import { vendorApi } from "./vendor/slice";

export const store = configureStore({
  reducer: {
    auth,
    signup,
    [vendorApi.reducerPath]: vendorApi.reducer,
  },
  middleware: (defaultMiddlewre) =>
    defaultMiddlewre().concat(vendorApi.middleware),
});
