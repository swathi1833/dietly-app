
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-emerald-500"></div>
        <p className="text-emerald-700 font-semibold">Generating your personalized meal plan...</p>
        <p className="text-gray-500 text-sm">This may take a moment.</p>
    </div>
  );
};

export default LoadingSpinner;
