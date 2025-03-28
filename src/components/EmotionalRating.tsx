
import React from 'react';
import { useFlowContext } from '@/context/FlowContext';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import AnimatedCard from './AnimatedCard';
import { Sparkles } from 'lucide-react';

const EmotionalRating = () => {
  const { emotionRatings, setEmotionRatings, goToNextScreen, currentScreen } = useFlowContext();
  
  const handleRatingChange = (parameter: keyof typeof emotionRatings, value: number[]) => {
    setEmotionRatings({
      ...emotionRatings,
      [parameter]: value[0],
    });
  };

  const parameters = [
    { id: 'bounciness', label: 'קופצנות', question: 'כמה קופצנית את מרגישה?', icon: '🦘' },
    { id: 'energy', label: 'אנרגיה', question: 'מה רמת האנרגיה שלך?', icon: '⚡' },
    { id: 'alertness', label: 'ערנות', question: 'כמה ערנית את מרגישה?', icon: '👁️' },
    { id: 'lightness', label: 'קלילות', question: 'מה תחושת הקלילות שלך?', icon: '🪶' },
  ];

  return (
    <AnimatedCard isVisible={currentScreen === 2}>
      <div className="space-y-6">
        <h2 className="text-2xl font-medium text-coachy-blue mb-6 flex items-center gap-2">
          <span>דרגי את עצמך מ־1 עד 7 בכל אחד מהפרמטרים הבאים:</span>
          <Sparkles className="text-amber-500" size={20} />
        </h2>
        
        <div className="space-y-14">
          {parameters.map((param) => (
            <div key={param.id} className="space-y-4 bg-gradient-to-r from-white/50 to-transparent p-4 rounded-xl">
              <div className="flex items-center gap-2">
                <span className="text-xl">{param.icon}</span>
                <div className="text-lg font-medium bg-gradient-to-r from-coachy-blue to-indigo-600 bg-clip-text text-transparent">
                  {param.question}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-md text-coachy-text font-medium">{param.label}</div>
                <div className="text-2xl font-medium text-coachy-blue bg-gradient-to-r from-coachy-blue to-indigo-600 bg-clip-text text-transparent">
                  {emotionRatings[param.id as keyof typeof emotionRatings]}
                </div>
              </div>
              <Slider
                value={[emotionRatings[param.id as keyof typeof emotionRatings]]}
                min={1}
                max={7}
                step={1}
                onValueChange={(value) => handleRatingChange(param.id as keyof typeof emotionRatings, value)}
                className="py-4"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>נמוך</span>
                <span>גבוה</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-end mt-8">
          <Button 
            onClick={goToNextScreen}
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

export default EmotionalRating;
