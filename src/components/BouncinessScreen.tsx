
import React from 'react';
import { useFlowContext } from '@/context/FlowContext';
import QuestionCard from './QuestionCard';
import { playSound } from '@/utils/soundEffects';

const BouncinessScreen = () => {
  const { currentScreen, emotionRatings, setEmotionRatings, goToNextScreen } = useFlowContext();

  const handleValueChange = (value: number[]) => {
    setEmotionRatings({
      ...emotionRatings,
      bounciness: value[0]
    });
  };

  const handleNext = () => {
    goToNextScreen();
    playSound('success');
  };

  // Only render if we're on the correct screen
  if (currentScreen !== 1) {
    return null;
  }

  return (
    <QuestionCard
      title="איך אתה מרגיש עכשיו?"
      emojiIcon="🌟"
      currentValue={emotionRatings.bounciness}
      onChange={handleValueChange}
      onNext={handleNext}
      currentStep={1}
      totalSteps={4}
      emotionType="bounciness"
      showPrevious={false}
    />
  );
};

export default BouncinessScreen;
