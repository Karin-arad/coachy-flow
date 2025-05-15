
import React from 'react';
import { useFlowContext } from '@/context/FlowContext';
import AnimatedCard from './AnimatedCard';

const PracticeSummary = () => {
  const { currentScreen } = useFlowContext();

  return (
    <AnimatedCard 
      isVisible={currentScreen === 5} 
      className="h-full w-full"
    >
      <div className="h-full flex flex-col justify-center items-center p-4 text-center">
        <h2 className="text-2xl font-semibold mb-4">Your Practice Summary</h2>
        <p className="text-gray-600 mb-8">
          Based on how you're feeling, here's a personalized practice for you.
        </p>
        {/* Content for the practice summary will be added here */}
        <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Video recommendation will appear here</p>
        </div>
      </div>
    </AnimatedCard>
  );
};

export default PracticeSummary;
