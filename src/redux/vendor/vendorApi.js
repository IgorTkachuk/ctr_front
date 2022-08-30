import { createApi } from "@reduxjs/toolkit/query/react";
import { appBaseQuery } from "../../services/api";

export const vendorApi = createApi({
  reducerPath: "vendorApi",
  baseQuery: appBaseQuery(),
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
    getVendorByID: builder.query({
      query: (id) => ({
        url: `/api/vendors/${id}`,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              { type: "Vendor", id: result?.id },
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
    deleteVendor: builder.mutation({
      query: (vendorId) => ({
        url: `/api/vendors/${vendorId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Vendor", id: "LIST" }],
    }),
    updateVendor: builder.mutation({
      query: (body) => ({
        url: "/api/vendors",
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "Vendor", id: "LIST" }],
    }),
  }),
});

export const {
  useGetAllVendorsQuery,
  useCreateVendorMutation,
  useDeleteVendorMutation,
  useUpdateVendorMutation,
  useGetVendorByIDQuery,
} = vendorApi;
