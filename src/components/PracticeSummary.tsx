
import React, { useEffect } from 'react';
import { useFlowContext } from '@/context/FlowContext';
import AnimatedCard from './AnimatedCard';
import { Button } from '@/components/ui/button';
import { useWorkoutGeneration } from '@/hooks/useWorkoutGeneration';
import { useVideoSearch } from '@/hooks/useVideoSearch';
import LoadingState from './practice/LoadingState';
import ErrorState from './practice/ErrorState';
import WorkoutDisplay from './practice/WorkoutDisplay';
import VideoSection from './practice/VideoSection';

const PracticeSummary = () => {
  const { currentScreen, emotionRatings, userConversation, timeAvailable, goToScreen } = useFlowContext();
  
  const {
    isLoading,
    workoutDescription,
    error,
    retryCount,
    generateWorkoutRecommendation,
    handleManualRetry
  } = useWorkoutGeneration();

  const {
    videoId,
    videoTitle,
    searchForWorkoutVideoEnhanced,
    handleVideoRetry,
    resetVideoSearch
  } = useVideoSearch();

  useEffect(() => {
    console.log('PracticeSummary loaded, currentScreen:', currentScreen);
    if (currentScreen === 7 && !workoutDescription && !isLoading && retryCount < 3) {
      console.log('Generating workout recommendation for screen 7');
      handleWorkoutGeneration();
    }
  }, [currentScreen, retryCount]);

  const handleWorkoutGeneration = async () => {
    try {
      const response = await generateWorkoutRecommendation(emotionRatings, userConversation, timeAvailable);
      if (response) {
        await searchForWorkoutVideoEnhanced(response, emotionRatings, timeAvailable, userConversation);
      }
    } catch (error) {
      // Error is already handled in the hook
    }
  };

  const handleRetry = () => {
    handleManualRetry();
    resetVideoSearch();
    handleWorkoutGeneration();
  };

  const handleVideoRetryClick = () => {
    handleVideoRetry(workoutDescription!, emotionRatings, timeAvailable, userConversation);
  };

  const handlePrevious = () => {
    goToScreen(6);
  };

  if (currentScreen !== 7) {
    return null;
  }

  return (
    <AnimatedCard 
      isVisible={true} 
      className="h-full w-full"
    >
      <div className="h-full flex flex-col justify-start items-center p-4 text-center overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-4">Your Practice Summary</h2>
        
        {isLoading ? (
          <LoadingState />
        ) : error && retryCount < 3 ? (
          <ErrorState error={error} onRetry={handleRetry} />
        ) : workoutDescription ? (
          <div className="space-y-4 w-full flex-1 overflow-y-auto">
            <WorkoutDisplay workoutDescription={workoutDescription} />
            <VideoSection 
              videoId={videoId}
              videoTitle={videoTitle}
              onVideoRetry={handleVideoRetryClick}
            />
            
            <div className="mt-6">
              <Button 
                onClick={handlePrevious}
                variant="outline"
                className="w-full py-3 rounded-xl"
              >
                חזרה
              </Button>
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
