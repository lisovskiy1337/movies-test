"use client";

import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import { useGetSearchedMoviesQuery } from "../../store/apis/searchMovies";
import SearchItem from "./SearchItem";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const debounce = useDebounce(searchQuery, 500);
  const { data, isFetching } = useGetSearchedMoviesQuery(debounce, {
    skip: debounce == "",
  });

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.currentTarget.value);
  };
  useEffect(() => {
    let t: NodeJS.Timeout;
    function handleClickOutside({ target }: MouseEvent) {
      if (searchQuery.length > 0) {
        if (inputRef.current && !inputRef.current.contains(target as Node)) {
          t = setTimeout(() => {
            setSearchQuery("");
          }, 100);
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      clearTimeout(t);
    };
  }, [inputRef, searchQuery]);
  return (
    <div>
      <form>
        <input
          type="text"
          value={searchQuery}
          placeholder="Search..."
          ref={inputRef}
          onChange={handleSearch}
          className="w-full sm:w-80 rounded-3xl py-2 px-4 bg-[#212121] border border-transparent shadow-sm outline-none  text-[#BABABA] font-semibold focus:border-[#BABABA] transition-colors duration-300"
        />
      </form>
      <div className="absolute w-full bg-[#212121] left-0 top-20 text-white max-h-screen overflow-y-scroll z-10">
        {isFetching && <span>Loading...</span>}
        {debounce && !data?.Search && !isFetching ? (
          <span>No movies found</span>
        ) : null}
        {searchQuery &&
          data?.Search?.map((movie) => (
            <SearchItem key={movie.imdbID} {...movie}/>
          ))}
      </div>
    </div>
  );
};

export default Search;
