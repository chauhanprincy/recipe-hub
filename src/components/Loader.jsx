import React from 'react';
import { Loader2 } from 'lucide-react';

const Loader = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 animate-in fade-in">
      <div className="relative">
        <div className="absolute inset-0 bg-primary-200 dark:bg-primary-900 rounded-full blur-xl opacity-50 animate-pulse"></div>
        <Loader2 className="h-12 w-12 text-primary-500 animate-spin relative z-10" />
      </div>
      {message && (
        <p className="mt-4 text-gray-500 dark:text-gray-400 font-medium">
          {message}
        </p>
      )}
    </div>
  );
};

export default Loader;
