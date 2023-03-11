"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMovie } from "../../types/Movie";

interface IState {
  favorites: IMovie[];
}

const initialState: IState = {
  favorites: []
};

export const favoriteSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorite: (state, action: PayloadAction<IMovie>) => {
      state.favorites.push(action.payload);
    },
    removeFromFavorite: (state, action: PayloadAction<IMovie>) => {
      const existingItem = state.favorites.find(
        (item) => item.imdbID === action.payload.imdbID
      );
      if (existingItem) {
        state.favorites = state.favorites.filter(
          (item) => item.imdbID !== action.payload.imdbID
        );
      }
    },
  },
});

export const { addToFavorite, removeFromFavorite } = favoriteSlice.actions;

export default favoriteSlice.reducer;
