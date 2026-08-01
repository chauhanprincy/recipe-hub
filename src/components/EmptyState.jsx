import React from 'react';
import { ChefHat } from 'lucide-react';

const EmptyState = ({ title = "No recipes found", description = "Try adjusting your search or filters to find what you're looking for." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center animate-in fade-in zoom-in-95 duration-500">
      <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6 shadow-inner">
        <ChefHat className="h-12 w-12 text-gray-400 dark:text-gray-500" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-gray-500 dark:text-gray-400 max-w-md">
        {description}
      </p>
    </div>
  );
};

export default EmptyState;
