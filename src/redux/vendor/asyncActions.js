import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const actVendor = createAsyncThunk("vendor/getvendors", async () => {
  const { data } = await api.get("/api/vendors");
  console.log(data);

  return data;
});
