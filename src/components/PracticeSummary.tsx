
import React, { useEffect, useState } from 'react';
import { useFlowContext } from '@/context/FlowContext';
import AnimatedCard from './AnimatedCard';
import { createWorkoutRequestPrompt } from '@/utils/inputUtils';
import { askCoachyAI } from '@/utils/coachyService';
import { Loader2, RefreshCw, AlertCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

const PracticeSummary = () => {
  const { currentScreen, emotionRatings, workoutPreferences, timeAvailable } = useFlowContext();
  const [isLoading, setIsLoading] = useState(false);
  const [workoutDescription, setWorkoutDescription] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    console.log('PracticeSummary loaded, currentScreen:', currentScreen);
    // Only run this when the component becomes visible and we haven't tried too many times
    if (currentScreen === 5 && !workoutDescription && !isLoading && retryCount < 3) {
      console.log('Generating workout recommendation for screen 5');
      generateWorkoutRecommendation();
    }
  }, [currentScreen, retryCount]);

  const generateWorkoutRecommendation = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Create the prompt using our utility function
      const workoutRequestPrompt = createWorkoutRequestPrompt(
        emotionRatings,
        workoutPreferences,
        timeAvailable
      );
      
      console.log('🧠 Sending workout request prompt to AI:', workoutRequestPrompt);
      
      // Send the request to the AI service with timeout
      const response = await Promise.race([
        askCoachyAI(workoutRequestPrompt),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Request timeout')), 15000)
        )
      ]) as string;
      
      console.log('✅ Received workout recommendation:', response);
      setWorkoutDescription(response);
      setRetryCount(0); // Reset retry count on success
    } catch (error) {
      console.error('❌ Error generating workout recommendation:', error);
      setRetryCount(prev => prev + 1);
      
      // Provide fallback recommendations if server is unavailable
      if (retryCount >= 2) {
        const fallbackRecommendation = generateFallbackRecommendation();
        setWorkoutDescription(fallbackRecommendation);
        setError(null);
        toast({
          title: "Using offline recommendation",
          description: "We've created a practice based on your preferences without AI assistance.",
        });
      } else {
        setError('Could not generate a workout recommendation. We\'ll try again automatically.');
        toast({
          variant: "destructive",
          title: "Connection issue",
          description: "Retrying workout generation...",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const generateFallbackRecommendation = () => {
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
    
    if (workoutPreferences.trim()) {
      recommendation += `\n💡 Personalized Notes:\nI've considered your preferences: "${workoutPreferences}"`;
    }
    
    recommendation += "\n\nRemember to listen to your body and modify as needed. You've got this! 💪";
    
    return recommendation;
  };

  const handleManualRetry = () => {
    setRetryCount(0);
    generateWorkoutRecommendation();
  };

  // Don't render if not on the correct screen
  if (currentScreen !== 5) {
    return null;
  }

  return (
    <AnimatedCard 
      isVisible={true} 
      className="h-full w-full"
    >
      <div className="h-full flex flex-col justify-center items-center p-4 text-center">
        <h2 className="text-2xl font-semibold mb-4">Your Practice Summary</h2>
        
        {isLoading ? (
          <div className="flex flex-col items-center justify-center space-y-4">
            <Loader2 className="h-10 w-10 text-coachy-blue animate-spin" />
            <p className="text-gray-600">Crafting your perfect practice...</p>
          </div>
        ) : error && retryCount < 3 ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-amber-600">
              <AlertCircle className="h-5 w-5" />
              <p>{error}</p>
            </div>
            <Button 
              onClick={handleManualRetry}
              variant="outline"
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
          </div>
        ) : workoutDescription ? (
          <div className="space-y-4 w-full">
            <div className="bg-white/80 rounded-xl p-5 shadow-sm border border-gray-100">
              <p className="text-gray-700 text-left whitespace-pre-line">
                {workoutDescription}
              </p>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-medium mb-2">Recommended Video</h3>
              <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Video recommendation will appear here</p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-600 mb-8">
            Preparing your personalized practice...
          </p>
        )}
      </div>
    </AnimatedCard>
  );
};

export default PracticeSummary;
