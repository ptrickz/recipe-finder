import React from "react";

const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="flex justify-center items-center w-full mt-6 px-4">
      <div className="text-white shadow-md border-2 border-slate-500 hover:shadow-lg hover:border-slate-400 rounded-xl text-lg flex flex-row w-full sm:w-2/3 md:w-1/2 lg:w-1/3 h-12 items-center px-4">
        <input
          type="text"
          value={searchTerm}
          className="flex-grow bg-transparent focus:outline-none text-base md:text-lg"
          placeholder="Search recipes..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          className={`w-5 h-5 ml-3 cursor-pointer transition-opacity ${
            searchTerm ? "opacity-100" : "opacity-50"
          }`}
          onClick={() => {
            if (searchTerm) {
              setSearchTerm("");
            }
          }}
          src={searchTerm ? "/clear.svg" : "/search.svg"}
          alt="Search or clear"
        />
      </div>
    </div>
  );
};

export default Search;
