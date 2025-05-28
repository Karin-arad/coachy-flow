
import React, { useState, useEffect } from 'react';
import { FlowProvider, useFlowContext } from '@/context/FlowContext';
import BouncinessScreen from '@/components/BouncinessScreen';
import EnergyScreen from '@/components/EnergyScreen';
import AlertnessScreen from '@/components/AlertnessScreen';
import LightnessScreen from '@/components/LightnessScreen';
import ConversationScreen from '@/components/ConversationScreen';
import TimeAvailability from '@/components/TimeAvailability';
import PracticeSummary from '@/components/PracticeSummary';
import ProgressBar from '@/components/ProgressBar';
import CelebrationEffects from '@/components/CelebrationEffects';
import InstallButton from '@/components/InstallButton';
import { motion } from 'framer-motion';
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import APIKeyInput from '@/components/APIKeyInput';
import { cn } from '@/lib/utils';
import { preloadSounds } from '@/utils/soundEffects';

const CoachyFlow = () => {
  const { currentScreen, celebrationType, isCelebrating } = useFlowContext();
  const isMobile = useIsMobile();
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  
  useEffect(() => {
    // Preload sounds on component mount
    preloadSounds();
    
    // Debug the current screen
    console.log('Current screen in CoachyFlow:', currentScreen);
  }, [currentScreen]);

  // Calculate current step based on screen number
  const getCurrentStepForProgressBar = () => {
    switch(currentScreen) {
      case 1: return 1; // BouncinessScreen
      case 2: return 2; // EnergyScreen  
      case 3: return 3; // AlertnessScreen
      case 4: return 4; // LightnessScreen
      case 5: return 5; // ConversationScreen
      case 6: return 6; // TimeAvailability
      case 7: return 7; // PracticeSummary
      default: return 1;
    }
  };
  
  return (
    <div className="min-h-screen w-full flex flex-col bg-white overflow-auto">
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
      
      <div className="flex-1 flex flex-col items-center justify-start px-6 py-6 w-full max-w-md mx-auto">
        <div className="w-full mb-6">
          <ProgressBar currentStep={getCurrentStepForProgressBar()} totalSteps={7} />
        </div>
        
        <div className="w-full flex-1 flex justify-center items-start min-h-[500px]">
          <BouncinessScreen />
          <EnergyScreen />
          <AlertnessScreen />
          <LightnessScreen />
          <ConversationScreen />
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
