
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
    { id: 'bounciness', label: 'קופצנות', question: 'כמה קופצנית את מרגישה?' },
    { id: 'energy', label: 'אנרגיה', question: 'מה רמת האנרגיה שלך?' },
    { id: 'alertness', label: 'ערנות', question: 'כמה ערנית את מרגישה?' },
    { id: 'lightness', label: 'קלילות', question: 'מה תחושת הקלילות שלך?' },
  ];

  return (
    <AnimatedCard isVisible={currentScreen === 2}>
      <div className="space-y-6">
        <h2 className="text-2xl font-medium text-coachy-blue mb-6">
          דרגי את עצמך מ־1 עד 7 בכל אחד מהפרמטרים הבאים: ☀️
        </h2>
        
        <div className="space-y-12">
          {parameters.map((param) => (
            <div key={param.id} className="space-y-3">
              <div className="text-lg font-medium text-coachy-blue">{param.question}</div>
              <div className="flex justify-between items-center">
                <div className="text-md text-coachy-text">{param.label}</div>
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
        
        <div className="flex justify-end mt-8">
          <Button 
            onClick={goToNextScreen}
            variant="green"
            className="text-white px-6 py-2 transition-all duration-300 transform active:scale-95 rounded-xl shadow-sm hover:shadow-md hover:brightness-105"
          >
            יאללה, נמשיך
          </Button>
        </div>
      </div>
    </AnimatedCard>
  );
};

export default EmotionalRating;
