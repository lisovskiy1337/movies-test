export interface IMovie {
  Title: string;
  imdbID: string;
  Poster: string;
  Year: number;
  Genre: string;
  Director: string;
  Actors: string;
  Country: string;
  Plot: string;
  imdbRating: number;
  imdbVotes: number;
  Runtime: string;
}

export interface IMovieList {
  Search: IMovie[];
}
