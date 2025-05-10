
import React from 'react';
import { useFlowContext } from '@/context/FlowContext';
import { Button } from '@/components/ui/button';
import AnimatedCard from './AnimatedCard';
import { cn } from '@/lib/utils';
import { Clock, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const TimeAvailability = () => {
  const { timeAvailable, setTimeAvailable, goToNextScreen, currentScreen, triggerCelebration } = useFlowContext();
  
  const handleTimeSelection = (time: string) => {
    setTimeAvailable(time);
    triggerCelebration('colorful-fireworks');
  };
  
  const timeOptions = [
    { value: '10 דקות', icon: '⏱️', description: 'אימון קצר' },
    { value: '20 דקות', icon: '⏱️', description: 'אימון בינוני' },
    { value: '30 דקות', icon: '🕰️', description: 'אימון ארוך' },
    { value: '60 דקות', icon: '🕰️', description: 'אימון מלא' },
  ];

  return (
    <AnimatedCard 
      isVisible={currentScreen === 3} 
      className="screen-3-container"
    >
      <div className="space-y-4 flex flex-col text-sm h-full">
        <motion.h2 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-lg font-medium mb-4 flex items-center gap-2"
        >
          <span>כמה זמן יש לך כרגע?</span>
          <Clock className="text-coachy-blue animate-[spin_10s_linear_infinite]" size={16} />
          <Heart className="fill-coachy-pink stroke-coachy-pink animate-pulse-gentle" size={16} />
        </motion.h2>
        
        <div className="grid grid-cols-2 gap-3 justify-items-center flex-1">
          {timeOptions.map((option, index) => (
            <motion.button
              key={option.value}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                delay: 0.1 * (index + 1),
                type: "spring",
                stiffness: 400,
                damping: 17
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleTimeSelection(option.value)}
              className={cn(
                'w-full h-32 rounded-xl transition-all duration-300 flex flex-col items-center justify-center gap-1',
                'border-2',
                timeAvailable === option.value 
                  ? 'coachy-rainbow-gradient text-white shadow-md scale-105'
                  : 'bg-white border-gray-200 text-gray-700'
              )}
            >
              <span className="text-2xl mb-1">{option.icon}</span>
              <span className="font-medium">{option.value}</span>
              <span className="text-xs opacity-80">{option.description}</span>
            </motion.button>
          ))}
        </div>
        
        <div className="mt-auto pt-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex justify-center"
          >
            <Button 
              onClick={goToNextScreen}
              disabled={!timeAvailable}
              className="w-full py-6 rounded-xl relative overflow-hidden group bg-gradient-to-r from-coachy-pink to-coachy-blue text-white font-medium"
            >
              <span className="relative z-10">יאללה, נמשיך</span>
              <span className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 group-active:scale-x-100 transition-transform origin-right duration-300"></span>
            </Button>
          </motion.div>
        </div>
      </div>
    </AnimatedCard>
  );
};

export default TimeAvailability;
