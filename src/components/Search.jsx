import React from "react";

const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="flex flex-col justify-center items-center w-screen mt-10">
      <div className="text-white shadow-md border-2 border-slate-500 hover:shadow-lg hover:border-slate-400 rounded-xl text-2xl  flex flex-row w-1/3 h-12 items-center justify-center">
        <input
          type="text"
          value={searchTerm}
          className="grow bg-transparent focus:outline-none text-sm ml-5"
          placeholder="Search recipes..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          className={`
                w-[14px] mr-5 ${searchTerm != "" ? "cursor-pointer" : ""}
              `}
          onClick={() => {
            if (searchTerm != "") {
              setSearchTerm("");
            }
          }}
          src={searchTerm == "" ? "/search.svg" : "/clear.svg"}
          alt="Search or clear"
        />
      </div>
    </div>
  );
};

export default Search;
