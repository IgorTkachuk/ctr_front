import { createApi } from "@reduxjs/toolkit/query/react";
import { appBaseQuery } from "../../services/api";

const apiUrl = "/api/ctrstatustype";
const apiTagName = "CtrStatusType";

export const ctrStatusTypeApi = createApi({
  reducerPath: "ctrStatusTypeApi",
  baseQuery: appBaseQuery(),
  tagTypes: [apiTagName],
  endpoints: (build) => ({
    getAllCtrStatusType: build.query({
      query: () => ({
        url: apiUrl,
        method: "GET",
      }),
      providesTags: (results) =>
        results
          ? [
              ...results.map((item) => ({ type: apiTagName, id: item.id })),
              { type: apiTagName, id: "LIST" },
            ]
          : [{ type: apiTagName, id: "LIST" }],
    }),
    getCtrStatusTypeByID: build.query({
      query: (id) => ({
        url: `${apiUrl}/${id}`,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              { type: apiTagName, id: result?.id },
              { type: apiTagName, id: "LIST" },
            ]
          : [{ type: apiTagName, id: "LIST" }],
    }),
    createCtrStatusType: build.mutation({
      query: (body) => ({
        url: apiUrl,
        method: "POST",
        body,
      }),
      invalidatesTags: [apiTagName],
    }),
    updateCtrStatusType: build.mutation({
      query: (body) => ({
        url: apiUrl,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [apiTagName],
    }),
    deleteCtrStatusType: build.mutation({
      query: (id) => ({
        url: `${apiUrl}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [apiTagName],
    }),
  }),
});

export const {
  useGetAllCtrStatusTypeQuery,
  useGetCtrStatusTypeByIDQuery,
  useCreateCtrStatusTypeMutation,
  useUpdateCtrStatusTypeMutation,
  useDeleteCtrStatusTypeMutation,
} = ctrStatusTypeApi;
