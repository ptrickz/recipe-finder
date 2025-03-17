import React from "react";

const Category = ({ label, isSelected, onSelect }) => {
  return (
    <div
      className={`flex flex-col items-center px-3 py-1 my-5 
        ${
          isSelected
            ? "bg-slate-600 text-gray-200 hover:bg-slate-700"
            : "bg-slate-200 text-gray-800 hover:bg-slate-300"
        }  
        text-xl font-medium rounded-full transition duration-300 cursor-pointer hover:scale-105`}
      onClick={onSelect}
    >
      <span>{`${label} ${isSelected ? "✅" : ""}`}</span>
    </div>
  );
};

export default Category;
