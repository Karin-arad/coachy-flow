
import React from 'react';
import { useFlowContext } from '@/context/FlowContext';
import { Button } from '@/components/ui/button';
import AnimatedCard from './AnimatedCard';
import { Heart, Play, Sparkles } from 'lucide-react';

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
        <div className="flex items-center justify-center gap-3 mb-4">
          <Sparkles className="text-amber-500" size={20} />
          <h2 className="text-2xl font-medium bg-gradient-to-r from-coachy-blue to-indigo-600 bg-clip-text text-transparent">
            תודה קארין!
          </h2>
          <Heart className="fill-coachy-red stroke-coachy-red animate-pulse-gentle" size={24} />
        </div>
        <p className="text-xl text-coachy-text bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent text-center">
          הנה תרגול קטן שיעשה לך טוב היום 💫
        </p>
        
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-coachy-gray via-gray-100 to-coachy-gray p-1 aspect-video my-6 shadow-md group">
          <div className="absolute inset-0 backdrop-blur-[1px] bg-white/10 flex items-center justify-center">
            <div className="text-gray-500 flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Play className="text-coachy-blue h-8 w-8 ml-1" />
              </div>
              <p>כאן יופיע סרטון YouTube עם תרגול מותאם אישית</p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center mt-6">
          <Button 
            onClick={handleStartPractice}
            className="bg-gradient-to-r from-coachy-blue to-indigo-600 hover:brightness-105 text-white px-8 py-6 text-lg rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md group"
          >
            <span className="relative z-10 flex items-center gap-2">
              <span>התחילי תרגול</span>
              <Play className="h-5 w-5 ml-1 group-hover:animate-pulse" />
            </span>
            <span className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 group-active:scale-x-100 transition-transform origin-right duration-300 rounded-xl"></span>
          </Button>
        </div>
      </div>
    </AnimatedCard>
  );
};

export default PracticeSummary;
