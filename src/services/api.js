import axios from 'axios';

const API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

export const api = {
  // Search recipe by name
  searchRecipesByName: async (name) => {
    try {
      const response = await apiClient.get(`/search.php?s=${name}`);
      return response.data.meals || [];
    } catch (error) {
      console.error('Error fetching recipes by name:', error);
      throw error;
    }
  },

  // Search recipe by main ingredient
  searchRecipesByIngredient: async (ingredient) => {
    try {
      const response = await apiClient.get(`/filter.php?i=${ingredient}`);
      return response.data.meals || [];
    } catch (error) {
      console.error('Error fetching recipes by ingredient:', error);
      throw error;
    }
  },

  // Search recipe by area (cuisine)
  searchRecipesByArea: async (area) => {
    try {
      const queryArea = area.toLowerCase() === 'indian' ? 'India' : area;
      const response = await apiClient.get(`/filter.php?a=${queryArea}`);
      return response.data.meals || [];
    } catch (error) {
      console.error('Error fetching recipes by area:', error);
      throw error;
    }
  },

  // Search recipe by category
  searchRecipesByCategory: async (category) => {
    try {
      const response = await apiClient.get(`/filter.php?c=${category}`);
      return response.data.meals || [];
    } catch (error) {
      console.error('Error fetching recipes by category:', error);
      throw error;
    }
  },

  // Get recipe details by ID
  getRecipeDetailsById: async (id) => {
    try {
      const response = await apiClient.get(`/lookup.php?i=${id}`);
      return response.data.meals ? response.data.meals[0] : null;
    } catch (error) {
      console.error('Error fetching recipe details:', error);
      throw error;
    }
  },
  
  // Get a random recipe (useful for home page)
  getRandomRecipe: async () => {
    try {
      const response = await apiClient.get('/random.php');
      return response.data.meals ? response.data.meals[0] : null;
    } catch (error) {
      console.error('Error fetching random recipe:', error);
      throw error;
    }
  }
};
