
import React, { useEffect, useRef, useState } from 'react';
import { useFlowContext } from '@/context/FlowContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import AnimatedCard from './AnimatedCard';
import { cn } from '@/lib/utils';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { playSound } from '@/utils/soundEffects';

const ConversationScreen = () => {
  const { userConversation, setUserConversation, goToNextScreen, goToScreen, currentScreen } = useFlowContext();
  const screenRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
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
            
            // Force focus preparation for textarea
            if (textareaRef.current) {
              console.log('📝 iOS: Preparing textarea');
              textareaRef.current.style.transform = 'translateZ(0)';
              textareaRef.current.style.fontSize = '16px';
            }
          } else {
            console.error('❌ iOS: ConversationScreen element STILL not found after delay');
            // Fallback mechanism
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

  // Enhanced iOS textarea focus handling
  const handleTextareaFocus = () => {
    console.log('📝 iOS: Textarea focused');
    if (textareaRef.current && /iPad|iPhone|iPod/.test(navigator.userAgent)) {
      // Prevent iOS zoom on focus
      textareaRef.current.setAttribute('readonly', 'readonly');
      textareaRef.current.setAttribute('style', 'font-size: 16px !important;');
      setTimeout(() => {
        textareaRef.current?.removeAttribute('readonly');
      }, 100);
    }
  };

  // Enhanced visibility check
  if (currentScreen !== 5) {
    console.log('🍎 ConversationScreen - Not rendering, screen:', currentScreen);
    return null;
  }

  console.log('🍎 ConversationScreen - RENDERING for screen 5, initialized:', isInitialized);

  return (
    <div 
      ref={screenRef}
      className="w-full h-full ios-conversation-screen-container"
      style={{
        display: 'block',
        visibility: 'visible',
        opacity: 1,
        minHeight: '500px',
        transform: 'translateZ(0)',
        position: 'relative',
        zIndex: 10
      }}
    >
      <AnimatedCard 
        isVisible={true} 
        className="h-full flex flex-col ios-conversation-fix"
      >
        <div className="space-y-4 flex flex-col h-full text-sm">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-xl font-semibold mb-1 flex items-center justify-center gap-2">
              <MessageCircle className="text-coachy-blue" size={20} />
              נספר לי קצת על עצמך
            </h2>
            <p className="text-gray-600 mb-5">
              יש לך כאבים או אזורים רגישים?
              <br />
              או אולי משהו שאתה רוצה שאדע לפני שנתחיל?
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex-1 relative"
          >
            <Textarea
              ref={textareaRef}
              value={userConversation}
              onChange={(e) => setUserConversation(e.target.value)}
              onFocus={handleTextareaFocus}
              placeholder="למשל: כאבי גב תחתון, בעיות ברכיים, רק פלג עליון, בלי פלאנקים..."
              className={cn(
                "resize-none w-full h-full min-h-[120px] p-4 text-sm rounded-xl",
                "border-2 border-gray-200 focus:border-coachy-blue",
                "focus:ring-1 focus:ring-coachy-blue focus:outline-none",
                "transition-all duration-300 bg-white/80",
                "ios-textarea-fix ios-textarea-enhanced"
              )}
              style={{
                fontSize: '16px', // Prevent iOS zoom
                WebkitAppearance: 'none',
                touchAction: 'manipulation'
              }}
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-auto pt-6 space-y-3"
          >
            <Button 
              onClick={handleContinue}
              variant="energetic"
              className="w-full py-6 rounded-xl relative overflow-hidden group ios-button-fix"
              style={{
                touchAction: 'manipulation',
                WebkitTouchCallout: 'none',
                WebkitUserSelect: 'none'
              }}
            >
              <span className="relative z-10">יאללה, נמשיך</span>
              <span className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 group-active:scale-x-100 transition-transform origin-right duration-300"></span>
            </Button>
            
            <Button 
              onClick={handlePrevious}
              variant="outline"
              className="w-full py-3 rounded-xl ios-button-fix"
              style={{
                touchAction: 'manipulation',
                WebkitTouchCallout: 'none',
                WebkitUserSelect: 'none'
              }}
            >
              חזרה
            </Button>
          </motion.div>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default ConversationScreen;
