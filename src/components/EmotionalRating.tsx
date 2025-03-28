
import React from 'react';
import { useFlowContext } from '@/context/FlowContext';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import AnimatedCard from './AnimatedCard';

const EmotionalRating = () => {
  const { emotionRatings, setEmotionRatings, goToNextScreen, currentScreen } = useFlowContext();
  
  const handleRatingChange = (parameter: keyof typeof emotionRatings, value: number[]) => {
    setEmotionRatings({
      ...emotionRatings,
      [parameter]: value[0],
    });
  };

  const parameters = [
    { id: 'bounciness', label: 'קופצנות' },
    { id: 'energy', label: 'אנרגיה' },
    { id: 'alertness', label: 'ערנות' },
    { id: 'lightness', label: 'קלילות' },
  ];

  return (
    <AnimatedCard isVisible={currentScreen === 2}>
      <div className="space-y-6">
        <h2 className="text-2xl font-medium text-coachy-blue mb-6">
          דרגי את עצמך מ־1 עד 7 בכל אחד מהפרמטרים הבאים: ☀️
        </h2>
        
        <div className="space-y-8">
          {parameters.map((param) => (
            <div key={param.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="text-lg text-coachy-text">{param.label}</div>
                <div className="text-2xl font-medium text-coachy-blue">
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
        
        <div className="flex justify-end mt-4">
          <Button 
            onClick={goToNextScreen}
            className="bg-coachy-blue hover:bg-coachy-blue/90 active:bg-coachy-blue/70 text-white px-6 py-2 transition-all duration-150 transform active:scale-95 rounded-xl shadow-sm hover:shadow"
          >
            הבא
          </Button>
        </div>
      </div>
    </AnimatedCard>
  );
};

export default EmotionalRating;
