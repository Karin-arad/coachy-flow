
import { useState } from 'react';
import { EmotionRatings } from '@/types/video';
import { createSearchQueries, searchWithMultipleQueries, getFallbackVideo, validateVideo } from '@/utils/videoService';
import { toast } from '@/hooks/use-toast';

export const useVideoSearch = () => {
  const [videoId, setVideoId] = useState<string | null>(null);
  const [videoTitle, setVideoTitle] = useState<string>('');
  const [videoSearchAttempts, setVideoSearchAttempts] = useState(0);

  const searchForWorkoutVideoEnhanced = async (
    workoutText: string,
    emotionRatings: EmotionRatings,
    timeAvailable: string,
    userConversation: string
  ) => {
    try {
      console.log('🔍 Starting enhanced video search for workout:', workoutText);
      setVideoSearchAttempts(prev => prev + 1);
      
      const searchQueries = createSearchQueries(workoutText, emotionRatings, timeAvailable, userConversation);
      const foundVideo = await searchWithMultipleQueries(searchQueries);
      
      if (foundVideo) {
        setVideoId(foundVideo.id.videoId);
        setVideoTitle(foundVideo.snippet.title);
        console.log('✅ Found and validated YouTube video:', foundVideo.snippet.title, foundVideo.id.videoId);
        toast({
          title: "Video found!",
          description: "Found a perfect workout video for your practice.",
        });
      } else {
        console.log('⚠️ No videos found through search, using smart fallback');
        await useSmartFallback(emotionRatings, timeAvailable);
      }
    } catch (error) {
      console.error('❌ Error in enhanced video search:', error);
      await useSmartFallback(emotionRatings, timeAvailable);
    }
  };

  const useSmartFallback = async (emotionRatings: EmotionRatings, timeAvailable: string) => {
    try {
      console.log('🎯 Using smart fallback video selection');
      const fallbackVideo = getFallbackVideo(emotionRatings, timeAvailable);
      
      const isValid = await validateVideo(fallbackVideo.videoId);
      
      if (isValid) {
        setVideoId(fallbackVideo.videoId);
        setVideoTitle(fallbackVideo.title);
        console.log('✅ Using validated fallback video:', fallbackVideo.title, fallbackVideo.videoId);
        toast({
          title: "Backup video selected",
          description: "We've selected a curated workout that matches your preferences.",
        });
      } else {
        console.error('❌ Even fallback video failed validation');
        setVideoId(null);
        setVideoTitle('');
        toast({
          variant: "destructive",
          title: "Video unavailable",
          description: "Unable to load a workout video right now. Please try again later.",
        });
      }
    } catch (error) {
      console.error('❌ Error in smart fallback:', error);
      setVideoId(null);
      setVideoTitle('');
    }
  };

  const handleVideoRetry = (
    workoutDescription: string,
    emotionRatings: EmotionRatings,
    timeAvailable: string,
    userConversation: string
  ) => {
    if (workoutDescription) {
      searchForWorkoutVideoEnhanced(workoutDescription, emotionRatings, timeAvailable, userConversation);
    }
  };

  const resetVideoSearch = () => {
    setVideoSearchAttempts(0);
  };

  return {
    videoId,
    videoTitle,
    videoSearchAttempts,
    searchForWorkoutVideoEnhanced,
    handleVideoRetry,
    resetVideoSearch
  };
};
