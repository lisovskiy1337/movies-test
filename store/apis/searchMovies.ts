import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IMovieList } from "../../types/Movie";

export const searchMoviesApi = createApi({
  reducerPath: "searchMoviesApi",
  tagTypes: ["Movies"],
  baseQuery: fetchBaseQuery({ baseUrl: `https://www.omdbapi.com` }),
  endpoints: (build) => ({
    getSearchedMovies: build.query<IMovieList, string>({
      query: (searchQuery: string) => ({
        url: `/?s=${searchQuery}&apikey=2f4de909`,
      }),
      providesTags: (res) => ["Movies"],
    }),
  }),
});

export const { useGetSearchedMoviesQuery } = searchMoviesApi;
