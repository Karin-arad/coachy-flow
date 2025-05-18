
import React, { useState, useEffect } from 'react';
import { useFlowContext } from '@/context/FlowContext';
import AnimatedCard from './AnimatedCard';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { playSound } from '@/utils/soundEffects';
import { cn } from '@/lib/utils';

const Conversation = () => {
  const { currentScreen, goToNextScreen, setUserConversation } = useFlowContext();
  const [message, setMessage] = useState('');
  
  useEffect(() => {
    console.log('Conversation component mounted, currentScreen:', currentScreen);
  }, [currentScreen]);

  const handleContinue = () => {
    if (message.trim()) {
      console.log('Conversation: Continue button clicked, saving message and moving to next screen');
      setUserConversation(message);
      goToNextScreen();
      playSound('success');
    }
  };
  
  console.log('Conversation rendering, currentScreen:', currentScreen, 'should render:', currentScreen === 1);

  // Only render on screen 1
  if (currentScreen !== 1) {
    console.log('Conversation not rendering because currentScreen is not 1');
    return null;
  }
  
  console.log('Conversation ACTUALLY RENDERING on screen 1!');
  
  return (
    <AnimatedCard 
      isVisible={true} 
      className="h-full flex flex-col"
    >
      <div className="space-y-4 flex flex-col h-full">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-xl font-semibold mb-1">Hey there 👋</h2>
          <p className="text-gray-600 mb-5">
            Tell me how you're feeling today,<br />
            and what brings you here.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex-1 relative"
        >
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="I'm feeling a bit tired today, but I want to get some movement in..."
            className={cn(
              "resize-none w-full h-full min-h-[150px] p-4 text-sm rounded-xl",
              "border-2 border-gray-200 focus:border-coachy-blue",
              "focus:ring-1 focus:ring-coachy-blue focus:outline-none",
              "transition-all duration-300 bg-white/80"
            )}
          />
          
          <motion.div 
            className="absolute top-3 right-3 text-coachy-blue opacity-70"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, type: "spring" }}
          >
            <MessageCircle size={18} className="opacity-60" />
          </motion.div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-auto pt-6"
        >
          <Button 
            onClick={handleContinue}
            variant="energetic"
            className="w-full py-6 rounded-xl relative overflow-hidden group"
            disabled={!message.trim()}
          >
            <span className="relative z-10">Continue <ArrowRight className="ml-1 h-4 w-4 inline" /></span>
            <span className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 group-active:scale-x-100 transition-transform origin-right duration-300"></span>
          </Button>
        </motion.div>
      </div>
    </AnimatedCard>
  );
};

export default Conversation;
