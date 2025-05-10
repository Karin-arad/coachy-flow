
import React, { createContext, useContext, useState } from 'react';
import { toast } from '@/hooks/use-toast';

type CelebrationType = 'confetti' | 'fireworks' | 'stars' | 'emoji' | 'colorful-fireworks' | '';

interface EmotionRatings {
  energy: number;
  bounciness: number;
  alertness: number;
  lightness: number;
}

interface FlowContextType {
  currentScreen: number;
  currentEmotionQuestion: number;
  setCurrentEmotionQuestion: (step: number) => void;
  goToNextScreen: () => void;
  freeTextEmotion: string;
  setFreeTextEmotion: (text: string) => void;
  emotionRatings: EmotionRatings;
  setEmotionRatings: (ratings: EmotionRatings) => void;
  timeAvailable: string;
  setTimeAvailable: (time: string) => void;
  celebrationType: CelebrationType;
  isCelebrating: boolean;
  triggerCelebration: (type: CelebrationType) => void;
}

export const FlowContext = createContext<FlowContextType>({
  currentScreen: 2,
  currentEmotionQuestion: 1,
  setCurrentEmotionQuestion: () => {},
  goToNextScreen: () => {},
  freeTextEmotion: '',
  setFreeTextEmotion: () => {},
  emotionRatings: { energy: 5, bounciness: 5, alertness: 5, lightness: 5 },
  setEmotionRatings: () => {},
  timeAvailable: '',
  setTimeAvailable: () => {},
  celebrationType: '',
  isCelebrating: false,
  triggerCelebration: () => {}
});

export const useFlowContext = () => useContext(FlowContext);

export const FlowProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<number>(2); // Starts at emotional rating
  const [currentEmotionQuestion, setCurrentEmotionQuestion] = useState<number>(1);
  const [freeTextEmotion, setFreeTextEmotion] = useState<string>('');
  const [emotionRatings, setEmotionRatings] = useState<EmotionRatings>({
    energy: 5,
    bounciness: 5,
    alertness: 5,
    lightness: 5
  });
  const [timeAvailable, setTimeAvailable] = useState<string>('');
  const [celebrationType, setCelebrationType] = useState<CelebrationType>('');
  const [isCelebrating, setIsCelebrating] = useState<boolean>(false);
  
  const goToNextScreen = () => {
    if (currentScreen < 4) {
      setCurrentScreen(currentScreen + 1);
      
      toast({
        title: 'מעבר לשלב הבא',
        description: 'נתוני התחושה שלך נשמרו בהצלחה',
      });
    }
  };
  
  const triggerCelebration = (type: CelebrationType) => {
    if (isCelebrating) return; // Prevent overlapping celebrations
    
    setCelebrationType(type);
    setIsCelebrating(true);
    
    setTimeout(() => {
      setIsCelebrating(false);
      setCelebrationType('');
    }, 3000);
  };
  
  return (
    <FlowContext.Provider 
      value={{
        currentScreen,
        currentEmotionQuestion,
        setCurrentEmotionQuestion,
        goToNextScreen,
        freeTextEmotion,
        setFreeTextEmotion,
        emotionRatings,
        setEmotionRatings,
        timeAvailable,
        setTimeAvailable,
        celebrationType,
        isCelebrating,
        triggerCelebration
      }}
    >
      {children}
    </FlowContext.Provider>
  );
};
