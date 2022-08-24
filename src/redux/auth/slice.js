import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";
import { reqAuthThunk } from "./asyncActions";

const initialState = {
  username: "",
  token: "",
  refreshToken: "",
  status: "", // LOADING, SUCCESS, ERROR
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    refreshAuthSuccess: (state, action) => {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refresh_token;
      state.status = "SUCCESS";
    },
    refreshAuthFail: (state) => {
      state.token = "";
      state.refreshToken = "";
      state.status = "ERROR";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(reqAuthThunk.pending, (state, action) => {
      state.status = "LOADING";
      state.token = "";
      state.refreshToken = "";
    });

    builder.addCase(reqAuthThunk.fulfilled, (state, action) => {
      state.status = "SUCCESS";
      state.username = action.payload.username;
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

export const { refreshAuthSuccess, refreshAuthFail } = authSlice.actions;
export default authSlice.reducer;
