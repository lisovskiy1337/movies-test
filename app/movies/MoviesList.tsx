import Link from "next/link";
import React from "react";
import { truncate } from "../../helpers/truncate";
import { IMovieList } from "../../types/Movie";

const fetchMovies = async () => {
  const res = await fetch(
    `https://www.omdbapi.com/?s=harry+potter&apikey=${process.env.API_KEY}`, {cache: 'force-cache'}
  );
  const movies: IMovieList = await res.json();
  return movies.Search;
};

const MoviesList = async () => {
  const movies = await fetchMovies();

  return (
    <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8 px-4">
      {movies.map((movie) => (
        <div key={movie.imdbID} className="h-80 rounded-2xl">
          <Link href={`/movies/${movie.imdbID}`}>
            <img
              src={movie.Poster}
              alt={movie.Title}
              className="w-full h-5/6 rounded-2xl object-cover"
            />
            <p className="text-md text-center text-white">
              {truncate(movie.Title, 40)}
            </p>
          </Link>
        </div>
      ))}
    </section>
  );
};

export default MoviesList;
