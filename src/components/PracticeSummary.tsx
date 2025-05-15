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
      {/* Existing content */}
    </AnimatedCard>
  );
};

export default PracticeSummary;
