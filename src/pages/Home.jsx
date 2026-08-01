import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import SearchBar from '../components/SearchBar';
import RecipeGrid from '../components/RecipeGrid';
import SkeletonLoader from '../components/SkeletonLoader';
import EmptyState from '../components/EmptyState';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    // Load some random recipes initially to populate the home page
    const loadInitialRecipes = async () => {
      try {
        setLoading(true);
        // The random endpoint only returns 1 recipe, so we do it a few times
        // In a real prod environment with a better API, we'd fetch a list.
        const promises = Array.from({ length: 8 }).map(() => api.getRandomRecipe());
        const results = await Promise.all(promises);
        
        // Filter out nulls and duplicates just in case
        const validRecipes = results.filter(Boolean);
        const uniqueRecipes = Array.from(new Map(validRecipes.map(item => [item.idMeal, item])).values());
        
        setRecipes(uniqueRecipes);
        setError(null);
      } catch (err) {
        setError('Failed to load initial recipes. Please try searching.');
      } finally {
        setLoading(false);
      }
    };

    loadInitialRecipes();
  }, []);

  const handleSearch = async (query, type) => {
    try {
      setLoading(true);
      setError(null);
      setSearched(true);
      
      let results = [];
      if (type === 'name') {
        results = await api.searchRecipesByName(query);
      } else if (type === 'ingredient') {
        results = await api.searchRecipesByIngredient(query);
      } else if (type === 'area') {
        results = await api.searchRecipesByArea(query);
      } else if (type === 'category') {
        results = await api.searchRecipesByCategory(query);
      }
      
      setRecipes(results);
    } catch (err) {
      setError('An error occurred while searching. Please try again.');
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center max-w-3xl mx-auto mb-12 animate-in slide-in-from-bottom-4 duration-700">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
          Discover Your Next <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-amber-500">Culinary Adventure</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Explore thousands of recipes from around the world. Search by name or ingredient to find exactly what you're craving.
        </p>
      </div>

      <SearchBar onSearch={handleSearch} />

      <div className="mt-12">
        {searched && (
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Search Results
          </h2>
        )}
        
        {!searched && !loading && recipes.length > 0 && (
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            Trending Recipes
          </h2>
        )}

        {loading ? (
          <SkeletonLoader count={8} />
        ) : error ? (
          <EmptyState title="Oops!" description={error} />
        ) : recipes.length > 0 ? (
          <RecipeGrid recipes={recipes} />
        ) : (
          <EmptyState 
            title="No recipes found" 
            description="We couldn't find any recipes matching your search. Try different keywords or ingredients." 
          />
        )}
      </div>
    </div>
  );
};

export default Home;
