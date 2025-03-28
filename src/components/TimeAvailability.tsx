
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
      className="min-h-[400px] flex flex-col h-[calc(100vh-200px)]"
    >
      <div className="space-y-6 h-full flex flex-col">
        <h2 className="text-2xl font-medium bg-gradient-to-r from-coachy-blue to-indigo-600 bg-clip-text text-transparent mb-6 flex items-center gap-2">
          <span>כמה זמן יש לך כרגע?</span>
          <Clock className="text-coachy-blue animate-[spin_10s_linear_infinite]" size={20} />
        </h2>
        
        <div className="grid grid-cols-2 gap-4 justify-items-center">
          {timeOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setTimeAvailable(option.value)}
              className={cn(
                'w-full px-4 py-3 rounded-xl transition-all duration-300 text-lg shadow-sm flex flex-col items-center gap-1',
                timeAvailable === option.value
                  ? 'bg-gradient-to-r from-coachy-blue to-indigo-600 text-white transform scale-105 shadow-md'
                  : 'bg-white/70 backdrop-blur-sm text-coachy-blue border border-coachy-lightBlue hover:bg-coachy-blue/10 hover:scale-105'
              )}
            >
              <span className="text-xl">{option.icon}</span>
              <span>{option.value}</span>
              {timeAvailable === option.value && (
                <div className="w-8 h-1 bg-white mt-1 rounded-full animate-pulse"></div>
              )}
            </button>
          ))}
        </div>
        
        <div className="flex justify-end mt-auto pt-6">
          <Button 
            onClick={goToNextScreen}
            disabled={!timeAvailable}
            variant="joyful"
            showCompletionEffect={true}
            className="text-white px-6 py-2 transition-all duration-300 transform hover:scale-105 active:scale-95 rounded-xl shadow-sm hover:shadow-md relative overflow-hidden group"
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
