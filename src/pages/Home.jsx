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

  useEffect(() => {
    const mealIds = [
      53048, 52772, 52893, 52948, 53000, 52874, 52977, 52785, 53005, 52802,
      52773, 52774, 52775, 52777, 53049, 53050, 53047, 5304, 53045, 53046,
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

  // Filter meals based on search term and selected categories
  const filteredMeals = meals.filter((meal) => {
    const matchesSearch = searchTerm
      ? meal.strMeal.toLowerCase().includes(searchTerm.toLowerCase()) ||
        meal.strCategory.toLowerCase().includes(searchTerm.toLowerCase()) ||
        meal.strArea.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    const matchesCategory =
      selectedCategories.length > 0
        ? selectedCategories.includes(meal.strCategory)
        : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-slate-800 min-h-screen h-auto">
      <main className="flex-grow overflow-y-auto">
        <div className="flex flex-col items-center">
          <header className="text-white text-3xl text-center">
            <div className="p-3">
              <img className="w-80 md:w-96" src="/white-logo.svg" alt="Logo" />
            </div>
            <h1 className="m-5 text-lg sm:text-xl md:text-2xl">
              Delicious Recipes, Simple Steps!
            </h1>
          </header>

          <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 flex justify-center">
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>

          <div className="text-white text-xl md:text-2xl mt-10 mx-4 md:mx-10">
            <h1 className="hover:cursor-pointer w-fit mb-3">Categories</h1>
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

            <div className="text-xl md:text-2xl mt-10 mb-5">Popular Meals:</div>

            {/* Meal Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 w-full gap-4 items-center justify-center">
              {filteredMeals.length > 0 ? (
                filteredMeals.map((m) => (
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
                <p className="text-gray-400 text-center col-span-full">
                  No meals found
                </p>
              )}
            </div>
          </div>
        </div>
        <footer className="bg-gray-900 flex-grow  text-white text-center p-4 mt-10 w-full h-auto">
          &copy; 2025 RecipeFinder
        </footer>
      </main>
    </div>
  );
};

export default Home;
