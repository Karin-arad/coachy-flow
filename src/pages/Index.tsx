
import React from 'react';
import { FlowProvider, useFlowContext } from '@/context/FlowContext';
import EmotionalRatingNew from '@/components/EmotionalRatingNew';
import TimeAvailability from '@/components/TimeAvailability';
import PracticeSummary from '@/components/PracticeSummary';
import ProgressBar from '@/components/ProgressBar';
import CelebrationEffects from '@/components/CelebrationEffects';
import InstallButton from '@/components/InstallButton';
import { motion } from 'framer-motion';
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { useState } from 'react';
import APIKeyInput from '@/components/APIKeyInput';
import { cn } from '@/lib/utils';

const CoachyFlow = () => {
  const { currentScreen, celebrationType, isCelebrating } = useFlowContext();
  const isMobile = useIsMobile();
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  
  const renderCurrentScreen = () => {
    switch(currentScreen) {
      case 2:
        return <EmotionalRatingNew />;
      case 3:
        return <TimeAvailability />;
      case 4:
        return <PracticeSummary />;
      default:
        return <EmotionalRatingNew />;
    }
  };
  
  return (
    <div className={cn(
      "h-screen w-screen flex flex-col bg-white",
      "overflow-hidden aspect-[9/16] max-w-[430px] min-w-[320px] mx-auto"
    )}>
      <CelebrationEffects 
        effectType={celebrationType} 
        active={isCelebrating} 
        duration={1500}
      />
      
      <InstallButton />
      
      {showApiKeyModal && <APIKeyInput onClose={() => setShowApiKeyModal(false)} />}
      
      <Button 
        variant="outline"
        onClick={() => setShowApiKeyModal(true)}
        className="text-xs px-3 py-1 h-8 bg-white/80 border border-gray-200 shadow-sm hover:bg-white fixed bottom-5 left-5 z-50 rtl:left-auto rtl:right-5"
        size="sm"
      >
        <Settings className="h-4 w-4 mr-1" /> הגדרות
      </Button>
      
      <div className="flex-1 flex flex-col items-center justify-start px-side-padding py-vertical-gap w-full">
        <div className="w-full">
          <ProgressBar currentStep={currentScreen - 1} totalSteps={3} />
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
