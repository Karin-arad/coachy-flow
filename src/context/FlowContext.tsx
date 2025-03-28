
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
  goToNextSlider: () => void;
  goToPreviousSlider: () => void;
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

  // Helper function to get a random celebration type
  const getRandomCelebration = (): CelebrationType => {
    const celebrations: CelebrationType[] = ['confetti', 'fireworks', 'stars', 'emoji', 'colorful-fireworks'];
    return celebrations[Math.floor(Math.random() * celebrations.length)];
  };

  const goToNextScreen = () => {
    const nextScreen = Math.min(currentScreen + 1, 4);
    
    // Only trigger celebration if we're advancing to a new screen
    if (nextScreen > currentScreen) {
      triggerCelebration(getRandomCelebration());
    }
    
    setCurrentScreen(nextScreen);
    setCurrentSlider(0); // Reset slider index when moving to a new screen
  };

  const goToPreviousScreen = () => {
    setCurrentScreen((prev) => Math.max(prev - 1, 1));
    setCurrentSlider(0); // Reset slider index when moving to a new screen
  };
  
  const goToNextSlider = () => {
    if (currentScreen === 2) { // Only on the emotional rating screen
      // Trigger celebration between slider transitions
      triggerCelebration('confetti');
      setCurrentSlider(prev => Math.min(prev + 1, 3));
    }
  };
  
  const goToPreviousSlider = () => {
    if (currentScreen === 2) { // Only on the emotional rating screen
      setCurrentSlider(prev => Math.max(prev - 1, 0));
    }
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
        goToNextSlider,
        goToPreviousSlider,
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
