import { createApi } from "@reduxjs/toolkit/query/react";
import { appBaseQuery } from "../../services/api";

export const usrApi = createApi({
  reducerPath: "usrApi",
  baseQuery: appBaseQuery(),
  tagTypes: ["Usr"],
  endpoints: (build) => ({
    getAllUsr: build.query({
      query: () => ({
        url: "/api/users",
        method: "GET",
      }),
      providesTags: (results) =>
        results
          ? [
              ...results.map((item) => ({ type: "Usr", id: item.id })),
              { type: "Usr", id: "LIST" },
            ]
          : [{ type: "Usr", id: "LIST" }],
    }),
  }),
});

export const { useGetAllUsrQuery } = usrApi;
