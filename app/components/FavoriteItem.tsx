'use client'

import React from 'react'
import { removeFromFavorite } from "../../store/slices/favoriterSlice";
import removeImg from "../../public/remove.png";
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { IMovie } from '../../types/Movie';
const FavoriteItem : React.FC<IMovie> = (movie) => {
    const dispatch = useDispatch()
  return (
    <div className="flex items-center">
              <Link
                href={`/movies/${movie.imdbID}`}
                className="flex items-center gap-2"
              >
                <img src={movie.Poster} alt={movie.Title} width={40} height={40} />
                {movie.Title}
              </Link>
              <button
                onClick={() => dispatch(removeFromFavorite(movie))}
                className="ml-auto"
              >
                <Image
                  className="mx-3 inline-block align-baseline"
                  src={removeImg}
                  alt="remove"
                  width={30}
                  height={30}
                />
              </button>
            </div>
  )
}

export default FavoriteItem