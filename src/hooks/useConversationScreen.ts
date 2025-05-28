
import { useEffect, useRef, useState } from 'react';
import { useFlowContext } from '@/hooks/useFlowContext';
import { playSound } from '@/utils/soundEffects';

export const useConversationScreen = () => {
  const { userConversation, setUserConversation, goToNextScreen, goToScreen, currentScreen } = useFlowContext();
  const screenRef = useRef<HTMLDivElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Enhanced iOS debugging and fallback mechanisms
  useEffect(() => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const shouldBeVisible = currentScreen === 5;
    
    console.log('🍎 ConversationScreen - Enhanced Debug:');
    console.log('- Current screen:', currentScreen);
    console.log('- Should be visible:', shouldBeVisible);
    console.log('- Is iOS:', isIOS);
    console.log('- Component mounted:', !!screenRef.current);
    console.log('- Navigation history:', window.navigationHistory || []);
    console.log('- Timestamp:', new Date().toLocaleTimeString());
    
    if (shouldBeVisible) {
      setIsInitialized(true);
      
      if (isIOS) {
        console.log('📱 iOS ConversationScreen activation');
        
        // Immediate element verification
        const element = screenRef.current;
        if (element) {
          console.log('✅ iOS: ConversationScreen element confirmed immediately');
          
          // Force visible styles
          element.style.display = 'block';
          element.style.visibility = 'visible';
          element.style.opacity = '1';
          element.style.transform = 'translateZ(0)';
          
        } else {
          console.warn('⚠️ iOS: ConversationScreen element not found immediately');
        }
        
        // Delayed verification with fallback
        setTimeout(() => {
          const elementDelayed = screenRef.current;
          if (elementDelayed) {
            console.log('✅ iOS: ConversationScreen element confirmed after delay');
            const styles = getComputedStyle(elementDelayed);
            console.log('- Element styles:', {
              display: styles.display,
              visibility: styles.visibility,
              opacity: styles.opacity,
              transform: styles.transform
            });
          } else {
            console.error('❌ iOS: ConversationScreen element STILL not found after delay');
            console.log('🔄 Attempting fallback rendering...');
          }
        }, 100);
        
        // iOS-specific viewport handling
        const handleViewportChange = () => {
          console.log('📱 iOS viewport change detected');
          if (screenRef.current) {
            screenRef.current.style.height = `${window.innerHeight}px`;
          }
        };
        
        window.addEventListener('resize', handleViewportChange);
        window.addEventListener('orientationchange', handleViewportChange);
        
        return () => {
          window.removeEventListener('resize', handleViewportChange);
          window.removeEventListener('orientationchange', handleViewportChange);
        };
      }
    } else {
      setIsInitialized(false);
    }
  }, [currentScreen]);

  const handleContinue = () => {
    console.log('🍎 ConversationScreen - Continue clicked');
    console.log('- User conversation length:', userConversation.length);
    goToNextScreen();
    playSound('success');
  };

  const handlePrevious = () => {
    console.log('🍎 ConversationScreen - Previous clicked');
    goToScreen(4);
    playSound('click');
  };

  return {
    screenRef,
    isInitialized,
    userConversation,
    setUserConversation,
    handleContinue,
    handlePrevious,
    currentScreen
  };
};
