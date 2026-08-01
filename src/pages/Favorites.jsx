import React from 'react';
import { useFavorites } from '../context/FavoritesContext';
import RecipeGrid from '../components/RecipeGrid';
import EmptyState from '../components/EmptyState';
import { Heart } from 'lucide-react';

const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-xl">
          <Heart className="h-8 w-8 text-red-500 fill-red-500" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
          Your Favorites
        </h1>
      </div>

      {favorites.length > 0 ? (
        <RecipeGrid recipes={favorites} />
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 py-12">
          <EmptyState 
            title="No favorites yet" 
            description="You haven't added any recipes to your favorites yet. Go explore some amazing recipes and click the heart icon to save them here!"
          />
        </div>
      )}
    </div>
  );
};

export default Favorites;
