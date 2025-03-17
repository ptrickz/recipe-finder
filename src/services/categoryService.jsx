import axios from "axios";
import Endpoints from "../config/endpoints";

export const fetchCategories = async () => {
  try {
    const { data } = await axios.get(Endpoints.allCategories);
    return data.meals || []; // Ensures an array is returned
  } catch (error) {
    console.error("Error fetching categories:", error);
    return []; // Return empty array on failure
  }
};
