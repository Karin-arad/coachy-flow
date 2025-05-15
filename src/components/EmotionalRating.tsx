
import React from 'react';
import { useFlowContext } from '@/context/FlowContext';
import AnimatedCard from './AnimatedCard';
import { Feather, Zap, Eye } from 'lucide-react';
import EmotionParameterCard from './EmotionParameterCard';
import NavigationButtons from './NavigationButtons';
import StepIndicator from './StepIndicator';

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
        <div className="space-y-4">
          {currentParam && (
            <EmotionParameterCard
              key={currentParam.id}
              id={currentParam.id}
              label={currentParam.label}
              question={currentParam.question}
              icon={currentParam.icon}
              value={emotionRatings[currentParam.id as keyof typeof emotionRatings]}
              onChange={(value) => handleRatingChange(currentParam.id as keyof typeof emotionRatings, value)}
              maxValue={maxSliderValue}
              type={currentParam.type}
              scaleLabels={currentParam.scaleLabels}
            />
          )}
        </div>
        
        <NavigationButtons
          onNext={isLastSlider ? goToNextScreen : goToNextSlider}
          onPrevious={goToPreviousSlider}
          isLastSlider={isLastSlider}
          isPreviousDisabled={currentSlider === 0}
        />
        
        <StepIndicator
          currentStep={currentSlider}
          totalSteps={parameters.length}
        />
      </div>
    </AnimatedCard>
  );
};

export default EmotionalRating;
