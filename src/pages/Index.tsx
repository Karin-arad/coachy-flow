
import React from 'react';
import { FlowProvider, useFlowContext } from '@/context/FlowContext';
import EmotionalPrompt from '@/components/EmotionalPrompt';
import EmotionalRating from '@/components/EmotionalRating';
import TimeAvailability from '@/components/TimeAvailability';
import PracticeSummary from '@/components/PracticeSummary';
import ProgressBar from '@/components/ProgressBar';
import CelebrationEffects from '@/components/CelebrationEffects';
import { motion } from 'framer-motion';

const CoachyFlow = () => {
  const { currentScreen, celebrationType, isCelebrating } = useFlowContext();
  
  // Function to render the current screen component
  const renderCurrentScreen = () => {
    switch(currentScreen) {
      case 1:
        return <EmotionalPrompt />;
      case 2:
        return <EmotionalRating />;
      case 3:
        return <TimeAvailability />;
      case 4:
        return <PracticeSummary />;
      default:
        return <EmotionalPrompt />;
    }
  };
  
  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-white via-[#f8f9fa] to-white py-8 app-background">
      {/* Global celebration effects */}
      <CelebrationEffects 
        effectType={celebrationType} 
        active={isCelebrating} 
        duration={1500} // Reduced from 2500
      />
      
      <div className="container h-full px-4 py-6 flex flex-col items-center">
        <div className="w-full max-w-md">
          <ProgressBar currentStep={currentScreen} totalSteps={4} />
        </div>
        
        <div className="relative w-full mt-4 flex justify-center flex-1 overflow-hidden">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, filter: "blur(5px)" }} // Reduced blur
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(5px)" }} // Reduced blur
            transition={{ duration: 0.4 }} // Reduced from 0.6
            className="w-full h-full flex items-center justify-center"
          >
            {renderCurrentScreen()}
          </motion.div>
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
