
import React, { useState, useEffect, useCallback } from 'react';
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
import OpeningScreen from '@/components/OpeningScreen';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { preloadSounds } from '@/utils/soundEffects';

const QuizFlow = () => {
  const { currentScreen, celebrationType, isCelebrating } = useFlowContext();
  const isMobile = useIsMobile();
  // The opening plays on every visit, then hands over to the first question
  const [opening, setOpening] = useState(true);
  const endOpening = useCallback(() => setOpening(false), []);
  
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
  
  if (opening) {
    return (
      <div className="app-container">
        <div className="flow-container">
          <OpeningScreen onDone={endOpening} />
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="flow-container">
        <CelebrationEffects
          effectType={celebrationType}
          active={isCelebrating}
          duration={1500}
        />

        <header className="flow-header">
          <span aria-hidden="true" />
          <ProgressBar currentStep={getCurrentStepForProgressBar()} totalSteps={7} />
          <InstallButton />
        </header>

        <motion.main
          key={currentScreen}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="flow-main"
        >
          {renderCurrentScreen()}
        </motion.main>
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <FlowProvider>
      <QuizFlow />
    </FlowProvider>
  );
};

export default Index;
