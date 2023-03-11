"use client";

import React from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../../store/hooks";
import { addToFavorite } from "../../../../store/slices/favoriterSlice";
import { IMovie } from "../../../../types/Movie";

const AddFavoriteButton: React.FC<IMovie> = (movie: IMovie) => {
  const favs = useAppSelector((state) => state.favorite.favorites);
  const dispatch = useDispatch();

  return (
    <button
      disabled={
        favs?.find((item) => item.imdbID === movie.imdbID) ? true : false
      }
      className="px-4 py-2 mt-4 bg-slate-100 text-[#191919] rounded-lg disabled:opacity-50 text-center"
      onClick={() => dispatch(addToFavorite(movie))}
    >
      {favs?.find((item) => item.imdbID === movie.imdbID)
        ? "Already Favorite"
        : "Add To Favorites"}
    </button>
  );
};

export default AddFavoriteButton;
