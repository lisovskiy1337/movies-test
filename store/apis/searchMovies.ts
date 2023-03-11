import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IMovieList } from "../../types/Movie";

export const searchMoviesApi = createApi({
  reducerPath: "searchMoviesApi",
  tagTypes: ["Movies"],
  baseQuery: fetchBaseQuery({ baseUrl: `http://www.omdbapi.com` }),
  endpoints: (build) => ({
    getSearchedMovies: build.query<IMovieList, string>({
      query: (searchQuery: string) => ({
        url: `/?s=${searchQuery}&apikey=${process.env.API_KEY}`,
      }),
      providesTags: (res) => ["Movies"],
    }),
  }),
});

export const { useGetSearchedMoviesQuery } = searchMoviesApi;
