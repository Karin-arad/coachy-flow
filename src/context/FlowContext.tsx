
import React, { createContext, useContext, useState, ReactNode } from 'react';

type EmotionRatings = {
  bounciness: number;
  energy: number;
  alertness: number;
  lightness: number;
};

type CelebrationType = 'confetti' | 'fireworks' | 'stars' | 'emoji' | 'colorful-fireworks' | '';

type FlowContextType = {
  currentScreen: number;
  setCurrentScreen: (screen: number) => void;
  currentSlider: number;
  setCurrentSlider: (slider: number) => void;
  freeTextEmotion: string;
  setFreeTextEmotion: (text: string) => void;
  emotionRatings: EmotionRatings;
  setEmotionRatings: (ratings: EmotionRatings) => void;
  timeAvailable: string;
  setTimeAvailable: (time: string) => void;
  celebrationType: CelebrationType;
  setCelebrationType: (type: CelebrationType) => void;
  isCelebrating: boolean;
  setIsCelebrating: (isActive: boolean) => void;
  goToNextScreen: () => void;
  goToPreviousScreen: () => void;
  triggerCelebration: (type: CelebrationType) => void;
};

const defaultEmotionRatings: EmotionRatings = {
  bounciness: 4,
  energy: 4,
  alertness: 4,
  lightness: 4,
};

const FlowContext = createContext<FlowContextType | undefined>(undefined);

export const FlowProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState(1);
  const [currentSlider, setCurrentSlider] = useState(0);
  const [freeTextEmotion, setFreeTextEmotion] = useState('');
  const [emotionRatings, setEmotionRatings] = useState<EmotionRatings>(defaultEmotionRatings);
  const [timeAvailable, setTimeAvailable] = useState('');
  const [celebrationType, setCelebrationType] = useState<CelebrationType>('');
  const [isCelebrating, setIsCelebrating] = useState(false);

  const goToNextScreen = () => {
    // Trigger a celebration when advancing to the next screen
    const celebrations: CelebrationType[] = ['confetti', 'fireworks', 'stars', 'emoji', 'colorful-fireworks'];
    const nextScreen = Math.min(currentScreen + 1, 4);
    
    // Only trigger celebration if we're advancing to a new screen
    if (nextScreen > currentScreen) {
      triggerCelebration(celebrations[nextScreen % celebrations.length]);
    }
    
    setCurrentScreen(nextScreen);
    setCurrentSlider(0); // Reset slider index when moving to a new screen
  };

  const goToPreviousScreen = () => {
    setCurrentScreen((prev) => Math.max(prev - 1, 1));
    setCurrentSlider(0); // Reset slider index when moving to a new screen
  };
  
  const triggerCelebration = (type: CelebrationType) => {
    setCelebrationType(type);
    setIsCelebrating(true);
    
    // Auto-disable celebration after 2 seconds
    setTimeout(() => {
      setIsCelebrating(false);
    }, 2000);
  };

  return (
    <FlowContext.Provider
      value={{
        currentScreen,
        setCurrentScreen,
        currentSlider,
        setCurrentSlider,
        freeTextEmotion,
        setFreeTextEmotion,
        emotionRatings,
        setEmotionRatings,
        timeAvailable,
        setTimeAvailable,
        celebrationType,
        setCelebrationType,
        isCelebrating,
        setIsCelebrating,
        goToNextScreen,
        goToPreviousScreen,
        triggerCelebration,
      }}
    >
      {children}
    </FlowContext.Provider>
  );
};

export const useFlowContext = (): FlowContextType => {
  const context = useContext(FlowContext);
  if (context === undefined) {
    throw new Error('useFlowContext must be used within a FlowProvider');
  }
  return context;
};
