import React from 'react';
import { useFlowContext } from '@/context/FlowContext';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import AnimatedCard from './AnimatedCard';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import EmotionAnimation from './EmotionAnimation';

const EmotionalRating = () => {
  const { 
    emotionRatings, 
    setEmotionRatings, 
    goToNextScreen, 
    currentScreen, 
    currentSlider, 
    goToNextSlider,
    goToPreviousSlider,
    maxSliderValue
  } = useFlowContext();
  
  const handleRatingChange = (parameter: keyof typeof emotionRatings, value: number[]) => {
    const originalValue = maxSliderValue + 1 - value[0];
    setEmotionRatings({
      ...emotionRatings,
      [parameter]: originalValue,
    });
  };

  const parameters = [
    { 
      id: 'bounciness', 
      label: 'קופצנות', 
      question: 'כמה קופצנית את מרגישה?', 
      icon: <Feather className="text-coachy-pink animate-float" size={16} />,
      type: 'bounciness' as const,
      scaleLabels: {
        min: 'כלל לא קופצנית',
        max: 'מאוד קופצנית'
      }
    },
    { 
      id: 'energy', 
      label: 'אנרגיה', 
      question: 'מה רמת האנרגיה שלך?', 
      icon: <Zap className="text-coachy-yellow animate-pulse-gentle" size={16} />,
      type: 'energy' as const,
      scaleLabels: {
        min: 'חסר אנרגיה',
        max: 'מלא אנרגיה'
      }
    },
    { 
      id: 'alertness', 
      label: 'ערנות', 
      question: 'כמה ערנית את מרגישה?', 
      icon: <Eye className="text-coachy-blue animate-pulse-gentle" size={16} />,
      type: 'alertness' as const,
      scaleLabels: {
        min: 'מאוד עייפה',
        max: 'מאוד ערנית'
      }
    },
    { 
      id: 'lightness', 
      label: 'קלילות', 
      question: 'מה תחושת הקלילות שלך?', 
      icon: <Feather className="text-coachy-turquoise animate-float" size={16} />,
      type: 'lightness' as const,
      scaleLabels: {
        min: 'לא קליל כלל',
        max: 'מאוד קליל'
      }
    },
  ];

  const currentParam = parameters[currentSlider];
  
  const isLastSlider = currentSlider === parameters.length - 1;

  return (
    <AnimatedCard 
      isVisible={currentScreen === 2} 
      className="screen-2-container"
    >
      <div className="space-y-3 text-sm">
        <h2 className="text-lg font-medium text-coachy-blue mb-2 flex items-center gap-2">
          <span>דרגי את עצמך מ־1 עד 7 בכל אחד מהפרמטרים הבאים:</span>
          <Sparkles className="text-amber-500" size={16} />
        </h2>
        
        <div className="space-y-4">
          {currentParam && (
            <div key={currentParam.id} className={cn(
              "space-y-2 bg-gradient-to-r p-3 rounded-xl transition-all duration-300 shadow-sm",
              emotionRatings[currentParam.id as keyof typeof emotionRatings] > 4 ? 
                "from-white/80 to-white/50 shadow-md" :
                "from-white/60 to-transparent"
            )}>
              <div className="flex items-center gap-2">
                {currentParam.icon}
                <div className={cn(
                  "text-base font-semibold bg-gradient-to-r bg-clip-text text-transparent",
                  currentParam.id === 'bounciness' && "from-coachy-pink to-pink-600",
                  currentParam.id === 'energy' && "from-coachy-yellow to-amber-500",
                  currentParam.id === 'alertness' && "from-coachy-blue to-indigo-600",
                  currentParam.id === 'lightness' && "from-coachy-turquoise to-teal-600"
                )}>
                  {currentParam.question}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-xs text-coachy-text font-medium">{currentParam.label}</div>
                <div className={cn(
                  "text-xl font-bold bg-gradient-to-r bg-clip-text text-transparent",
                  currentParam.id === 'bounciness' && "from-coachy-pink to-pink-600",
                  currentParam.id === 'energy' && "from-coachy-yellow to-amber-500",
                  currentParam.id === 'alertness' && "from-coachy-blue to-indigo-600",
                  currentParam.id === 'lightness' && "from-coachy-turquoise to-teal-600"
                )}>
                  {emotionRatings[currentParam.id as keyof typeof emotionRatings]}
                </div>
              </div>
              <EmotionAnimation
                type={currentParam.id as 'bounciness' | 'energy' | 'alertness' | 'lightness'}
                value={emotionRatings[currentParam.id as keyof typeof emotionRatings]}
                maxValue={maxSliderValue}
              />
              <div className="flex justify-between text-xs text-gray-500 font-medium">
                <span>{currentParam.scaleLabels.min}</span>
                <span>{currentParam.scaleLabels.max}</span>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex justify-between mt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={goToPreviousSlider}
            disabled={currentSlider === 0}
            className="flex items-center gap-1 text-xs h-8"
          >
            <ChevronRight size={14} />
            <span>הקודם</span>
          </Button>
          
          {isLastSlider ? (
            <Button 
              onClick={goToNextScreen}
              variant="energetic"
              className="text-white px-4 py-1 transition-all duration-300 transform hover:scale-105 active:scale-95 rounded-xl shadow-sm hover:shadow-md hover:brightness-105 relative overflow-hidden group text-xs h-8"
            >
              <span className="relative z-10">יאללה, נמשיך</span>
              <span className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 group-active:scale-x-100 transition-transform origin-right duration-300"></span>
            </Button>
          ) : (
            <Button
              variant="joyful"
              size="sm"
              onClick={goToNextSlider}
              className="flex items-center gap-1 text-xs h-8"
            >
              <span>הבא</span>
              <ChevronLeft size={14} />
            </Button>
          )}
        </div>
        
        <div className="flex justify-center gap-2 mt-1">
          {parameters.map((_, index) => (
            <div 
              key={index}
              className={cn(
                "h-1.5 w-1.5 rounded-full transition-all duration-300",
                index === currentSlider ? "bg-coachy-blue w-4" : "bg-gray-300"
              )}
            />
          ))}
        </div>
      </div>
    </AnimatedCard>
  );
};

export default EmotionalRating;
