
import React from 'react';
import { useFlowContext } from '@/context/FlowContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import AnimatedCard from './AnimatedCard';
import { Heart, Sun, Moon, Cloud } from 'lucide-react';

const EmotionalPrompt = () => {
  const { freeTextEmotion, setFreeTextEmotion, goToNextScreen, currentScreen } = useFlowContext();
  
  const handleNextClick = () => {
    if (freeTextEmotion.trim()) {
      goToNextScreen();
    }
  };
  
  // Get current hour to display appropriate greeting and icon
  const hour = new Date().getHours();
  const isNight = hour >= 18 || hour < 6;
  const isEvening = hour >= 16 && hour < 18;
  const isMorning = hour >= 6 && hour < 12;
  
  let greeting = "שלום קארין";
  let TimeIcon = Sun;
  
  if (isNight) {
    greeting = "לילה טוב קארין";
    TimeIcon = Moon;
  } else if (isEvening) {
    greeting = "ערב טוב קארין";
    TimeIcon = Sun;
  } else if (isMorning) {
    greeting = "בוקר טוב קארין";
    TimeIcon = Sun;
  } else {
    greeting = "צהריים טובים קארין";
    TimeIcon = Sun;
  }

  return (
    <AnimatedCard isVisible={currentScreen === 1}>
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center bg-gradient-to-r from-white/50 to-white/30 px-4 py-2 rounded-xl shadow-sm">
            <span className="text-2xl font-medium text-coachy-blue">{greeting}</span>
            <Heart className="fill-coachy-red stroke-coachy-red animate-pulse-gentle mr-2" size={24} />
            <TimeIcon className="text-amber-500 ml-2 animate-[spin_30s_linear_infinite]" size={20} />
          </div>
        </div>
        
        <h2 className="text-2xl font-medium text-coachy-blue mb-6 bg-gradient-to-r from-coachy-blue to-indigo-600 bg-clip-text text-transparent">
          איך את/ה היום?
        </h2>
        
        <Textarea
          value={freeTextEmotion}
          onChange={(e) => setFreeTextEmotion(e.target.value)}
          placeholder="רשמי את התחושות שלך בחופשיות..."
          className="min-h-[120px] text-right border-coachy-lightBlue focus:border-coachy-blue resize-none bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md text-coachy-text transition-all duration-300 focus:ring-2 focus:ring-coachy-blue/30 focus:shadow-lg"
          dir="rtl"
          lang="he"
          autoFocus
        />
        
        <div className="flex justify-end">
          <Button 
            onClick={handleNextClick}
            disabled={!freeTextEmotion.trim()}
            variant="green"
            className="text-white px-6 py-2 transition-all duration-300 transform hover:scale-105 active:scale-95 rounded-xl shadow-sm hover:shadow-md hover:brightness-105 relative overflow-hidden group"
          >
            <span className="relative z-10">יאללה, נמשיך</span>
            <span className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 group-active:scale-x-100 transition-transform origin-right duration-300"></span>
          </Button>
        </div>
      </div>
    </AnimatedCard>
  );
};

export default EmotionalPrompt;
