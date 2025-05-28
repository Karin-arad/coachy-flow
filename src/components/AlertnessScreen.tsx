
import React from 'react';
import { useFlowContext } from '@/context/FlowContext';
import QuestionCard from './QuestionCard';
import { playSound } from '@/utils/soundEffects';

const AlertnessScreen = () => {
  const { currentScreen, emotionRatings, setEmotionRatings, goToNextScreen, goToScreen } = useFlowContext();

  const handleValueChange = (value: number[]) => {
    setEmotionRatings({
      ...emotionRatings,
      alertness: value[0]
    });
  };

  const handleNext = () => {
    goToNextScreen();
    playSound('success');
  };

  const handlePrevious = () => {
    goToScreen(2); // Go back to EnergyScreen
    playSound('click');
  };

  // Only render if we're on the correct screen
  if (currentScreen !== 3) {
    return null;
  }

  return (
    <QuestionCard
      title="מה רמת הערנות שלך?"
      emojiIcon="👁️"
      currentValue={emotionRatings.alertness}
      onChange={handleValueChange}
      onNext={handleNext}
      onPrevious={handlePrevious}
      currentStep={3}
      totalSteps={4}
      emotionType="alertness"
    />
  );
};

export default AlertnessScreen;
