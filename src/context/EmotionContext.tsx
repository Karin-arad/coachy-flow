
import React, { createContext, useContext, useState } from 'react';
import { EmotionRatings } from '@/types/flow';

interface EmotionContextType {
  currentEmotionQuestion: number;
  setCurrentEmotionQuestion: (step: number) => void;
  freeTextEmotion: string;
  setFreeTextEmotion: (text: string) => void;
  emotionRatings: EmotionRatings;
  setEmotionRatings: (ratings: EmotionRatings) => void;
  currentSlider: number;
  goToNextSlider: () => void;
  goToPreviousSlider: () => void;
  maxSliderValue: number;
}

const EmotionContext = createContext<EmotionContextType>({
  currentEmotionQuestion: 1,
  setCurrentEmotionQuestion: () => {},
  freeTextEmotion: '',
  setFreeTextEmotion: () => {},
  emotionRatings: { energy: 5, bounciness: 5, alertness: 5, lightness: 5 },
  setEmotionRatings: () => {},
  currentSlider: 0,
  goToNextSlider: () => {},
  goToPreviousSlider: () => {},
  maxSliderValue: 10,
});

export const useEmotionContext = () => useContext(EmotionContext);

export const EmotionProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [currentEmotionQuestion, setCurrentEmotionQuestion] = useState<number>(1);
  const [freeTextEmotion, setFreeTextEmotion] = useState<string>('');
  const [emotionRatings, setEmotionRatings] = useState<EmotionRatings>({
    energy: 5,
    bounciness: 5,
    alertness: 5,
    lightness: 5
  });
  const [currentSlider, setCurrentSlider] = useState<number>(0);
  const maxSliderValue = 10;
  
  const goToNextSlider = () => {
    if (currentSlider < 3) {
      setCurrentSlider(currentSlider + 1);
    }
  };
  
  const goToPreviousSlider = () => {
    if (currentSlider > 0) {
      setCurrentSlider(currentSlider - 1);
    }
  };
  
  return (
    <EmotionContext.Provider 
      value={{
        currentEmotionQuestion,
        setCurrentEmotionQuestion,
        freeTextEmotion,
        setFreeTextEmotion,
        emotionRatings,
        setEmotionRatings,
        currentSlider,
        goToNextSlider,
        goToPreviousSlider,
        maxSliderValue,
      }}
    >
      {children}
    </EmotionContext.Provider>
  );
};
