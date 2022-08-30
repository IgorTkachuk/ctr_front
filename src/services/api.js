import axios from "axios";
import { apiConfig } from "../config";

const instance = axios.create({
  withCredentials: true,
  baseURL: apiConfig.serverURI,
  headers: {
    "Content-Type": "application/json",
  },
});

export const appBaseQuery =
  ({ baseUrl } = { baseUrl: "" }) =>
  async ({ url, method, body: data, params, body }) => {
    try {
      const result = await instance({ url, method, data, params });
      return { data: result.data };
    } catch (apiError) {
      let err = apiError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export default instance;
