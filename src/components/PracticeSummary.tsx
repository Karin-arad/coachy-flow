
import React, { useEffect } from 'react';
import { useFlowContext } from '@/context/FlowContext';
import { useWorkoutGeneration } from '@/hooks/useWorkoutGeneration';
import { useVideoSearch } from '@/hooks/useVideoSearch';
import LoadingState from './practice/LoadingState';
import ErrorState from './practice/ErrorState';
import WorkoutDisplay from './practice/WorkoutDisplay';
import VideoSection from './practice/VideoSection';
import Creature from './Creature';
import { useWorldBackground } from '@/hooks/useWorldBackground';
import { worlds, worldBackground } from '@/lib/worlds';

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

  useWorldBackground(worldBackground('neutral'));

  if (currentScreen !== 7) {
    return null;
  }

  return (
    <div className="screen">
      <div className="flex items-end gap-3">
        <h1 className="t-title flex-1">
          {isLoading || !workoutDescription ? 'מרכיבים לך אימון' : 'האימון שלך מוכן'}
        </h1>
        {workoutDescription && !isLoading && (
          <div className="w-[88px] h-[150px] flex-shrink-0">
            <Creature value={10} color={worlds.bounciness.creature} scale={0.36} />
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col min-h-0">

        {isLoading ? (
          <div className="flex-1 flex items-center justify-center"><LoadingState /></div>
        ) : error && retryCount < 3 ? (
          <ErrorState error={error} onRetry={handleRetry} />
        ) : workoutDescription ? (
          <div className="flex-1 flex flex-col gap-6 w-full">
            <div className="surface space-y-5">
              <WorkoutDisplay workoutDescription={workoutDescription} />
              <VideoSection
                videoId={videoId}
                videoTitle={videoTitle}
                onVideoRetry={handleVideoRetryClick}
              />
            </div>

            {/* Action buttons */}
            <div className="flex-1" />
            <div className="flex flex-col gap-3 w-full">
              {/* Opens the matched video on YouTube. A link, not window.open, so iOS doesn't block it. */}
              {videoId && (
                <a
                  href={`https://www.youtube.com/watch?v=${videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary !flex-none"
                >
                  התחלת אימון
                </a>
              )}
              <button
                className="btn-secondary !flex-none"
                onClick={() => goToScreen(6)}
              >
                משהו אחר
              </button>
            </div>
          </div>
        ) : (
          <p className="t-sub">
            מכינים לך אימון מותאם...
          </p>
        )}
      </div>
    </div>
  );
};

export default PracticeSummary;
