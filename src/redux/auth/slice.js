import { createSlice } from "@reduxjs/toolkit";
import { reqAuthThunk } from "./asyncActions";

const initialState = {
  token: "",
  refreshToken: "",
  status: "", // LOADING, SUCCESS, ERROR
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(reqAuthThunk.pending, (state, action) => {
      state.status = "LOADING";
      state.token = "";
      state.refreshToken = "";
    });

    builder.addCase(reqAuthThunk.fulfilled, (state, action) => {
      state.status = "SUCCESS";
      state.token = action.payload.token;
      state.refreshToken = action.payload.refresh_token;
    });

    builder.addCase(reqAuthThunk.rejected, (state, action) => {
      state.status = "ERROR";
      state.token = "";
      state.refreshToken = "";
    });
  },
});

export default authSlice.reducer;
