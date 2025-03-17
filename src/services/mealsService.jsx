import axios from "axios";
import Endpoints from "../config/endpoints";

export const fetchMeals = async (id) => {
  try {
    const { data } = await axios.get(`${Endpoints.lookUpRecipe}${id}`);
    return data.meals || []; // Ensures an array is returned
  } catch (error) {
    console.error("Error fetching categories:", error);
    return []; // Return empty array on failure
  }
};
