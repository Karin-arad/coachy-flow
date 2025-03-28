
import React, { useEffect } from 'react';
import { useFlowContext } from '@/context/FlowContext';
import { Button } from '@/components/ui/button';
import AnimatedCard from './AnimatedCard';
import { cn } from '@/lib/utils';
import { Clock } from 'lucide-react';

const TimeAvailability = () => {
  const { timeAvailable, setTimeAvailable, goToNextScreen, currentScreen } = useFlowContext();
  
  // Reset scroll position when component becomes visible
  useEffect(() => {
    if (currentScreen === 3) {
      window.scrollTo(0, 0);
    }
  }, [currentScreen]);
  
  const timeOptions = [
    { value: '5 דקות', icon: '⏱️' },
    { value: '10 דקות', icon: '⏱️' },
    { value: '20 דקות', icon: '⏱️' },
    { value: 'חצי שעה', icon: '🕰️' },
    { value: 'שעה', icon: '🕰️' },
  ];

  return (
    <AnimatedCard 
      isVisible={currentScreen === 3} 
      className="min-h-[400px] flex flex-col h-[calc(100vh-200px)] screen-3-container"
    >
      <div className="space-y-6 h-full flex flex-col text-sm">
        <h2 className="text-xl font-medium bg-gradient-to-r from-coachy-blue to-indigo-600 bg-clip-text text-transparent mb-5 flex items-center gap-2">
          <span>כמה זמן יש לך כרגע?</span>
          <Clock className="text-coachy-blue animate-[spin_10s_linear_infinite]" size={18} />
        </h2>
        
        <div className="grid grid-cols-2 gap-3 justify-items-center">
          {timeOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setTimeAvailable(option.value)}
              className={cn(
                'w-full px-3 py-2 rounded-xl transition-all duration-300 text-base shadow-sm flex flex-col items-center gap-1 time-option-card',
                timeAvailable === option.value ? 'selected' : ''
              )}
            >
              <span className="text-lg time-icon">{option.icon}</span>
              <span>{option.value}</span>
              {timeAvailable === option.value && (
                <div className="w-6 h-1 bg-white mt-1 rounded-full animate-pulse"></div>
              )}
            </button>
          ))}
        </div>
        
        <div className="flex justify-end mt-auto pt-5">
          <Button 
            onClick={goToNextScreen}
            disabled={!timeAvailable}
            className="continue-button px-5 py-1.5 rounded-xl shadow-sm relative overflow-hidden group text-sm"
          >
            <span className="relative z-10">יאללה, נמשיך</span>
            <span className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 group-active:scale-x-100 transition-transform origin-right duration-300"></span>
          </Button>
        </div>
      </div>
    </AnimatedCard>
  );
};

export default TimeAvailability;
