
import React from 'react';
import { useFlowContext } from '@/context/FlowContext';
import QuestionCard from './QuestionCard';
import { playSound } from '@/utils/soundEffects';

const LightnessScreen = () => {
  const { currentScreen, emotionRatings, setEmotionRatings, goToNextScreen, goToScreen } = useFlowContext();

  const handleValueChange = (value: number[]) => {
    setEmotionRatings({
      ...emotionRatings,
      lightness: value[0]
    });
  };

  const handleNext = () => {
    goToNextScreen();
    playSound('success');
  };

  const handlePrevious = () => {
    goToScreen(3); // Go back to AlertnessScreen
    playSound('click');
  };

  // Only render if we're on the correct screen
  if (currentScreen !== 4) {
    return null;
  }

  return (
    <QuestionCard
      title="מה תחושת הקלילות שלך?"
      emojiIcon="🌸"
      currentValue={emotionRatings.lightness}
      onChange={handleValueChange}
      onNext={handleNext}
      onPrevious={handlePrevious}
      currentStep={4}
      totalSteps={4}
      emotionType="lightness"
    />
  );
};

export default LightnessScreen;
