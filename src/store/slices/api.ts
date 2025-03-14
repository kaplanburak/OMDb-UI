import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  SearchResult,
  SearchArgs,
  DetailResult,
} from "../../definitions/omdb.types";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  endpoints: (build) => ({
    search: build.query<SearchResult, SearchArgs>({
      query: ({ s, type, page, y }) => {
        const searchParams = new URLSearchParams({
          s,
          page,
        });

        if (type) {
          searchParams.set("type", type);
        }

        if (y) {
          searchParams.set("y", y);
        }

        return `/api&${searchParams.toString()}`;
      },
    }),
    detail: build.query<DetailResult, { i: string }>({
      query: ({ i }) => {
        const searchParams = new URLSearchParams({
          i,
          plot: "full",
        });

        return `/api&${searchParams.toString()}`;
      },
    }),
  }),
});

export const { useSearchQuery, useDetailQuery } = api;
