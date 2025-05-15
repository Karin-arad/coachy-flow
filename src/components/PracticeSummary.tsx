
import React, { useEffect, useState } from 'react';
import { useFlowContext } from '@/context/FlowContext';
import AnimatedCard from './AnimatedCard';
import { createWorkoutRequestPrompt } from '@/utils/inputUtils';
import { askCoachyAI } from '@/utils/coachyService';
import { Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const PracticeSummary = () => {
  const { currentScreen, emotionRatings, workoutPreferences, timeAvailable } = useFlowContext();
  const [isLoading, setIsLoading] = useState(false);
  const [workoutDescription, setWorkoutDescription] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('PracticeSummary loaded, currentScreen:', currentScreen);
    // Only run this when the component becomes visible
    if (currentScreen === 5 && !workoutDescription && !isLoading) {
      console.log('Generating workout recommendation for screen 5');
      generateWorkoutRecommendation();
    }
  }, [currentScreen]);

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
      
      // Send the request to the AI service
      const response = await askCoachyAI(workoutRequestPrompt);
      
      console.log('✅ Received workout recommendation:', response);
      setWorkoutDescription(response);
    } catch (error) {
      console.error('❌ Error generating workout recommendation:', error);
      setError('Could not generate a workout recommendation at this time. Please try again later.');
      toast({
        variant: "destructive",
        title: "Error generating recommendation",
        description: "We couldn't create your personalized workout. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    generateWorkoutRecommendation();
  };

  return (
    <AnimatedCard 
      isVisible={currentScreen === 5} 
      className="h-full w-full"
    >
      <div className="h-full flex flex-col justify-center items-center p-4 text-center">
        <h2 className="text-2xl font-semibold mb-4">Your Practice Summary</h2>
        
        {isLoading ? (
          <div className="flex flex-col items-center justify-center space-y-4">
            <Loader2 className="h-10 w-10 text-coachy-blue animate-spin" />
            <p className="text-gray-600">Crafting your perfect practice...</p>
          </div>
        ) : error ? (
          <div className="space-y-4">
            <p className="text-red-500">{error}</p>
            <button 
              onClick={handleRetry}
              className="bg-coachy-blue hover:bg-coachy-blue/80 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : workoutDescription ? (
          <div className="space-y-4">
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
