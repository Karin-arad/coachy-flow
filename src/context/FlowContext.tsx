
import React, { createContext, useContext, useState, ReactNode } from 'react';

type EmotionRatings = {
  bounciness: number;
  energy: number;
  alertness: number;
  lightness: number;
};

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
  goToNextScreen: () => void;
  goToPreviousScreen: () => void;
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

  const goToNextScreen = () => {
    setCurrentScreen((prev) => Math.min(prev + 1, 4));
    setCurrentSlider(0); // Reset slider index when moving to a new screen
  };

  const goToPreviousScreen = () => {
    setCurrentScreen((prev) => Math.max(prev - 1, 1));
    setCurrentSlider(0); // Reset slider index when moving to a new screen
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
        goToNextScreen,
        goToPreviousScreen,
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
