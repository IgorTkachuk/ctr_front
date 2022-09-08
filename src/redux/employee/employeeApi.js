import { createApi } from "@reduxjs/toolkit/query/react";
import { appBaseQuery } from "../../services/api";

export const employeeApi = createApi({
  reducerPath: "employeeApi",
  baseQuery: appBaseQuery(),
  tagTypes: ["Employee"],
  endpoints: (build) => ({
    getAllEmployee: build.query({
      query: () => ({
        url: "/api/employee",
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map((item) => ({ type: "Employee", id: item.id })),
              { type: "Employee", id: "LIST" },
            ]
          : [{ type: "Employee", id: "LIST" }],
    }),
    getEmloyeeById: build.query({
      query: (id) => ({
        url: `/api/employee/${id}`,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              { type: "Employee", id: result?.id },
              { type: "Employee", id: "LIST" },
            ]
          : [{ type: "Employee", id: "LIST" }],
    }),
    createEmployee: build.mutation({
      query: (body) => ({
        url: "/api/employee",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Employee"],
    }),
    updateEmployee: build.mutation({
      query: (body) => ({
        url: "/api/employee",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Employee"],
    }),
    deleteEmployee: build.mutation({
      query: (id) => ({
        url: `/api/employee/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Employee"],
    }),
  }),
});

export const {
  useGetAllEmployeeQuery,
  useGetEmloyeeByIdQuery,
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} = employeeApi;
