
import React from 'react';
import { FlowProvider, useFlowContext } from '@/context/FlowContext';
import EmotionalPrompt from '@/components/EmotionalPrompt';
import EmotionalRating from '@/components/EmotionalRating';
import TimeAvailability from '@/components/TimeAvailability';
import PracticeSummary from '@/components/PracticeSummary';
import ProgressBar from '@/components/ProgressBar';
import { motion, AnimatePresence } from 'framer-motion';

const CoachyFlow = () => {
  const { currentScreen } = useFlowContext();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#f8f9fa] to-white py-8 app-background">
      <div className="container px-4 py-12 flex flex-col items-center">
        <div className="w-full max-w-md">
          <ProgressBar currentStep={currentScreen} totalSteps={4} />
        </div>
        
        <div className="relative w-full mt-6 flex justify-center min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScreen}
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(10px)" }}
              transition={{ duration: 0.6 }}
              className="w-full"
            >
              {currentScreen === 1 && <EmotionalPrompt />}
              {currentScreen === 2 && <EmotionalRating />}
              {currentScreen === 3 && <TimeAvailability />}
              {currentScreen === 4 && <PracticeSummary />}
            </motion.div>
          </AnimatePresence>
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
