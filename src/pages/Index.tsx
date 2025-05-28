
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
import IOSDebugInfo from '@/components/IOSDebugInfo';
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
    preloadSounds();
    
    // Enhanced navigation debugging
    console.log('🔍 Main Flow Navigation Debug:');
    console.log('- Current screen:', currentScreen);
    console.log('- Is mobile:', isMobile);
    console.log('- Navigation history:', window.navigationHistory || []);
    
    // iOS-specific debugging
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    if (isIOS) {
      console.log('📱 iOS Navigation Check:');
      console.log('- User Agent:', navigator.userAgent);
      console.log('- Viewport:', window.innerWidth, 'x', window.innerHeight);
      console.log('- Screen orientation:', screen.orientation?.type || 'unknown');
    }
  }, [currentScreen]);

  const getCurrentStepForProgressBar = () => {
    return Math.max(1, Math.min(currentScreen, 7));
  };
  
  // Single screen rendering logic - only render the active screen
  const renderCurrentScreen = () => {
    console.log('🎯 Rendering screen:', currentScreen);
    
    switch (currentScreen) {
      case 1:
        return <BouncinessScreen />;
      case 2:
        return <EnergyScreen />;
      case 3:
        return <AlertnessScreen />;
      case 4:
        return <LightnessScreen />;
      case 5:
        console.log('📱 EXPLICITLY rendering ConversationScreen');
        return <ConversationScreen />;
      case 6:
        return <TimeAvailability />;
      case 7:
        return <PracticeSummary />;
      default:
        console.warn('⚠️ Unknown screen:', currentScreen, 'defaulting to screen 1');
        return <BouncinessScreen />;
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
      <IOSDebugInfo />
      
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
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
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
