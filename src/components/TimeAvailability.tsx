
import React, { useEffect } from 'react';
import { useFlowContext } from '@/context/FlowContext';
import { Button } from '@/components/ui/button';
import AnimatedCard from './AnimatedCard';
import { cn } from '@/lib/utils';
import { Clock, Heart, TimerIcon, HourglassIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const TimeAvailability = () => {
  const { timeAvailable, setTimeAvailable, goToNextScreen, currentScreen } = useFlowContext();
  
  useEffect(() => {
    if (currentScreen === 3) {
      window.scrollTo(0, 0);
    }
  }, [currentScreen]);
  
  const timeOptions = [
    { value: '10 דקות', icon: '⏱️', description: 'זמן בינוני' },
    { value: '20 דקות', icon: '⏱️', description: 'אימון מעמיק' },
    { value: 'חצי שעה', icon: '🕰️', description: 'אימון מקיף' },
    { value: 'שעה', icon: '🕰️', description: 'אימון יסודי ומקיף' },
  ];

  return (
    <AnimatedCard 
      isVisible={currentScreen === 3} 
      className="min-h-[400px] flex flex-col h-[calc(100vh-200px)] screen-3-container"
    >
      <div className="space-y-6 h-full flex flex-col text-sm">
        <motion.h2 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-xl font-medium bg-gradient-to-r from-coachy-blue to-indigo-600 bg-clip-text text-transparent mb-5 flex items-center gap-2"
        >
          <span>כמה זמן יש לך כרגע?</span>
          <Clock className="text-coachy-blue animate-[spin_10s_linear_infinite]" size={18} />
          <Heart className="fill-pink-400 stroke-pink-400 animate-pulse-gentle" size={18} />
        </motion.h2>
        
        <div className="grid grid-cols-2 gap-4 justify-items-center">
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
              whileTap={{ scale: 0.95 }}
              onClick={() => setTimeAvailable(option.value)}
              className={cn(
                'w-full px-3 py-4 rounded-xl transition-all duration-300 text-base shadow-sm flex flex-col items-center justify-center gap-2 time-option-card',
                `time-option-${index + 1}`,
                timeAvailable === option.value ? 'selected' : ''
              )}
            >
              <span className="text-2xl time-icon">{option.icon}</span>
              <span className="time-option-label">{option.value}</span>
              <span className="text-xs opacity-80">{option.description}</span>
              
              {timeAvailable === option.value && (
                <motion.div 
                  layoutId="selectedIndicator"
                  className="selection-indicator"
                  animate={{ 
                    opacity: [0.5, 1, 0.5],
                    scaleX: [0.6, 0.8, 0.6]
                  }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
              )}
            </motion.button>
          ))}
        </div>
        
        <div className="flex justify-end mt-auto pt-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Button 
              onClick={goToNextScreen}
              disabled={!timeAvailable}
              variant="rainbow"
              className="continue-button px-5 py-1.5 rounded-xl shadow-md relative overflow-hidden group text-sm"
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
