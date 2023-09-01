"use client";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiResponse, Details, DetailsResponseBody, Search, SearchResponseBody } from "../../../../types";
export const ApiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    // baseUrl: `${window.location.origin}/api`,
    baseUrl: `http://localhost:3000/api`
  }),
  endpoints: (build) => ({
    search: build.query<ApiResponse<SearchResponseBody>, Search>({
      query: (request_body) => {
        const params = new URLSearchParams({
          search: request_body.search,
          ...(request_body.type && { type: request_body.type }),
          ...(request_body.year && { year: request_body.year.toString() }),
          ...(request_body.page && { page: request_body.page.toString() })
        });
        return {
          url: `/search?${params.toString()}`,
        };
      },
    }),
    details: build.query<ApiResponse<DetailsResponseBody>, Details>({
      query: (request_body) => {
        const params = new URLSearchParams({
          imdb_id: request_body.imdb_id,
          ...(request_body.plot && { plot: request_body.plot })
        });
        return {
          url: `/search/details?${params.toString()}`,
        };
      },
    }),
  }),
});
export const { useSearchQuery, useDetailsQuery } = ApiSlice;
