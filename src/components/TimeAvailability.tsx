
import React from 'react';
import { useFlowContext } from '@/context/FlowContext';
import { Button } from '@/components/ui/button';
import AnimatedCard from './AnimatedCard';
import { cn } from '@/lib/utils';

const TimeAvailability = () => {
  const { timeAvailable, setTimeAvailable, goToNextScreen, currentScreen } = useFlowContext();
  
  const timeOptions = [
    '5 דקות',
    '10 דקות',
    '20 דקות',
    'חצי שעה',
    'שעה',
  ];

  return (
    <AnimatedCard isVisible={currentScreen === 3}>
      <div className="space-y-6">
        <h2 className="text-2xl font-medium text-coachy-blue mb-6">
          כמה זמן יש לך כרגע? 🧘‍♀️
        </h2>
        
        <div className="flex flex-wrap gap-3 justify-center">
          {timeOptions.map((option) => (
            <button
              key={option}
              onClick={() => setTimeAvailable(option)}
              className={cn(
                'px-6 py-3 rounded-full transition-all duration-200 text-lg shadow-sm',
                timeAvailable === option
                  ? 'bg-coachy-blue text-white transform scale-105'
                  : 'bg-coachy-lightBlue text-coachy-blue hover:bg-coachy-blue/20 hover:scale-105'
              )}
            >
              {option}
            </button>
          ))}
        </div>
        
        <div className="flex justify-end mt-8">
          <Button 
            onClick={goToNextScreen}
            disabled={!timeAvailable}
            className="bg-coachy-blue hover:bg-coachy-blue/90 active:bg-coachy-blue/70 text-white px-6 py-2 transition-all duration-150 transform active:scale-95 rounded-xl shadow-sm hover:shadow"
          >
            הבא
          </Button>
        </div>
      </div>
    </AnimatedCard>
  );
};

export default TimeAvailability;
