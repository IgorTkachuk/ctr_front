import { createApi } from "@reduxjs/toolkit/query/react";
import { appBaseQuery } from "../../services/api";

export const ouApi = createApi({
  reducerPath: "ouApi",
  baseQuery: appBaseQuery(),
  tagTypes: ["Ou"],
  endpoints: (build) => ({
    getAllOu: build.query({
      query: () => ({
        url: "/api/ous",
        method: "GET",
      }),
      providesTags: (results) =>
        results
          ? [
              ...results.map((ou) => ({ type: "Ou", id: ou.id })),
              { type: "Ou", id: "LIST" },
            ]
          : [{ type: "Ou", id: "LIST" }],
    }),
    getById: build.query({
      query: (id) => ({
        url: `/api/ous/${id}`,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              { type: "Ou", id: result?.id },
              { type: "Ou", id: "LIST" },
            ]
          : [{ type: "Ou", id: "LIST" }],
    }),
    createOu: build.mutation({
      query: (body) => ({
        url: "/api/ous",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Ou"],
    }),
    updateOu: build.mutation({
      query: (body) => ({
        url: "/api/ous",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Ou"],
    }),
    deleteOu: build.mutation({
      query: (id) => ({
        url: `/api/ous/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Ou"],
    }),
  }),
});

export const {
  useGetAllOuQuery,
  useGetByIdQuery,
  useCreateOuMutation,
  useUpdateOuMutation,
  useDeleteOuMutation,
} = ouApi;
