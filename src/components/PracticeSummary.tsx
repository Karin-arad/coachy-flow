
import React from 'react';
import { useFlowContext } from '@/context/FlowContext';
import { Button } from '@/components/ui/button';
import AnimatedCard from './AnimatedCard';

const PracticeSummary = () => {
  const { currentScreen, freeTextEmotion, emotionRatings, timeAvailable } = useFlowContext();
  
  const handleStartPractice = () => {
    // This would connect to the practice system in the future
    console.log('Starting practice with data:', {
      freeTextEmotion,
      emotionRatings,
      timeAvailable
    });
  };

  return (
    <AnimatedCard isVisible={currentScreen === 4}>
      <div className="space-y-6">
        <h2 className="text-2xl font-medium text-coachy-blue mb-2">
          תודה קארין! 💛
        </h2>
        <p className="text-xl text-coachy-text">
          הנה תרגול קטן שיעשה לך טוב היום 💫
        </p>
        
        <div className="bg-coachy-gray rounded-xl p-4 aspect-video flex items-center justify-center my-6">
          <div className="text-gray-500">
            כאן יופיע סרטון YouTube עם תרגול מותאם אישית
          </div>
        </div>
        
        <div className="flex justify-center mt-4">
          <Button 
            onClick={handleStartPractice}
            className="bg-coachy-blue hover:bg-coachy-blue/90 hover:brightness-105 text-white px-8 py-6 text-lg rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md"
          >
            התחילי תרגול
          </Button>
        </div>
      </div>
    </AnimatedCard>
  );
};

export default PracticeSummary;
