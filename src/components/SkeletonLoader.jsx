import React from 'react';

const SkeletonLoader = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 h-[320px] animate-pulse">
          <div className="w-full h-48 bg-gray-200 dark:bg-gray-700"></div>
          <div className="p-5 flex flex-col gap-3">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-md w-3/4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-1/2 mt-auto"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
