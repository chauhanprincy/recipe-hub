import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Utensils, Globe } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';

const RecipeCard = ({ recipe }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(recipe.idMeal);

  const handleFavoriteClick = (e) => {
    e.preventDefault(); // Prevent navigating to recipe details
    e.stopPropagation();
    toggleFavorite(recipe);
  };

  return (
    <Link 
      to={`/recipe/${recipe.idMeal}`}
      className="group flex flex-col bg-white dark:bg-gray-800 rounded-2xl overflow-hidden card-hover border border-gray-100 dark:border-gray-700 h-full"
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
        
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md transition-all group/btn"
          aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart 
            className={`h-5 w-5 transition-colors ${
              favorite ? 'fill-red-500 text-red-500' : 'text-white group-hover/btn:text-red-400'
            }`} 
          />
        </button>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2 line-clamp-2">
          {recipe.strMeal}
        </h3>
        
        <div className="flex flex-wrap items-center gap-3 mt-auto text-sm text-gray-600 dark:text-gray-300">
          {recipe.strCategory && (
            <div className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-700 px-2.5 py-1 rounded-md">
              <Utensils className="h-3.5 w-3.5 text-primary-500" />
              <span>{recipe.strCategory}</span>
            </div>
          )}
          {recipe.strArea && (
            <div className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-700 px-2.5 py-1 rounded-md">
              <Globe className="h-3.5 w-3.5 text-blue-500" />
              <span>{recipe.strArea}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
