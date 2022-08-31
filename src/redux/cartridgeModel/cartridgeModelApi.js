import { createApi } from "@reduxjs/toolkit/query/react";
import { appBaseQuery } from "../../services/api";

export const cartridgeModelApi = createApi({
  reducerPath: "cartridgeModelApi",
  baseQuery: appBaseQuery(),
  tagTypes: ["CartridgeModel"],
  endpoints: (builder) => ({
    getAllCartridgeModels: builder.query({
      query: () => ({
        url: "/api/ctrmodel",
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map((item) => ({
                type: "CartridgeModel",
                id: item.id,
              })),
              { type: "CartridgeModel", id: "LIST" },
            ]
          : [{ type: "CartridgeModel", id: "LIST" }],
    }),
    getCartridgeModelByID: builder.query({
      query: (id) => ({
        url: `/api/ctrmodel/${id}`,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              { type: "CartridgeModel", id: result?.id },
              { type: "CartridgeModel", id: "LIST" },
            ]
          : [{ type: "CartridgeModel", id: "LIST" }],
    }),
    createCartridgeModel: builder.mutation({
      query: (body) => ({
        url: "/api/ctrmodel",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "CartridgeModel", id: "LIST" }],
    }),
    updateCartridgeModel: builder.mutation({
      query: (body) => ({
        url: "/api/ctrmodel",
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "CartridgeModel", id: "LIST" }],
    }),
    deleteCartridgeModel: builder.mutation({
      query: (id) => ({
        url: `/api/ctrmodel/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "CartridgeModel", id: "LIST" }],
    }),
  }),
});

export const {
  useGetAllCartridgeModelsQuery,
  useGetCartridgeModelByIDQuery,
  useCreateCartridgeModelMutation,
  useUpdateCartridgeModelMutation,
  useDeleteCartridgeModelMutation,
} = cartridgeModelApi;
