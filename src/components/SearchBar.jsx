import React, { useState } from 'react';
import { Search, Info } from 'lucide-react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState('name'); // 'name' or 'ingredient'

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim(), searchType);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto my-8">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-grow group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
          </div>
          <input
            type="text"
            className="block w-full pl-11 pr-4 py-4 rounded-xl border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-lg placeholder-gray-400 dark:placeholder-gray-500 outline-none"
            placeholder={
              searchType === 'name' ? "Search for recipes (e.g., pasta, chicken...)" :
              searchType === 'ingredient' ? "Search by main ingredient (e.g., chicken_breast...)" :
              searchType === 'area' ? "Search by cuisine (e.g., Indian, Italian...)" :
              "Search by category (e.g., Seafood, Dessert...)"
            }
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="pl-4 pr-8 py-4 rounded-xl border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none appearance-none cursor-pointer"
          >
            <option value="name">By Name</option>
            <option value="ingredient">By Ingredient</option>
            <option value="area">By Cuisine</option>
            <option value="category">By Category</option>
          </select>
          
          <button
            type="submit"
            className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl shadow-md transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-900"
          >
            Search
          </button>
        </div>
      </form>
      {searchType === 'ingredient' && (
        <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 justify-center sm:justify-start">
          <Info className="h-4 w-4" /> 
          Use underscores for multiple words (e.g. chicken_breast)
        </p>
      )}
    </div>
  );
};

export default SearchBar;
