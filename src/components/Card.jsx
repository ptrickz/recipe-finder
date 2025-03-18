import React, { useState } from "react";
import Modal from "./Modal"; // Import Modal Component

const Card = ({
  name,
  category,
  area,
  ingredients,
  instructions,
  youtubeUrl,
  sourceUrl,
  imgSrc,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <div
        className="my-5 w-full sm:w-[250px] h-[320px] bg-slate-600 hover:bg-slate-700 hover:scale-105 transition-all duration-300 hover:cursor-pointer rounded-lg flex flex-col justify-start items-center overflow-hidden"
        onClick={() => setIsModalOpen(true)}
        onKeyDown={handleKeyDown}
        tabIndex={0} // Makes it keyboard accessible
        role="button" // Improves accessibility
      >
        <img
          src={imgSrc}
          alt={name}
          className="w-full h-[150px] rounded-t-lg object-cover"
        />
        <div className="text-left w-full px-5 text-lg text-white mt-2">
          <p className="truncate">
            <strong>Name:</strong> {name}
          </p>
          <p className="truncate">
            <strong>Category:</strong> {category}
          </p>
          <p className="truncate">
            <strong>Area:</strong> {area}
          </p>
        </div>
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
