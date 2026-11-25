import React, { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useFlowContext } from '@/context/FlowContext';
import { useWorkoutGeneration } from '@/hooks/useWorkoutGeneration';
import { useVideoSearch } from '@/hooks/useVideoSearch';
import LoadingState from './practice/LoadingState';
import ErrorState from './practice/ErrorState';
import WorkoutDisplay from './practice/WorkoutDisplay';
import VideoSection from './practice/VideoSection';
import Creature from './Creature';
import { useWorldBackground } from '@/hooks/useWorldBackground';
import { worlds, worldBackground, moodFor } from '@/lib/worlds';

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

  const [playing, setPlaying] = useState(false);

  useWorldBackground(worldBackground('neutral'));

  if (currentScreen !== 7) {
    return null;
  }

  const ready = Boolean(workoutDescription) && !isLoading;

  // What the match was based on, in the person's own answers
  const recap = [
    moodFor('bounciness', emotionRatings.bounciness),
    moodFor('energy', emotionRatings.energy),
    moodFor('alertness', emotionRatings.alertness),
    moodFor('lightness', emotionRatings.lightness),
    timeAvailable ? `${timeAvailable} דקות` : '',
  ].filter(Boolean);

  return (
    <div className="screen">
      <div className="flex items-end gap-3">
        <h1 className="t-title flex-1">{ready ? 'האימון שלך מוכן' : 'מרכיבים לך אימון'}</h1>
        {ready && (
          <div className="w-[88px] h-[150px] flex-shrink-0">
            <Creature value={10} color={worlds.bounciness.creature} scale={0.36} />
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="flex-1 flex items-center justify-center"><LoadingState /></div>
      ) : error && retryCount < 3 ? (
        <ErrorState error={error} onRetry={handleRetry} />
      ) : workoutDescription ? (
        <>
          <div>
            <p className="t-label mb-2">לפי מה שסיפרת</p>
            <ul className="flex flex-wrap gap-2">
              {recap.map((item, i) => (
                <li key={i} className="chip">{item}</li>
              ))}
            </ul>
          </div>

          <VideoSection
            videoId={videoId}
            videoTitle={videoTitle}
            onVideoRetry={handleVideoRetryClick}
            playing={playing}
          />

          <details className="disclosure surface !py-2">
            <summary>
              <span>פירוט האימון</span>
              <ChevronDown size={20} className="disclosure-chevron transition-transform" aria-hidden="true" />
            </summary>
            <div className="pt-2 pb-3">
              <WorkoutDisplay workoutDescription={workoutDescription} />
            </div>
          </details>

          <div className="flex-1" />

          <div className="flex flex-col gap-3 w-full">
            {/* Plays the matched video here. The YouTube link sits under the player. */}
            {videoId && !playing && (
              <button
                type="button"
                className="btn-primary !flex-none"
                onClick={() => {
                  setPlaying(true);
                  document.getElementById('workout-video')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
              >
                התחלת אימון
              </button>
            )}
            <button
              className="btn-secondary !flex-none"
              onClick={() => goToScreen(6)}
            >
              משהו אחר
            </button>
          </div>
        </>
      ) : (
        <p className="t-sub">מכינים לך אימון מותאם...</p>
      )}
    </div>
  );
};

export default PracticeSummary;
