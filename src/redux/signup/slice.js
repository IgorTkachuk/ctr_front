import { createSlice } from "@reduxjs/toolkit";
import { actSignup } from "./asyncActions";

const initialState = {
  status: null, //ERROR, SUCCESS
};

const signupSlice = createSlice({
  name: "signup",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(actSignup.pending, (state, action) => {
      state.status = "LOADING";
    });

    builder.addCase(actSignup.fulfilled, (state, action) => {
      state.status = "SUCCESS";
    });

    builder.addCase(actSignup.rejected, (state, action) => {
      state.status = "ERROR";
    });
  },
});

export default signupSlice.reducer;
