
import React from 'react';
import { FlowProvider, useFlowContext } from '@/context/FlowContext';
import EmotionalPrompt from '@/components/EmotionalPrompt';
import EmotionalRating from '@/components/EmotionalRating';
import TimeAvailability from '@/components/TimeAvailability';
import PracticeSummary from '@/components/PracticeSummary';
import ProgressBar from '@/components/ProgressBar';

const CoachyFlow = () => {
  const { currentScreen } = useFlowContext();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FCE4EC] via-[#F7D4E4] to-[#F5C6D7] py-8">
      <div className="container px-4 py-12 flex flex-col items-center">
        <div className="w-full max-w-md">
          <ProgressBar currentStep={currentScreen} totalSteps={4} />
        </div>
        
        <div className="relative w-full mt-6 flex justify-center min-h-[500px]">
          <EmotionalPrompt />
          <EmotionalRating />
          <TimeAvailability />
          <PracticeSummary />
        </div>
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <FlowProvider>
      <CoachyFlow />
    </FlowProvider>
  );
};

export default Index;
