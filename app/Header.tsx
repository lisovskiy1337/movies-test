
import React from "react";
import Favorites from "./components/Favorites";
import Search from "./components/Search";

const Header = () => {
  return (
    <header className="sticky bg-[#191919] top-0 z-20 w-full py-5 px-6 border-b border-gray-500 flex items-center gap-6">
      <Search />
      <Favorites/>
    </header>
  );
};

export default Header;
