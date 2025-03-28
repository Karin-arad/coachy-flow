
import React from 'react';
import { FlowProvider, useFlowContext } from '@/context/FlowContext';
import EmotionalPrompt from '@/components/EmotionalPrompt';
import EmotionalRating from '@/components/EmotionalRating';
import TimeAvailability from '@/components/TimeAvailability';
import PracticeSummary from '@/components/PracticeSummary';
import ProgressBar from '@/components/ProgressBar';
import CelebrationEffects from '@/components/CelebrationEffects';
import { motion } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area';

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
    <div className="h-screen flex flex-col bg-gradient-to-br from-white via-[#f8f9fa] to-white app-background">
      {/* Global celebration effects */}
      <CelebrationEffects 
        effectType={celebrationType} 
        active={isCelebrating} 
        duration={1500}
      />
      
      <div className="flex-1 flex flex-col items-center justify-start px-4 py-6">
        <div className="w-full max-w-md mb-4">
          <ProgressBar currentStep={currentScreen} totalSteps={4} />
        </div>
        
        <div className="w-full flex-1 flex justify-center items-center">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, filter: "blur(5px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(5px)" }}
            transition={{ duration: 0.4 }}
            className="w-full flex items-center justify-center"
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
