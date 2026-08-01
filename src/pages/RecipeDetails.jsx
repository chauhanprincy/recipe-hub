import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';
import { useFavorites } from '../context/FavoritesContext';
import { ArrowLeft, Heart, Youtube, Globe, Utensils, Clock, Users } from 'lucide-react';

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const data = await api.getRecipeDetailsById(id);
        if (data) {
          setRecipe(data);
        } else {
          setError("Recipe not found");
        }
      } catch (err) {
        setError("Failed to fetch recipe details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchDetails();
  }, [id]);

  if (loading) return <div className="min-h-[70vh] flex items-center"><Loader message="Preparing recipe details..." /></div>;
  if (error || !recipe) return <EmptyState title="Recipe Not Found" description={error || "The recipe you are looking for does not exist."} />;

  const favorite = isFavorite(recipe.idMeal);

  // Extract ingredients and measures
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== "") {
      ingredients.push({ ingredient, measure });
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20 animate-in fade-in duration-500">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors mb-6 font-medium group"
      >
        <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
        Back
      </button>

      <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-700">
        <div className="relative h-64 sm:h-96 w-full">
          <img 
            src={recipe.strMealThumb} 
            alt={recipe.strMeal} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-3 mb-3 text-sm text-white/90">
              {recipe.strCategory && (
                <span className="flex items-center gap-1.5 bg-primary-500/80 backdrop-blur-sm px-3 py-1.5 rounded-full font-medium">
                  <Utensils className="h-4 w-4" /> {recipe.strCategory}
                </span>
              )}
              {recipe.strArea && (
                <span className="flex items-center gap-1.5 bg-blue-500/80 backdrop-blur-sm px-3 py-1.5 rounded-full font-medium">
                  <Globe className="h-4 w-4" /> {recipe.strArea}
                </span>
              )}
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-bold text-white mb-2 leading-tight">
              {recipe.strMeal}
            </h1>
          </div>
          
          <button
            onClick={() => toggleFavorite(recipe)}
            className="absolute top-6 right-6 p-4 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md transition-all shadow-lg group"
            aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart 
              className={`h-6 w-6 transition-transform group-hover:scale-110 ${
                favorite ? 'fill-red-500 text-red-500' : 'text-white'
              }`} 
            />
          </button>
        </div>

        <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-700/50">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Utensils className="h-5 w-5 text-primary-500" />
                Ingredients
              </h3>
              <ul className="space-y-3">
                {ingredients.map((item, index) => (
                  <li key={index} className="flex justify-between items-center text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700 pb-2 last:border-0 last:pb-0">
                    <span className="font-medium">{item.ingredient}</span>
                    <span className="text-gray-500 dark:text-gray-400 text-sm text-right max-w-[50%]">{item.measure}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-4">
              {recipe.strYoutube && (
                <a 
                  href={recipe.strYoutube} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-xl font-medium transition-colors shadow-md shadow-red-600/20"
                >
                  <Youtube className="h-5 w-5" />
                  Watch Video Tutorial
                </a>
              )}
              {recipe.strSource && (
                <a 
                  href={recipe.strSource} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white py-3 px-4 rounded-xl font-medium transition-colors"
                >
                  <Globe className="h-5 w-5" />
                  Original Source
                </a>
              )}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Instructions
            </h3>
            <div className="prose dark:prose-invert max-w-none space-y-4">
              {recipe.strInstructions.split('\n').filter(p => p.trim() !== '').map((paragraph, index) => (
                <p key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
