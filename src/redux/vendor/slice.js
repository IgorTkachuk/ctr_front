// import { createSlice } from "@reduxjs/toolkit";
// import { actVendor } from "./asyncActions";

// const initialState = {
//   items: [],
//   status: "",
// };

// const vendorSlice = createSlice({
//   name: "vendor",
//   initialState,
//   extraReducers: (builder) => {
//     builder.addCase(actVendor.fulfilled, (state, action) => {
//       state.status = "SUCCESS";
//       state.items = action.payload;
//     });
//   },
// });

// export default vendorSlice.reducer;

import { createApi } from "@reduxjs/toolkit/query/react";
import api from "../../services/api";

const vendorsBaseQuery =
  ({ baseUrl } = { baseUrl: "" }) =>
  async ({ url, method, body: data, params, body }) => {
    try {
      console.log("API body ####:", data);
      const result = await api({ url, method, data, params });
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

// Define a service using a base URL and expected endpoints
export const vendorApi = createApi({
  reducerPath: "vendorApi",
  baseQuery: vendorsBaseQuery(),
  tagTypes: ["Vendor"],
  endpoints: (builder) => ({
    getAllVendors: builder.query({
      query: () => ({ url: "/api/vendors", method: "get" }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Vendor", id })),
              { type: "Vendor", id: "LIST" },
            ]
          : [{ type: "Vendor", id: "LIST" }],
    }),
    createVendor: builder.mutation({
      query: (body) => ({
        url: "/api/vendors",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Vendor", id: "LIST" }],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllVendorsQuery, useCreateVendorMutation } = vendorApi;
