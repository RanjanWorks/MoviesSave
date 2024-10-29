import React, { useState } from "react";
import { MdOutlineSearch } from "react-icons/md";

const Header = ({ sendDataToParent }) => {
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const suffix = "site:filmyzilla.com.by"; // Define your prefix here

  const handleSearch = () => {
    sendDataToParent(searchQuery);
  };
  const handleDownload = () => {
    if (searchQuery.trim()) {
      const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(
        searchQuery + " " + suffix
      )}`;
      window.open(googleSearchUrl, "_blank"); // Open in a new tab
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-center gap-2 py-10 px-4 sm:px-8 lg:px-16">
      <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 flex flex-col gap-3">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif">
          MOVIES
        </h1>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl">
          Free Movie Downloads | Download Movies Online | Movie Downloader |
          Watch Movies Online Free | Best Movie Download Site
        </p>
      </div>
      <div className="flex items-center bg-gray-100 mt-5 p-1 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 gap-1 rounded-md">
        <div className="px-2">
          <MdOutlineSearch size={20} />
        </div>
        <input
          className="py-3 px-1 w-full bg-transparent outline-none text-sm sm:text-base"
          type="text"
          placeholder="Search for movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update state on input change
        />
        <button
          onClick={handleSearch}
          className="h-full rounded-md bg-zinc-950 text-zinc-50 p-3 text-sm sm:text-base"
        >
          Search
        </button>
        <button
          onClick={handleDownload} // Call handleSearch on button click
          className="h-full rounded-md bg-zinc-950 text-zinc-50 p-3 text-sm sm:text-base"
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default Header;
