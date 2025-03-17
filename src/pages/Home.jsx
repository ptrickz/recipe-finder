import { React, useState, useEffect } from "react";
import Search from "../components/Search";
import Category from "../components/Category";
import { fetchCategories } from "../services/categoryService";
import Card from "../components/Card";
import { fetchMeals } from "../services/mealsService";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const mealsPerPage = 5;

  useEffect(() => {
    const mealIds = [
      53048, 52772, 52893, 52948, 53000, 52874, 52977, 52785, 53005, 52802,
    ];

    const fetchData = async () => {
      try {
        const [fetchedCategories, fetchedMeals] = await Promise.all([
          fetchCategories(),
          Promise.all(mealIds.map((id) => fetchMeals(id))),
        ]);

        setCategories(fetchedCategories);
        setMeals(
          fetchedMeals.flat().map((meal) => ({
            ...meal,
            ingredients: getIngredients(meal),
          }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const getIngredients = (meal) => {
    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim() !== "") {
        ingredients.push(`${measure.trim()} ${ingredient}`);
      }
    }
    return ingredients;
  };

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  // Pagination Logic
  const totalPages = Math.ceil(meals.length / mealsPerPage);
  const startIndex = (currentPage - 1) * mealsPerPage;
  const paginatedMeals = meals.slice(startIndex, startIndex + mealsPerPage);

  return (
    <main className="bg-slate-800 h-screen w-full overflow-x-hidden overflow-hidden">
      <div className="flex flex-col items-center justify-center w-full">
        <header className="text-white text-3xl">
          <div className="p-3">
            <img className="w-96" src="/white-logo.svg" alt="" />
          </div>
          <h1 className="m-5">Delicious Recipes, Simple Steps!</h1>
        </header>

        <div className="flex flex-row">
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>

        <div className="text-white text-2xl mt-10 mx-10">
          <h1 className="hover:cursor-pointer w-fit">Categories</h1>
          <div className="w-full gap-2 flex flex-wrap justify-center">
            {categories.map((cat) => (
              <Category
                key={cat.strCategory}
                label={cat.strCategory}
                isSelected={selectedCategories.includes(cat.strCategory)}
                onSelect={() => toggleCategory(cat.strCategory)}
              />
            ))}
          </div>
          <div className="text-2xl mt-10 mb-5">Popular Meals:</div>

          {/* Meal Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 w-full gap-4 items-center justify-center">
            {paginatedMeals.length > 0 ? (
              paginatedMeals.map((m) => (
                <Card
                  key={m.idMeal}
                  imgSrc={m.strMealThumb}
                  name={m.strMeal}
                  category={m.strCategory}
                  ingredients={m.ingredients}
                  instructions={m.strInstructions}
                  youtubeUrl={m.strYoutube}
                  sourceUrl={m.strSource}
                  area={m.strArea}
                />
              ))
            ) : (
              <p className="text-gray-400">No meals found</p>
            )}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-6">
              <button
                className={`px-4 py-2 rounded-md ${
                  currentPage === 1
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                } text-white transition`}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="text-lg font-semibold">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className={`px-4 py-2 rounded-md ${
                  currentPage === totalPages
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                } text-white transition`}
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
