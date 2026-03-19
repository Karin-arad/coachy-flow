
import React from 'react';
import { useFlowContext } from '@/context/FlowContext';
import AnimatedCard from './AnimatedCard';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { playSound } from '@/utils/soundEffects';
import TimeOption from './TimeOption';

const TimeAvailability = () => {
  const { setTimeAvailable, timeAvailable, goToNextScreen, goToScreen, currentScreen, triggerCelebration } = useFlowContext();

  const handleTimeSelect = (time: string) => {
    setTimeAvailable(time);
    setTimeout(() => {
      goToNextScreen();
      triggerCelebration('colorful-fireworks');
    }, 300);
    playSound('click');
  };

  const handlePrevious = () => {
    goToScreen(5);
    playSound('click');
  };

  // Don't render if we're not on screen 6
  if (currentScreen !== 6) {
    return null;
  }

  const timeOptions = ['10', '20', '30', '45'];

  return (
    <AnimatedCard
      isVisible={true}
      className="h-full w-full"
    >
      <div className="flex flex-col h-full gap-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center"
        >
          <div className="text-[48px] leading-none mb-3">⏰</div>
          <h2 className="text-2xl font-bold text-[hsl(var(--foreground))]">כמה זמן יש לך?</h2>
          <p className="text-[15px] text-[hsl(var(--muted-foreground))] mt-1">בחר את משך האימון המתאים לך</p>
        </motion.div>

        <div className="grid grid-cols-2 gap-3 flex-1">
          {timeOptions.map((minutes, index) => (
            <motion.div
              key={minutes}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.1 * (index + 1),
                type: 'spring',
                stiffness: 400,
                damping: 17,
              }}
            >
              <TimeOption
                minutes={minutes}
                isSelected={timeAvailable === minutes}
                onSelect={() => handleTimeSelect(minutes)}
              />
            </motion.div>
          ))}
        </div>

        <div className="mt-auto pt-2 space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Button
              onClick={() => {
                goToNextScreen();
                playSound('success');
              }}
              disabled={!timeAvailable}
              variant="energetic"
              className="w-full py-6 rounded-xl relative overflow-hidden group"
            >
              <span className="relative z-10">יאללה, נמשיך</span>
              <span className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 group-active:scale-x-100 transition-transform origin-right duration-300"></span>
            </Button>
          </motion.div>

          <Button
            onClick={handlePrevious}
            variant="outline"
            className="w-full py-3 rounded-xl"
          >
            חזרה
          </Button>
        </div>
      </div>
    </AnimatedCard>
  );
};

export default TimeAvailability;
