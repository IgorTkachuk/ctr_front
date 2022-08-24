import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const actSignup = createAsyncThunk(
  "signup/reqSignup",
  async ({ name, password, repeat_password }) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const authUrl = process.env.REACT_APP_SIGNUP_URL;

    const { data } = await axios.post(`${apiUrl}${authUrl}`, {
      name,
      password,
      repeat_password,
    });

    return data;
  }
);
