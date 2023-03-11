import React from "react";
import { IMovie, IMovieList } from "../../../types/Movie";
import starImg from "../../../public/star.png";
import type { Metadata } from "next/types"
import Image from "next/image";
import AddFavoriteButton from "./components/AddFavoriteButton";
import Notfound from "./not-found";
interface PageProps {
  params: {
    movieId: string;
  };
}

const fetchMovie = async (movieId: string) => {
  const res = await fetch(
    `http://www.omdbapi.com/?i=${movieId}&apikey=2f4de909`,
    { next: {revalidate: 60}}
  );
  const movie: IMovie = await res.json();
  return movie;
};

const Movie = async ({ params: { movieId } }: PageProps) => {
  const movie = await fetchMovie(movieId);

  if (!movie.imdbID) return <Notfound/>;

  const genresArr = movie?.Genre?.split(",");

  return (
    <div className="text-white my-10 px-4 flex flex-col items-center sm:items-start sm:flex-row gap-6 ">
      <div className="flex-[1_0_30%] flex flex-col items-center text-center">
        <img src={movie.Poster} alt="" className="rounded-2xl w-96 h-[30rem]" />
        <AddFavoriteButton {...movie} />
      </div>
      <div>
        <div className="flex text-3xl gap-2">
          {movie.Title} • {movie?.Year} • {movie?.Runtime}
        </div>
        <div className="flex gap-1 mt-3">
          {genresArr?.map((genre) => (
            <div
              className="border px-3 rounded-xl text-sm text-center"
              key={genre}
            >
              {genre}
            </div>
          ))}
        </div>
        <p className="text-lg mt-3 lg:w-[70%]">{movie.Plot}</p>
        <p className="text-lg mt-3">
          <span className="text-[#3DD2CC]">Release Year:</span> {movie.Year}
        </p>
        <p className="text-lg mt-3">
          <span className="text-[#3DD2CC]">Director:</span> {movie.Director}
        </p>
        <p className="text-lg mt-3">
          <span className="text-[#3DD2CC]">Actors:</span> {movie.Actors}
        </p>
        <p className="text-lg mt-3">
          <span className="text-[#3DD2CC]">Countries:</span> {movie.Country}
        </p>
        <p className="text-lg mt-3">
          <span className="text-[#3DD2CC]">Rating:</span> {movie.imdbRating}
          <Image
            className="mx-2 inline-block align-baseline"
            src={starImg}
            alt="rating"
            width={16}
            height={16}
          />
          ( {movie.imdbVotes} votes )
        </p>
      </div>
    </div>
  );
};

export default Movie;

export async function generateStaticParams(){
  const res = await fetch(
    `https://www.omdbapi.com/?s=harry+potter&apikey=2f4de909`
  );
  const movies: IMovieList = await res.json();
  return movies.Search.map(movie => ({
    movieId: movie.imdbID.toString()
  }));
}

export async function generateMetadata({ params: { movieId } }: PageProps) : Promise<Metadata>{
  const movie : IMovie = await fetchMovie(movieId)

  return {
    title: movie.Title
  }
}
