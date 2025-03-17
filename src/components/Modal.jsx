import React from "react";

const formatInstructions = (instructions) => {
  return instructions
    .split(/(?<!\d)\.\s+/) // Splits at ". " but avoids numbers (e.g., "Step 1. Do this.")
    .filter((sentence) => sentence.trim().length > 0) // Removes empty entries
    .map((sentence, index) => (
      <li key={index} className="mb-1">
        {sentence.trim()}.
      </li>
    ));
};

const Modal = ({
  name,
  category,
  area,
  imgSrc,
  ingredients,
  instructions,
  youtubeUrl,
  sourceUrl,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-slate-900/90 flex justify-center items-center p-4">
      <div className="bg-slate-700 p-6 rounded-lg w-3/4 max-w-4xl text-white flex flex-col md:flex-row gap-6 shadow-xl relative">
        <button
          className="absolute top-3 right-4 text-2xl text-gray-300 hover:text-white cursor-pointer transition"
          onClick={onClose}
        >
          ✕
        </button>

        <div className="flex flex-col items-center w-full md:w-1/3">
          <img
            src={imgSrc}
            alt={name}
            className="w-full h-60 object-cover rounded-lg shadow-md"
          />
          <h2 className="text-2xl font-bold mt-3 text-center">{name}</h2>
          <p className="text-gray-300">Category: {category}</p>
          <p className="text-gray-300">Area: {area}</p>
        </div>

        <div className="flex flex-col w-full md:w-2/3">
          <h3 className="text-xl font-semibold mb-2">Ingredients</h3>
          <ul className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
            {ingredients.map((ing, index) => (
              <li key={index} className="bg-slate-600 px-3 py-1 rounded-lg">
                {ing}
              </li>
            ))}
          </ul>

          <h3 className="text-xl font-semibold mt-4 mb-2">Instructions</h3>
          <div className="bg-slate-600 p-4 rounded-lg max-h-40 overflow-y-auto text-sm leading-relaxed">
            <ol className="list-decimal list-inside">
              {formatInstructions(instructions)}
            </ol>
          </div>

          <div className="flex flex-row justify-end mt-5 gap-5">
            <a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-md text-sm font-semibold transition"
            >
              Watch on YouTube
            </a>
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-md text-sm font-semibold transition"
            >
              Go to Source
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
