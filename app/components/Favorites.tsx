"use client";

import React, { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../store/hooks";
import FavoriteItem from "./FavoriteItem";

const Favorites = () => {
  const [showFavs, setShowFavs] = useState<boolean>(false);
  const favs = useAppSelector((state) => state.favorite.favorites);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let t: NodeJS.Timeout;
    function handleClickOutside({ target }: MouseEvent) {
      if (btnRef.current && !btnRef.current.contains(target as Node)) {
        t = setTimeout(() => {
          setShowFavs(false);
        }, 150);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      clearTimeout(t);
    };
  }, [btnRef]);

  return (
    <div className="ml-auto text-white bg-[#212121] px-4 py-1 rounded-lg">
      <button
        ref={btnRef}
        onClick={() => setShowFavs((prev) => !prev)}
        className="text-sm"
      >
        Favorites : {favs.length}{" "}
      </button>
      <div className="absolute right-0 top-20 w-full md:w-4/6 lg:w-[50%] bg-[#212121] text-white rounded-lg overflow-hidden z-10">
        {showFavs &&
          favs?.map((movie) => (
            <FavoriteItem key={movie.imdbID} {...movie}/>
          ))}
      </div>
    </div>
  );
};

export default Favorites;
