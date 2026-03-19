
import React, { useEffect } from 'react';
import { useFlowContext } from '@/context/FlowContext';
import AnimatedCard from './AnimatedCard';
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
    if (currentScreen === 7 && !workoutDescription && !isLoading && retryCount < 3) {
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

  if (currentScreen !== 7) {
    return null;
  }

  return (
    <AnimatedCard
      isVisible={true}
      className="h-full w-full"
    >
      <div className="h-full flex flex-col justify-start items-center p-4 text-center overflow-y-auto">
        {/* Celebration header */}
        <div className="flex flex-col items-center mb-5">
          <span style={{ fontSize: 40 }}>🎉</span>
          <h2 className="text-[22px] font-bold text-[hsl(var(--foreground))] mt-1">
            Your Practice Summary
          </h2>
        </div>

        {isLoading ? (
          <LoadingState />
        ) : error && retryCount < 3 ? (
          <ErrorState error={error} onRetry={handleRetry} />
        ) : workoutDescription ? (
          <div className="space-y-4 w-full flex-1 overflow-y-auto">
            {/* White card wrapping workout + video */}
            <div className="bg-white rounded-[20px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.06)] p-5 space-y-4">
              <WorkoutDisplay workoutDescription={workoutDescription} />
              <VideoSection
                videoId={videoId}
                videoTitle={videoTitle}
                onVideoRetry={handleVideoRetryClick}
              />
            </div>

            {/* Action buttons */}
            <div className="mt-4 space-y-3 w-full">
              <button
                className="w-full py-3 rounded-[14px] bg-[hsl(var(--primary))] text-white font-semibold text-[15px]"
                onClick={() => {/* start workout */}}
              >
                Start Workout
              </button>
              <button
                className="w-full py-3 rounded-[14px] border border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] font-medium text-[15px]"
                onClick={() => goToScreen(6)}
              >
                Find Something Else
              </button>
            </div>
          </div>
        ) : (
          <p className="text-[hsl(var(--muted-foreground))] mb-8">
            Preparing your personalized practice...
          </p>
        )}
      </div>
    </AnimatedCard>
  );
};

export default PracticeSummary;
