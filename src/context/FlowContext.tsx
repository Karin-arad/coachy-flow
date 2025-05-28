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
  currentSlider: number;
  goToNextSlider: () => void;
  goToPreviousSlider: () => void;
  maxSliderValue: number;
  workoutPreferences: string;
  setWorkoutPreferences: (preferences: string) => void;
  userConversation: string;
  setUserConversation: (conversation: string) => void;
  goToScreen: (screen: number) => void;
}

export const FlowContext = createContext<FlowContextType>({
  currentScreen: 1,
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
  currentSlider: 0,
  goToNextSlider: () => {},
  goToPreviousSlider: () => {},
  maxSliderValue: 10,
  workoutPreferences: '',
  setWorkoutPreferences: () => {},
  userConversation: '',
  setUserConversation: () => {},
  goToScreen: () => {},
});

export const useFlowContext = () => useContext(FlowContext);

export const FlowProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<number>(1);
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
  const [currentSlider, setCurrentSlider] = useState<number>(0);
  const maxSliderValue = 10;
  const [workoutPreferences, setWorkoutPreferences] = useState<string>('');
  const [userConversation, setUserConversation] = useState<string>('');
  
  // Enhanced iOS debugging
  useEffect(() => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    console.log('🔍 Enhanced Flow Debug:');
    console.log('- Current Screen:', currentScreen);
    console.log('- Is iOS:', isIOS);
    console.log('- User Agent:', navigator.userAgent);
    console.log('- Viewport:', window.innerWidth, 'x', window.innerHeight);
    console.log('- Screen orientation:', screen.orientation?.type || 'unknown');
    
    // Log navigation history for debugging
    if (window.navigationHistory) {
      console.log('- Navigation History:', window.navigationHistory);
    } else {
      window.navigationHistory = [currentScreen];
    }
  }, [currentScreen]);
  
  const goToNextScreen = () => {
    console.log('🚀 Navigation Debug - Current screen:', currentScreen);
    
    // Track navigation history
    if (!window.navigationHistory) {
      window.navigationHistory = [];
    }
    window.navigationHistory.push(currentScreen);
    
    // Enhanced validation - ensure we don't skip screen 5
    let nextScreen: number;
    
    switch(currentScreen) {
      case 1: // Bounciness -> Energy
        nextScreen = 2;
        break;
      case 2: // Energy -> Alertness  
        nextScreen = 3;
        break;
      case 3: // Alertness -> Lightness
        nextScreen = 4;
        break;
      case 4: // Lightness -> Conversation (MUST go to 5)
        nextScreen = 5;
        console.log('🔒 ENFORCING navigation from Lightness (4) to Conversation (5)');
        break;
      case 5: // Conversation -> Time
        nextScreen = 6;
        break;
      case 6: // Time -> Practice
        nextScreen = 7;
        break;
      default:
        console.warn('⚠️ Unexpected screen:', currentScreen);
        nextScreen = Math.min(currentScreen + 1, 7);
        break;
    }
    
    console.log(`✅ Navigation: ${currentScreen} -> ${nextScreen}`);
    
    setCurrentScreen(nextScreen);
    
    // iOS-specific navigation logging
    setTimeout(() => {
      console.log('📱 Post-navigation iOS check:');
      console.log('- Screen after navigation:', nextScreen);
      console.log('- ConversationScreen should render:', nextScreen === 5);
    }, 100);
    
    toast({
      title: 'מעבר לשלב הבא',
      description: `עברנו לשלב ${nextScreen}`,
    });
  };
  
  const goToScreen = (screen: number) => {
    if (screen >= 1 && screen <= 7) {
      console.log(`🎯 Direct navigation to screen ${screen}`);
      
      // Track navigation history
      if (!window.navigationHistory) {
        window.navigationHistory = [];
      }
      window.navigationHistory.push(currentScreen);
      
      setCurrentScreen(screen);
      
      // Special handling for conversation screen on iOS
      if (screen === 5) {
        console.log('📱 Special iOS handling for conversation screen');
        setTimeout(() => {
          const conversationElement = document.querySelector('.ios-conversation-fix');
          if (conversationElement) {
            console.log('✅ Conversation element found:', conversationElement);
          } else {
            console.warn('❌ Conversation element not found after navigation');
          }
        }, 200);
      }
    }
  };
  
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
    if (isCelebrating) return;
    
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
        currentSlider,
        goToNextSlider,
        goToPreviousSlider,
        maxSliderValue,
        workoutPreferences,
        setWorkoutPreferences,
        userConversation,
        setUserConversation,
        goToScreen,
      }}
    >
      {children}
    </FlowContext.Provider>
  );
};

// Add global navigation history tracking
declare global {
  interface Window {
    navigationHistory: number[];
  }
}
