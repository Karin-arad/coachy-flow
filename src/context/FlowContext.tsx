import React, { createContext, useContext, useState, useEffect } from 'react';
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
  // Add the missing properties
  currentSlider: number;
  goToNextSlider: () => void;
  goToPreviousSlider: () => void;
  maxSliderValue: number;
  // New workout preferences field
  workoutPreferences: string;
  setWorkoutPreferences: (preferences: string) => void;
  // User conversation
  userConversation: string;
  setUserConversation: (conversation: string) => void;
  // Navigate to specific screen
  goToScreen: (screen: number) => void;
}

export const FlowContext = createContext<FlowContextType>({
  currentScreen: 2, // Start with EmotionalRatingNew screen instead of Conversation
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
  triggerCelebration: () => {},
  // Initialize new properties
  currentSlider: 0,
  goToNextSlider: () => {},
  goToPreviousSlider: () => {},
  maxSliderValue: 10,
  // New workout preferences field initialization
  workoutPreferences: '',
  setWorkoutPreferences: () => {},
  // Initialize user conversation
  userConversation: '',
  setUserConversation: () => {},
  // Initialize goToScreen
  goToScreen: () => {},
});

export const useFlowContext = () => useContext(FlowContext);

export const FlowProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  // Start at screen 2 (EmotionalRatingNew) instead of screen 1 (Conversation)
  const [currentScreen, setCurrentScreen] = useState<number>(2);
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
  
  // Add new state variables for slider functionality
  const [currentSlider, setCurrentSlider] = useState<number>(0);
  const maxSliderValue = 10;
  
  // Add new workout preferences state
  const [workoutPreferences, setWorkoutPreferences] = useState<string>('');
  
  // Add new user conversation state
  const [userConversation, setUserConversation] = useState<string>('');
  
  useEffect(() => {
    console.log('Flow context: currentScreen updated to', currentScreen);
  }, [currentScreen]);
  
  const goToNextScreen = () => {
    console.log('Going to next screen from', currentScreen);
    // Updated bounds: now goes from screen 2 to 5 (removed screen 1)
    if (currentScreen >= 2 && currentScreen < 5) {
      const newScreen = currentScreen + 1;
      console.log(`Changing screen from ${currentScreen} to ${newScreen}`);
      
      setCurrentScreen(prev => {
        console.log(`Actually setting screen from ${prev} to ${newScreen}`);
        return newScreen;
      });
      
      console.log(`Screen update queued: ${currentScreen} -> ${newScreen}`);
      
      toast({
        title: 'מעבר לשלב הבא',
        description: 'נתוני התחושה שלך נשמרו בהצלחה',
      });
    }
  };
  
  // Add function to go to specific screen
  const goToScreen = (screen: number) => {
    // Updated bounds: screens 2-5 are valid (removed screen 1)
    if (screen >= 2 && screen <= 5) {
      console.log(`Navigating directly to screen ${screen}`);
      setCurrentScreen(screen);
    }
  };
  
  // Add new functions for slider navigation
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
        triggerCelebration,
        // Add new values to the context
        currentSlider,
        goToNextSlider,
        goToPreviousSlider,
        maxSliderValue,
        // Add workout preferences to context
        workoutPreferences,
        setWorkoutPreferences,
        // Add user conversation to context
        userConversation,
        setUserConversation,
        // Add goToScreen function
        goToScreen,
      }}
    >
      {children}
    </FlowContext.Provider>
  );
};
