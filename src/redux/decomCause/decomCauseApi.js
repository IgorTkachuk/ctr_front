import { createApi } from "@reduxjs/toolkit/query/react";
import { appBaseQuery } from "../../services/api";

export const decomCauseApi = createApi({
  reducerPath: "DecomCauseApi",
  baseQuery: appBaseQuery(),
  tagTypes: ["DecomCause"],
  endpoints: (build) => ({
    getAllDecomCause: build.query({
      query: () => ({
        url: "/api/decomcause",
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map((item) => ({ type: "DecomCause", id: item.id })),
              { type: "DecomCause", id: "LIST" },
            ]
          : [{ type: "DecomCause", id: "LIST" }],
    }),
    getDecomCauseById: build.query({
      query: (id) => ({
        url: `/api/decomcause/${id}`,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              { type: "DecomCause", id: result?.id },
              { type: "DecomCause", id: "LIST" },
            ]
          : [{ type: "DecomCause", id: "LIST" }],
    }),
    createDecomCause: build.mutation({
      query: (body) => ({
        url: "/api/decomcause",
        method: "POST",
        body,
      }),
      invalidatesTags: ["DecomCause"],
    }),
    updateDecomCause: build.mutation({
      query: (body) => ({
        url: "/api/decomcause",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["DecomCause"],
    }),
    deleteDecomCause: build.mutation({
      query: (id) => ({
        url: `/api/decomcause/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["DecomCause"],
    }),
  }),
});

export const {
  useGetAllDecomCauseQuery,
  useGetDecomCauseByIdQuery,
  useCreateDecomCauseMutation,
  useUpdateDecomCauseMutation,
  useDeleteDecomCauseMutation,
} = decomCauseApi;
