
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { toast } from '@/hooks/use-toast';

interface NavigationContextType {
  currentScreen: number;
  goToNextScreen: () => void;
  goToScreen: (screen: number) => void;
}

const NavigationContext = createContext<NavigationContextType>({
  currentScreen: 1,
  goToNextScreen: () => {},
  goToScreen: () => {},
});

export const useNavigationContext = () => useContext(NavigationContext);

export const NavigationProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<number>(1);
  
  // Debounce mechanism to prevent multiple rapid navigation calls
  const navigationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastNavigationTimeRef = useRef<number>(0);
  
  // Enhanced debugging
  useEffect(() => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const timestamp = new Date().toLocaleTimeString();
    
    console.log('🔍 Enhanced Flow Debug:', {
      currentScreen,
      isIOS,
      timestamp,
      userAgent: navigator.userAgent,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      orientation: screen.orientation?.type || 'unknown'
    });
    
    // Initialize navigation history
    if (!window.navigationHistory) {
      window.navigationHistory = [currentScreen];
    }
    
    // Log screen transitions
    if (window.navigationHistory[window.navigationHistory.length - 1] !== currentScreen) {
      window.navigationHistory.push(currentScreen);
      console.log('📊 Navigation History Updated:', window.navigationHistory);
    }
  }, [currentScreen]);
  
  const goToNextScreen = () => {
    const now = Date.now();
    const timeSinceLastNavigation = now - lastNavigationTimeRef.current;
    
    // Debounce rapid navigation calls (prevent within 500ms)
    if (timeSinceLastNavigation < 500) {
      console.log('🚫 Navigation debounced - too rapid');
      return;
    }
    
    // Clear any existing timeout
    if (navigationTimeoutRef.current) {
      clearTimeout(navigationTimeoutRef.current);
    }
    
    console.log('🚀 Navigation Debug - Current screen:', currentScreen);
    console.log('📱 User Agent:', navigator.userAgent);
    
    lastNavigationTimeRef.current = now;
    
    // Enhanced validation with explicit screen 5 handling
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
        console.log('🔒 ENFORCED navigation from Lightness (4) to Conversation (5)');
        break;
      case 5: // Conversation -> Time
        nextScreen = 6;
        console.log('✅ Navigation from Conversation (5) to Time (6)');
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
    
    // Delayed state update to ensure proper rendering
    navigationTimeoutRef.current = setTimeout(() => {
      setCurrentScreen(nextScreen);
      
      // Post-navigation verification
      setTimeout(() => {
        console.log('📱 Post-navigation verification:');
        console.log('- Screen after navigation:', nextScreen);
        console.log('- ConversationScreen should render:', nextScreen === 5);
        
        if (nextScreen === 5) {
          console.log('🍎 Special iOS conversation screen verification');
          const conversationElements = document.querySelectorAll('.ios-conversation-screen-container');
          console.log('- Conversation containers found:', conversationElements.length);
        }
      }, 200);
    }, 50);
    
    toast({
      title: 'מעבר לשלב הבא',
      description: `עברנו לשלב ${nextScreen}`,
    });
  };
  
  const goToScreen = (screen: number) => {
    if (screen >= 1 && screen <= 7) {
      const now = Date.now();
      lastNavigationTimeRef.current = now;
      
      console.log(`🎯 Direct navigation to screen ${screen}`);
      
      // Update navigation history
      if (!window.navigationHistory) {
        window.navigationHistory = [];
      }
      window.navigationHistory.push(currentScreen);
      
      setCurrentScreen(screen);
      
      // Special handling for conversation screen
      if (screen === 5) {
        console.log('📱 Special iOS handling for conversation screen');
        setTimeout(() => {
          const conversationElement = document.querySelector('.ios-conversation-screen-container');
          if (conversationElement) {
            console.log('✅ Conversation element found after direct navigation');
          } else {
            console.warn('❌ Conversation element not found after direct navigation');
          }
        }, 200);
      }
    }
  };
  
  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (navigationTimeoutRef.current) {
        clearTimeout(navigationTimeoutRef.current);
      }
    };
  }, []);
  
  return (
    <NavigationContext.Provider 
      value={{
        currentScreen,
        goToNextScreen,
        goToScreen,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

// Add global navigation history tracking
declare global {
  interface Window {
    navigationHistory: number[];
  }
}
