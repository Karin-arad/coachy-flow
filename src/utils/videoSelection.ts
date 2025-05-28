
import { FallbackVideo, VideoData, EmotionRatings } from '../types/video';
import { FALLBACK_VIDEOS } from '../data/fallbackVideos';
import { mapTimeToDuration } from './videoSearch';
import { validateVideo } from './videoValidation';
import { fetchYouTubeData } from './openaiService';

// Store last selected videos to avoid repetition
let lastSelectedVideos: string[] = [];

export const searchWithMultipleQueries = async (queries: string[]): Promise<VideoData | null> => {
  const maxVideosToFetch = 10; // Fetch more videos to have variety
  
  for (const query of queries) {
    try {
      console.log('🔍 Trying search query:', query);
      const videoData = await fetchYouTubeData(query);
      
      if (videoData?.items && videoData.items.length > 0) {
        // Filter out recently selected videos and find a new one
        const availableVideos = videoData.items.filter((video: VideoData) => 
          !lastSelectedVideos.includes(video.id.videoId)
        );
        
        // If all videos were recently used, use all available videos
        const videosToCheck = availableVideos.length > 0 ? availableVideos : videoData.items;
        
        // Try different videos, not just the first one
        const randomIndex = Math.floor(Math.random() * Math.min(videosToCheck.length, 3));
        const video = videosToCheck[randomIndex];
        
        const isValid = await validateVideo(video.id.videoId);
        
        if (isValid) {
          // Update last selected videos list
          lastSelectedVideos.push(video.id.videoId);
          if (lastSelectedVideos.length > 5) {
            lastSelectedVideos = lastSelectedVideos.slice(-5); // Keep only last 5
          }
          
          console.log('✅ Found valid video:', video.snippet.title, video.id.videoId);
          console.log('📝 Updated last selected videos:', lastSelectedVideos);
          return video;
        }
      }
    } catch (error) {
      console.warn('⚠️ Search query failed:', query, error);
      continue;
    }
  }
  
  console.warn('⚠️ All search queries failed');
  return null;
};

export const getFallbackVideo = (
  emotionRatings: EmotionRatings,
  timeAvailable: string
): FallbackVideo => {
  const { energy, bounciness, alertness, lightness } = emotionRatings;
  const avgEnergy = (energy + bounciness + alertness + lightness) / 4;
  
  console.log('🎯 Selecting fallback video with avgEnergy:', avgEnergy.toFixed(1), 'timeAvailable:', timeAvailable);
  
  // Determine category based on energy
  let category: 'high-energy' | 'moderate' | 'gentle';
  if (avgEnergy >= 7) {
    category = 'high-energy';
  } else if (avgEnergy >= 4) {
    category = 'moderate';
  } else {
    category = 'gentle';
  }
  
  // Get preferred durations based on user's time selection
  const preferredDurations = mapTimeToDuration(timeAvailable);
  console.log('🕐 Preferred durations for time "' + timeAvailable + '":', preferredDurations);
  
  // Filter videos by category and exclude recently selected ones
  let availableVideos = FALLBACK_VIDEOS.filter(video => 
    video.category === category && !lastSelectedVideos.includes(video.videoId)
  );
  
  // If no unselected videos in category, use all category videos
  if (availableVideos.length === 0) {
    availableVideos = FALLBACK_VIDEOS.filter(video => video.category === category);
    console.log('🔄 No unselected videos in category, using all category videos');
  }
  
  let selectedVideo: FallbackVideo | null = null;
  
  // Try to find video matching preferred durations in order
  for (const duration of preferredDurations) {
    const matchingVideos = availableVideos.filter(video => video.duration === duration);
    if (matchingVideos.length > 0) {
      const randomIndex = Math.floor(Math.random() * matchingVideos.length);
      selectedVideo = matchingVideos[randomIndex];
      console.log(`✅ Found video with duration ${duration}:`, selectedVideo.title);
      break;
    }
  }
  
  // If no duration match found, select randomly from available videos in category
  if (!selectedVideo && availableVideos.length > 0) {
    const randomIndex = Math.floor(Math.random() * availableVideos.length);
    selectedVideo = availableVideos[randomIndex];
    console.log('🎲 No duration match, selected random video from category:', selectedVideo.title);
  }
  
  // Ultimate fallback - random from all videos
  if (!selectedVideo) {
    const randomIndex = Math.floor(Math.random() * FALLBACK_VIDEOS.length);
    selectedVideo = FALLBACK_VIDEOS[randomIndex];
    console.log('🆘 Ultimate fallback, selected random video:', selectedVideo.title);
  }
  
  // Update last selected videos list
  lastSelectedVideos.push(selectedVideo.videoId);
  if (lastSelectedVideos.length > 5) {
    lastSelectedVideos = lastSelectedVideos.slice(-5);
  }
  
  console.log('🎯 Selected fallback video:', selectedVideo.title, 'category:', category, 'duration:', selectedVideo.duration);
  console.log('📝 Updated last selected videos:', lastSelectedVideos);
  
  return selectedVideo;
};
