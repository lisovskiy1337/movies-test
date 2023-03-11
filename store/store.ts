'use client'

import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { searchMoviesApi } from './apis/searchMovies'
import favoriteReducer from "./slices/favoriterSlice"

const combRed = combineReducers({
  [searchMoviesApi.reducerPath]: searchMoviesApi.reducer,
  favorite: favoriteReducer
})

export const store = configureStore({
  reducer: combRed,
  middleware: (getDefaultMiddleware: any) => (
    getDefaultMiddleware().concat(searchMoviesApi.middleware)
),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch