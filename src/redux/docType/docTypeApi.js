import { createApi } from "@reduxjs/toolkit/query/react";
import { appBaseQuery } from "../../services/api";

export const docTypeApi = createApi({
  reducerPath: "docTypeApi",
  baseQuery: appBaseQuery(),
  tagTypes: ["DocType"],
  endpoints: (build) => ({
    getAllDocTypes: build.query({
      query: () => ({
        url: "/api/doctype",
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map((item) => ({ type: "DocType", id: item.id })),
              { type: "DocType", id: "LIST" },
            ]
          : [{ type: "DocType", id: "LIST" }],
    }),
    getDocTypesById: build.query({
      query: (id) => ({
        url: `/api/doctype/${id}`,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              { type: "DocType", id: result?.id },
              { type: "DocType", id: "LIST" },
            ]
          : [{ type: "DocType", id: "LIST" }],
    }),
    createDocType: build.mutation({
      query: (body) => ({
        url: "/api/doctype",
        method: "POST",
        body,
      }),
      invalidatesTags: ["DocType"],
    }),
    updateDocType: build.mutation({
      query: (body) => ({
        url: "/api/doctype",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["DocType"],
    }),
    deleteDocTypes: build.mutation({
      query: (id) => ({
        url: `/api/doctype/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["DocType"],
    }),
  }),
});

export const {
  useGetAllDocTypesQuery,
  useGetDocTypesByIdQuery,
  useCreateDocTypeMutation,
  useUpdateDocTypeMutation,
  useDeleteDocTypesMutation,
} = docTypeApi;
