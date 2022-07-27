import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const reqAuthThunk = createAsyncThunk(
  "auth/reqAuth",
  async ({ username: name, password }) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const authUrl = process.env.REACT_APP_AUTH_URL;

    console.log(axios.defaults.withCredentials);

    const { data } = await axios.post(`${apiUrl}${authUrl}`, {
      name,
      password,
    });

    return data;
  }
);
