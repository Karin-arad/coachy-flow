
import React, { useState, useEffect } from 'react';
import { FlowProvider, useFlowContext } from '@/context/FlowContext';
import Conversation from '@/components/Conversation';
import EmotionalRatingNew from '@/components/EmotionalRatingNew';
import TimeAvailability from '@/components/TimeAvailability';
import PracticeSummary from '@/components/PracticeSummary';
import WorkoutPreferences from '@/components/WorkoutPreferences';
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
import { Link } from 'react-router-dom';

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
      case 1: return 1; // Conversation
      case 2: return 2; // EmotionalRating
      case 3: return 3; // WorkoutPreferences
      case 4: return 4; // TimeAvailability
      case 5: return 5; // PracticeSummary
      default: return 1;
    }
  };
  
  // All screens are rendered at once, but each component has its own visibility check
  // This ensures that screen transitions work correctly
  return (
    <div className="min-h-screen w-full flex flex-col bg-white overflow-auto">
      <CelebrationEffects 
        effectType={celebrationType} 
        active={isCelebrating} 
        duration={1500}
      />
      
      <InstallButton />
      
      {showApiKeyModal && <APIKeyInput onClose={() => setShowApiKeyModal(false)} />}
      
      <div className="fixed top-5 right-5 z-50">
        <Link to="/conversation">
          <Button size="sm" variant="outline" className="text-xs px-3 py-1 h-8 bg-white/80 border border-gray-200 shadow-sm hover:bg-white">
            New Conversation
          </Button>
        </Link>
      </div>
      
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
          <ProgressBar currentStep={getCurrentStepForProgressBar()} totalSteps={5} />
        </div>
        
        <div className="w-full flex-1 flex justify-center items-start min-h-[500px]">
          {/* Each component handles its own visibility based on currentScreen */}
          <Conversation />
          <EmotionalRatingNew />
          <WorkoutPreferences />
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
