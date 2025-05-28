
import React from 'react';
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

  // iOS-specific debugging
  React.useEffect(() => {
    console.log('🍎 ConversationScreen - iOS Debug Info:');
    console.log('- Current screen:', currentScreen);
    console.log('- Should be visible:', currentScreen === 5);
    console.log('- User agent:', navigator.userAgent);
    console.log('- Is iOS:', /iPad|iPhone|iPod/.test(navigator.userAgent));
    console.log('- Window dimensions:', window.innerWidth, 'x', window.innerHeight);
    console.log('- Screen dimensions:', screen.width, 'x', screen.height);
    console.log('- Device pixel ratio:', window.devicePixelRatio);
  }, [currentScreen]);

  const handleContinue = () => {
    console.log('🍎 ConversationScreen - Continue button clicked');
    goToNextScreen();
    playSound('success');
  };

  const handlePrevious = () => {
    console.log('🍎 ConversationScreen - Previous button clicked');
    goToScreen(4); // Go back to LightnessScreen
    playSound('click');
  };

  // Only render if we're on the correct screen
  if (currentScreen !== 5) {
    console.log('🍎 ConversationScreen - Not rendering, currentScreen:', currentScreen);
    return null;
  }

  console.log('🍎 ConversationScreen - Rendering for screen 5');

  return (
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
            value={userConversation}
            onChange={(e) => setUserConversation(e.target.value)}
            placeholder="למשל: כאבי גב תחתון, בעיות ברכיים, רק פלג עליון, בלי פלאנקים..."
            className={cn(
              "resize-none w-full h-full min-h-[120px] p-4 text-sm rounded-xl",
              "border-2 border-gray-200 focus:border-coachy-blue",
              "focus:ring-1 focus:ring-coachy-blue focus:outline-none",
              "transition-all duration-300 bg-white/80",
              "ios-textarea-fix"
            )}
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
            className="w-full py-6 rounded-xl relative overflow-hidden group"
          >
            <span className="relative z-10">יאללה, נמשיך</span>
            <span className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 group-active:scale-x-100 transition-transform origin-right duration-300"></span>
          </Button>
          
          <Button 
            onClick={handlePrevious}
            variant="outline"
            className="w-full py-3 rounded-xl"
          >
            חזרה
          </Button>
        </motion.div>
      </div>
    </AnimatedCard>
  );
};

export default ConversationScreen;
