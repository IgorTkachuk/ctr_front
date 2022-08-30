import { createApi } from "@reduxjs/toolkit/query/react";
import { appBaseQuery } from "../../services/api";

export const prnApi = createApi({
  reducerPath: "printerModelApi",
  tagTypes: ["PrinterModel"],
  baseQuery: appBaseQuery(),
  endpoints: (builder) => ({
    getAllPrinterModels: builder.query({
      query: () => ({
        url: "/api/printers",
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map((item) => ({ type: "PrinterModel", id: item.id })),
              { type: "PrinterModel", id: "LIST" },
            ]
          : [{ type: "PrinterModel", id: "LIST" }],
    }),
    createPrinterModel: builder.mutation({
      query: (body) => ({
        url: "/api/printers",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "PrinterModel", id: "LIST" }],
    }),
    updatePrinterModel: builder.mutation({
      query: (body) => ({
        url: "/api/printers",
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "PrinterModel", id: "LIST" }],
    }),
    deletePrinterModel: builder.mutation({
      query: (id) => ({
        url: `/api/printers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "PrinterModel", id: "LIST" }],
    }),
    getPrinterModelById: builder.query({
      query: (id) => ({
        url: `/api/printers/${id}`,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              { type: "PrinterModel", id: result?.id },
              { type: "PrinterModel", id: "LIST" },
            ]
          : [{ type: "PrinterModel", id: "LIST" }],
    }),
  }),
});

export const {
  useGetAllPrinterModelsQuery,
  useCreatePrinterModelMutation,
  useUpdatePrinterModelMutation,
  useDeletePrinterModelMutation,
  useGetPrinterModelByIdQuery,
} = prnApi;
