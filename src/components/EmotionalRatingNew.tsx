import React from 'react';
import { useFlowContext } from '@/context/FlowContext';
import AnimatedCard from './AnimatedCard';
import { motion } from 'framer-motion';
import EmotionQuestionCard from './EmotionQuestionCard';
import { playSound } from '@/utils/soundEffects';

const EmotionalRatingNew = () => {
  const {
    emotionRatings,
    setEmotionRatings,
    currentEmotionQuestion,
    setCurrentEmotionQuestion,
    goToNextScreen,
    currentScreen,
    maxSliderValue,
    triggerCelebration
  } = useFlowContext();

  const handleSliderChange = (value: number[]) => {
    const newValue = value[0];
    const newRatings = { ...emotionRatings };
    
    switch (currentEmotionQuestion) {
      case 1:
        newRatings.energy = newValue;
        break;
      case 2:
        newRatings.bounciness = newValue;
        break;
      case 3:
        newRatings.alertness = newValue;
        break;
      case 4:
        newRatings.lightness = newValue;
        break;
    }
    setEmotionRatings(newRatings);
  };

  const handleNext = () => {
    if (currentEmotionQuestion < 4) {
      setCurrentEmotionQuestion(currentEmotionQuestion + 1);
    } else {
      // Show celebration effect when completing all questions
      triggerCelebration('stars');
      playSound('success');
      
      // Explicitly navigate to screen 3 (WorkoutPreferences)
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
    { 
      title: "אנרגיה", 
      question: "כמה אנרגיה יש לך עכשיו?", 
      emojiIcon: "⚡", 
      type: "energy" 
    },
    { 
      title: "קופצניות", 
      question: "כמה קופצני/ת את/ה מרגיש/ה?", 
      emojiIcon: "🦘", 
      type: "bounciness" 
    },
    { 
      title: "ערנות", 
      question: "עד כמה את/ה מרוכז/ת כרגע?", 
      emojiIcon: "🧠", 
      type: "alertness" 
    },
    { 
      title: "קלילות", 
      question: "כמה קלילות את/ה חש/ה?", 
      emojiIcon: "🦋", 
      type: "lightness" 
    },
  ];

  const currentQuestion = questionData[currentEmotionQuestion - 1];
  
  // Don't render if we're not on screen 2
  if (currentScreen !== 2) {
    return null;
  }

  return (
    <AnimatedCard 
      isVisible={true}
      className="screen-2-container"
    >
      <motion.div
        key={currentEmotionQuestion}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="h-full"
      >
        <EmotionQuestionCard
          title={currentQuestion.title}
          question={currentQuestion.question}
          emojiIcon={currentQuestion.emojiIcon}
          currentValue={getCurrentValue()}
          onChange={handleSliderChange}
          onNext={handleNext}
          onPrevious={handlePrevious}
          showPrevious={currentEmotionQuestion > 1}
          emotionType={currentQuestion.type as "energy" | "bounciness" | "alertness" | "lightness"}
          step={currentEmotionQuestion}
          totalSteps={4}
          maxValue={maxSliderValue}
        />
      </motion.div>
    </AnimatedCard>
  );
};

export default EmotionalRatingNew;
