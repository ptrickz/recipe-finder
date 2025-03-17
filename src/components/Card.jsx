import React, { useState } from "react";
import Modal from "./Modal"; // Import Modal Component

const Card = ({ name, category, area, ingredients, instructions, youtubeUrl,sourceUrl, imgSrc }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div
        className="my-5 w-[250px] h-[300px] bg-slate-600 hover:bg-slate-700 hover:scale-105 transition-all duration-300 hover:cursor-pointer rounded-lg flex flex-col justify-start items-center"
        onClick={() => setIsModalOpen(true)} // Open modal on click
      >
        <img
          src={imgSrc}
          alt={name}
          className="bg-black w-full h-1/2 rounded-t-lg object-cover"
        />
        <span className="text-left w-full px-5 text-lg">Name: {name}</span>
        <span className="text-left w-full px-5 text-lg">
          Category: {category}
        </span>
        <span className="text-left w-full px-5 text-lg">Area: {area}</span>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <Modal
          name={name}
          category={category}
          area={area}
          imgSrc={imgSrc}
          ingredients={ingredients}
          instructions={instructions}
          youtubeUrl={youtubeUrl}
          sourceUrl={sourceUrl}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default Card;
