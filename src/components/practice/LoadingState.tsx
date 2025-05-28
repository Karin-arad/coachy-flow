
import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingState = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <Loader2 className="h-10 w-10 text-coachy-blue animate-spin" />
      <p className="text-gray-600">Crafting your perfect practice...</p>
    </div>
  );
};

export default LoadingState;
