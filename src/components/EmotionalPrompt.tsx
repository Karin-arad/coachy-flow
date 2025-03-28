
import React from 'react';
import { useFlowContext } from '@/context/FlowContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import AnimatedCard from './AnimatedCard';

const EmotionalPrompt = () => {
  const { freeTextEmotion, setFreeTextEmotion, goToNextScreen, currentScreen } = useFlowContext();
  
  const handleNextClick = () => {
    if (freeTextEmotion.trim()) {
      goToNextScreen();
    }
  };

  return (
    <AnimatedCard isVisible={currentScreen === 1}>
      <div className="space-y-6">
        <h2 className="text-2xl font-medium text-coachy-blue mb-6">
          בוקר טוב קארין 💙 <br />
          איך את מרגישה הבוקר?
        </h2>
        
        <Textarea
          value={freeTextEmotion}
          onChange={(e) => setFreeTextEmotion(e.target.value)}
          placeholder="רשמי את התחושות שלך בחופשיות..."
          className="min-h-[120px] text-right border-coachy-lightBlue focus:border-coachy-blue"
        />
        
        <div className="flex justify-end">
          <Button 
            onClick={handleNextClick}
            disabled={!freeTextEmotion.trim()}
            className="bg-coachy-blue hover:bg-coachy-blue/90 text-white"
          >
            הבא
          </Button>
        </div>
      </div>
    </AnimatedCard>
  );
};

export default EmotionalPrompt;
