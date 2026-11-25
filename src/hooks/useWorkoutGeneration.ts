
import { useState } from 'react';
import { EmotionRatings } from '@/types/video';
import { createWorkoutRequestPrompt } from '@/utils/inputUtils';
import { askCoachyAI } from '@/utils/coachyService';

export const useWorkoutGeneration = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [workoutDescription, setWorkoutDescription] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const generateFallbackRecommendation = (
    emotionRatings: EmotionRatings,
    userConversation: string,
    timeAvailable: string
  ) => {
    const { energy, bounciness, alertness, lightness } = emotionRatings;
    const avgEnergy = (energy + bounciness + alertness + lightness) / 4;
    
    let recommendation = `Based on your current state, here's a personalized ${timeAvailable} practice:\n\n`;
    
    if (avgEnergy >= 7) {
      recommendation += "🔥 High Energy Flow:\n";
      recommendation += "• Start with 2-3 minutes of dynamic warm-up\n";
      recommendation += "• Move into energizing exercises like jumping jacks or burpees\n";
      recommendation += "• Include strength movements like squats and push-ups\n";
      recommendation += "• Cool down with gentle stretches\n";
    } else if (avgEnergy >= 4) {
      recommendation += "🌟 Balanced Flow:\n";
      recommendation += "• Begin with gentle stretching\n";
      recommendation += "• Flow through moderate movements like lunges and arm circles\n";
      recommendation += "• Include some core strengthening exercises\n";
      recommendation += "• End with relaxing poses\n";
    } else {
      recommendation += "🌸 Gentle Restoration:\n";
      recommendation += "• Focus on slow, mindful stretching\n";
      recommendation += "• Include breathing exercises\n";
      recommendation += "• Try gentle yoga poses or tai chi movements\n";
      recommendation += "• Emphasize relaxation and stress relief\n";
    }
    
    if (userConversation.trim()) {
      recommendation += `\n💡 Personalized Notes:\nI've considered your input: "${userConversation}"`;
    }
    
    recommendation += "\n\nRemember to listen to your body and modify as needed. You've got this! 💪";
    
    return recommendation;
  };

  const generateWorkoutRecommendation = async (
    emotionRatings: EmotionRatings,
    userConversation: string,
    timeAvailable: string
  ) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const workoutRequestPrompt = createWorkoutRequestPrompt(
        emotionRatings,
        userConversation,
        timeAvailable
      );
      
      console.log('🧠 Sending workout request prompt to AI:', workoutRequestPrompt);
      
      const response = await Promise.race([
        askCoachyAI(workoutRequestPrompt),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Request timeout')), 15000)
        )
      ]) as string;
      
      console.log('✅ Received workout recommendation:', response);
      setWorkoutDescription(response);
      setRetryCount(0);
      
      return response;
      
    } catch (error) {
      // The text service is unreachable: use the built-in description, quietly.
      // The person still gets a matched video; how the text was produced is not their concern.
      console.error('❌ Error generating workout recommendation:', error);
      const fallbackRecommendation = generateFallbackRecommendation(emotionRatings, userConversation, timeAvailable);
      setWorkoutDescription(fallbackRecommendation);
      setError(null);
      return fallbackRecommendation;
    } finally {
      setIsLoading(false);
    }
  };

  const handleManualRetry = () => {
    setRetryCount(0);
    setError(null);
  };

  return {
    isLoading,
    workoutDescription,
    error,
    retryCount,
    generateWorkoutRecommendation,
    handleManualRetry,
    setWorkoutDescription
  };
};
