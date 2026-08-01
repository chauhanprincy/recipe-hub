import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useLocalStorage('recipe-favorites', []);

  const addFavorite = (recipe) => {
    // Only save essential details to avoid bloated local storage
    const conciseRecipe = {
      idMeal: recipe.idMeal,
      strMeal: recipe.strMeal,
      strMealThumb: recipe.strMealThumb,
      strCategory: recipe.strCategory,
      strArea: recipe.strArea
    };
    
    if (!favorites.some(fav => fav.idMeal === recipe.idMeal)) {
      setFavorites([...favorites, conciseRecipe]);
    }
  };

  const removeFavorite = (id) => {
    setFavorites(favorites.filter((fav) => fav.idMeal !== id));
  };

  const isFavorite = (id) => {
    return favorites.some((fav) => fav.idMeal === id);
  };

  const toggleFavorite = (recipe) => {
    if (isFavorite(recipe.idMeal)) {
      removeFavorite(recipe.idMeal);
    } else {
      addFavorite(recipe);
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
