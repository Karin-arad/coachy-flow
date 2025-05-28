
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
    
    // Enhanced debugging for iOS conversation screen
    console.log('🔍 Main Flow Debug:');
    console.log('- Current screen:', currentScreen);
    console.log('- Is mobile:', isMobile);
    console.log('- Should show conversation:', currentScreen === 5);
    
    // iOS-specific debugging
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    if (isIOS && currentScreen === 5) {
      console.log('📱 iOS Conversation Screen Check:');
      setTimeout(() => {
        const conversationElements = document.querySelectorAll('.ios-conversation-screen-container');
        console.log('- Conversation containers found:', conversationElements.length);
        conversationElements.forEach((el, index) => {
          const styles = getComputedStyle(el);
          console.log(`- Container ${index}:`, {
            display: styles.display,
            visibility: styles.visibility,
            opacity: styles.opacity,
            height: styles.height,
            transform: styles.transform
          });
        });
      }, 300);
    }
  }, [currentScreen]);

  const getCurrentStepForProgressBar = () => {
    switch(currentScreen) {
      case 1: return 1;
      case 2: return 2;  
      case 3: return 3;
      case 4: return 4;
      case 5: return 5;
      case 6: return 6;
      case 7: return 7;
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
