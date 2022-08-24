import axios from "axios";
import { apiConfig } from "../config";

const instance = axios.create({
  withCredentials: true,
  baseURL: apiConfig.serverURI,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
