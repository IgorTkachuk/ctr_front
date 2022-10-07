import { createApi } from "@reduxjs/toolkit/query/react";
import { appBaseQuery } from "../../services/api";

const docUrl = "/api/doc";

export const docApi = createApi({
  reducerPath: "docApi",
  baseQuery: appBaseQuery(),
  tagTypes: ["Doc", "CtrShowcase"],
  endpoints: (build) => ({
    getCtrShowcase: build.query({
      query: () => ({
        url: "/api/ctrshowcase",
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map((item) => ({ type: "CtrShowcase", id: item.id })),
              { type: "CtrShowcase", id: "LIST" },
            ]
          : [{ type: "CtrShowcase", id: "LIST" }],
    }),
    getAllDoc: build.query({
      query: () => ({
        url: docUrl,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map((item) => ({ type: "Doc", id: item.id })),
              { type: "Doc", id: "LIST" },
            ]
          : [{ type: "Doc", id: "LIST" }],
    }),
    getDocById: build.query({
      query: (id) => ({
        url: `${docUrl}/${id}`,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              { type: "Doc", id: result?.id },
              { type: "Doc", id: "LIST" },
            ]
          : [{ type: "Doc", id: "LIST" }],
    }),
    createDoc: build.mutation({
      query: (body) => ({
        url: docUrl,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Doc", "CtrShowcase"],
    }),
    updateDoc: build.mutation({
      query: (body) => ({
        url: docUrl,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Doc", "CtrShowcase"],
    }),
    deleteDoc: build.mutation({
      query: (id) => ({
        url: `${docUrl}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Doc", "CtrShowcase"],
    }),
  }),
});

export const {
  useGetAllDocQuery,
  useGetDocByIdQuery,
  useCreateDocMutation,
  useUpdateDocMutation,
  useDeleteDocMutation,
  useGetCtrShowcaseQuery,
} = docApi;
