import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import tokenService from "../../services/tokenService";
// import { api } from "../../api/api";

export const reqAuthThunk = createAsyncThunk(
  "auth/reqAuth",
  async ({ username: name, password }) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const authUrl = process.env.REACT_APP_AUTH_URL;

    // console.log(axios.defaults.withCredentials);

    const { data } = await axios.post(`${apiUrl}${authUrl}`, {
      name,
      password,
    });

    tokenService.setUser(data);

    // const { data } = await api.post(`${apiUrl}${authUrl}`, {
    //   name,
    //   password,
    // });

    return {
      ...data,
      username: name,
    };
  }
);
