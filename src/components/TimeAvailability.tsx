import React from 'react';
import { useFlowContext } from '@/context/FlowContext';
import { motion } from 'framer-motion';
import { playSound } from '@/utils/soundEffects';
import TimeOption from './TimeOption';
import NavigationButtons from './NavigationButtons';
import Creature from './Creature';
import { useWorldBackground } from '@/hooks/useWorldBackground';
import { worlds, worldBackground } from '@/lib/worlds';

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

  useWorldBackground(worldBackground('energy'));

  // Don't render if we're not on screen 6
  if (currentScreen !== 6) {
    return null;
  }

  const timeOptions = ['10', '20', '30', '45'];

  return (
    <div className="screen">
      <div className="flex items-end gap-3">
        <div className="flex-1">
          <h1 className="t-title mb-2">כמה זמן יש לך?</h1>
          <p className="t-sub">כמה דקות מתאימות לך היום?</p>
        </div>
        <div className="w-[88px] h-[104px] flex-shrink-0">
          {/* The creature stretches with the time chosen */}
          <Creature
            value={{ '10': 2, '20': 5, '30': 7, '45': 8 }[timeAvailable] ?? 4}
            color={worlds.energy.creature}
            scale={0.36}
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 flex-1">
        {timeOptions.map((minutes, index) => (
          <motion.div
            key={minutes}
            className="flex flex-1 max-h-[128px] min-h-[72px]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.06 * (index + 1), duration: 0.25 }}
          >
            <TimeOption
              minutes={minutes}
              isSelected={timeAvailable === minutes}
              onSelect={() => handleTimeSelect(minutes)}
            />
          </motion.div>
        ))}
      </div>

      <NavigationButtons
        onNext={() => {
          goToNextScreen();
          playSound('success');
        }}
        onPrevious={handlePrevious}
        nextDisabled={!timeAvailable}
        nextLabel="יאללה, נמשיך"
        previousLabel="חזרה"
        showChevron={false}
      />
    </div>
  );
};

export default TimeAvailability;
