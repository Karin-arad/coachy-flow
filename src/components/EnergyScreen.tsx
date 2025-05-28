
import React from 'react';
import { useFlowContext } from '@/context/FlowContext';
import QuestionCard from './QuestionCard';
import { playSound } from '@/utils/soundEffects';

const EnergyScreen = () => {
  const { currentScreen, emotionRatings, setEmotionRatings, goToNextScreen, goToScreen } = useFlowContext();

  const handleValueChange = (value: number[]) => {
    setEmotionRatings({
      ...emotionRatings,
      energy: value[0]
    });
  };

  const handleNext = () => {
    goToNextScreen();
    playSound('success');
  };

  const handlePrevious = () => {
    goToScreen(1); // Go back to BouncinessScreen
    playSound('click');
  };

  // Only render if we're on the correct screen
  if (currentScreen !== 2) {
    return null;
  }

  return (
    <QuestionCard
      title="איך הרמת האנרגיה שלך?"
      emojiIcon="⚡"
      currentValue={emotionRatings.energy}
      onChange={handleValueChange}
      onNext={handleNext}
      onPrevious={handlePrevious}
      currentStep={2}
      totalSteps={4}
      emotionType="energy"
    />
  );
};

export default EnergyScreen;
