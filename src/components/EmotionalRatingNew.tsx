
import React from 'react';
import { useFlowContext } from '@/context/FlowContext';
import QuestionCard from './QuestionCard';
import AnimatedCard from './AnimatedCard';

const EmotionalRatingNew = () => {
  const {
    emotionRatings,
    setEmotionRatings,
    currentEmotionQuestion,
    setCurrentEmotionQuestion,
    goToNextScreen,
    currentScreen,
  } = useFlowContext();

  const handleSliderChange = (value: number[]) => {
    const newRatings = { ...emotionRatings };
    switch (currentEmotionQuestion) {
      case 1:
        newRatings.energy = value[0];
        break;
      case 2:
        newRatings.bounciness = value[0];
        break;
      case 3:
        newRatings.alertness = value[0];
        break;
      case 4:
        newRatings.lightness = value[0];
        break;
    }
    setEmotionRatings(newRatings);
  };

  const handleNext = () => {
    if (currentEmotionQuestion < 4) {
      setCurrentEmotionQuestion(currentEmotionQuestion + 1);
    } else {
      goToNextScreen();
    }
  };

  const handlePrevious = () => {
    if (currentEmotionQuestion > 1) {
      setCurrentEmotionQuestion(currentEmotionQuestion - 1);
    }
  };

  const getCurrentValue = () => {
    switch (currentEmotionQuestion) {
      case 1:
        return emotionRatings.energy;
      case 2:
        return emotionRatings.bounciness;
      case 3:
        return emotionRatings.alertness;
      case 4:
        return emotionRatings.lightness;
      default:
        return 5;
    }
  };

  const questionData = [
    { title: "כמה אנרגיה יש לך עכשיו?", emoji: "⚡", type: "energy" },
    { title: "כמה קופצני/ת את/ה מרגיש/ה?", emoji: "🦘", type: "bounciness" },
    { title: "עד כמה את/ה מרוכז/ת כרגע?", emoji: "🧠", type: "alertness" },
    { title: "כמה קלילות את/ה חש/ה?", emoji: "🦋", type: "lightness" },
  ];

  const currentQuestion = questionData[currentEmotionQuestion - 1];

  return (
    <AnimatedCard 
      isVisible={currentScreen === 2} 
      className="screen-2-container"
    >
      <QuestionCard
        title={currentQuestion.title}
        emojiIcon={currentQuestion.emoji}
        currentValue={getCurrentValue()}
        onChange={handleSliderChange}
        onNext={handleNext}
        onPrevious={handlePrevious}
        currentStep={currentEmotionQuestion}
        totalSteps={4}
        emotionType={currentQuestion.type as any}
        showPrevious={currentEmotionQuestion > 1}
      />
    </AnimatedCard>
  );
};

export default EmotionalRatingNew;
