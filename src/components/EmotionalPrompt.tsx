
import React from 'react';
import { useFlowContext } from '@/context/FlowContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import AnimatedCard from './AnimatedCard';
import { Heart } from 'lucide-react';

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
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl font-medium text-coachy-blue">בוקר טוב קארין</span>
          <Heart className="fill-[#ea384c] stroke-[#ea384c]" size={24} />
        </div>
        <h2 className="text-2xl font-medium text-coachy-blue mb-6">
          איך את מרגישה הבוקר?
        </h2>
        
        <Textarea
          value={freeTextEmotion}
          onChange={(e) => setFreeTextEmotion(e.target.value)}
          placeholder="רשמי את התחושות שלך בחופשיות..."
          className="min-h-[120px] text-right border-coachy-lightBlue focus:border-coachy-blue resize-none bg-white rounded-xl p-4 shadow-sm text-coachy-text"
          dir="rtl"
          lang="he"
          autoFocus
        />
        
        <div className="flex justify-end">
          <Button 
            onClick={handleNextClick}
            disabled={!freeTextEmotion.trim()}
            variant="green"
            className="text-white px-6 py-2 transition-all duration-150 transform active:scale-95 rounded-xl shadow-sm hover:shadow"
          >
            הבא
          </Button>
        </div>
      </div>
    </AnimatedCard>
  );
};

export default EmotionalPrompt;
