import { createApi } from "@reduxjs/toolkit/query/react";
import { appBaseQuery } from "../../services/api";

export const businessLineApi = createApi({
  reducerPath: "businessLineApi",
  baseQuery: appBaseQuery(),
  tagTypes: ["BusinessLine"],
  endpoints: (builder) => ({
    getAllBL: builder.query({
      query: () => ({
        url: "/api/bl",
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map((item) => ({ type: "BusinessLine", id: item.id })),
              { type: "BusinessLine", id: "LIST" },
            ]
          : [{ type: "BusinessLine", id: "LIST" }],
    }),
    getAllBLById: builder.query({
      query: (id) => ({
        url: `/api/bl/${id}`,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              { type: "BusinessLine", id: result?.id },
              { type: "BusinessLine", id: "LIST" },
            ]
          : [{ type: "BusinessLine", id: "LIST" }],
    }),
    createBL: builder.mutation({
      query: (body) => ({
        url: "/api/bl",
        method: "POST",
        body,
      }),
      invalidatesTags: ["BusinessLine"],
    }),
    updateBL: builder.mutation({
      query: (body) => ({
        url: "/api/bl",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["BusinessLine"],
    }),
    deleteBL: builder.mutation({
      query: (id) => ({
        url: `/api/bl/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["BusinessLine"],
    }),
  }),
});

export const {
  useGetAllBLQuery,
  useGetAllBLByIdQuery,
  useCreateBLMutation,
  useUpdateBLMutation,
  useDeleteBLMutation,
} = businessLineApi;
