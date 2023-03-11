import Link from "next/link";
import React from "react";
import { IMovie } from "../../types/Movie";

const SearchItem: React.FC<IMovie> = (movie) => {
  return (
    <div>
      <Link href={`/movies/${movie.imdbID}`} className="flex items-center">
        <img src={movie.Poster} alt={movie.Title} width={40} height={40} />
        <h3 className="ml-3 hover:underline">{movie.Title}</h3>
      </Link>
    </div>
  );
};

export default SearchItem;
