
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

  const goToNextScreen = () => {
    const now = Date.now();
    const timeSinceLastNavigation = now - lastNavigationTimeRef.current;

    // Debounce rapid navigation calls (prevent within 500ms)
    if (timeSinceLastNavigation < 500) {
      return;
    }

    if (navigationTimeoutRef.current) {
      clearTimeout(navigationTimeoutRef.current);
    }

    lastNavigationTimeRef.current = now;

    let nextScreen: number;

    switch(currentScreen) {
      case 1: nextScreen = 2; break;
      case 2: nextScreen = 3; break;
      case 3: nextScreen = 4; break;
      case 4: nextScreen = 5; break;
      case 5: nextScreen = 6; break;
      case 6: nextScreen = 7; break;
      default:
        nextScreen = Math.min(currentScreen + 1, 7);
        break;
    }

    navigationTimeoutRef.current = setTimeout(() => {
      setCurrentScreen(nextScreen);
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
      setCurrentScreen(screen);
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
