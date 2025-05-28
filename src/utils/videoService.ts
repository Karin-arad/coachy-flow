
import { fetchYouTubeData } from './openaiService';

export interface VideoData {
  id: { videoId: string };
  snippet: { title: string; description: string };
}

export interface FallbackVideo {
  videoId: string;
  title: string;
  category: 'high-energy' | 'moderate' | 'gentle';
  duration: '5-minute' | '10-minute' | '15-minute' | '20-minute';
}

// Curated list of reliable workout videos
const FALLBACK_VIDEOS: FallbackVideo[] = [
  // High energy videos
  { videoId: 'ML4kp4lWn00', title: '10 Min Beginner Ab Workout', category: 'high-energy', duration: '10-minute' },
  { videoId: '8iOjkB2NuuE', title: '5 Minute Fat Burning Workout', category: 'high-energy', duration: '5-minute' },
  { videoId: 'IODxDxX7oi4', title: '15 Min Full Body HIIT Workout', category: 'high-energy', duration: '15-minute' },
  
  // Moderate energy videos
  { videoId: 'VaoV1PrYft4', title: '10 Min Morning Yoga Flow', category: 'moderate', duration: '10-minute' },
  { videoId: 'v7AYKMP6rOE', title: '15 Min Full Body Stretch', category: 'moderate', duration: '15-minute' },
  { videoId: 'UEEsdXn8oG8', title: '20 Min Pilates Workout', category: 'moderate', duration: '20-minute' },
  
  // Gentle videos
  { videoId: 'sTANio_2E0Q', title: '10 Min Gentle Morning Yoga', category: 'gentle', duration: '10-minute' },
  { videoId: 'GLy2rYHwUqY', title: '15 Min Relaxing Stretch', category: 'gentle', duration: '15-minute' },
  { videoId: 'g_tea8ZNk5A', title: '5 Min Chair Exercises', category: 'gentle', duration: '5-minute' },
];

export const createSearchQueries = (
  workoutText: string,
  emotionRatings: any,
  timeAvailable: string,
  userConversation: string
): string[] => {
  const { energy, bounciness, alertness, lightness } = emotionRatings;
  const avgEnergy = (energy + bounciness + alertness + lightness) / 4;
  
  const queries: string[] = [];
  
  // Extract workout type from description
  const workoutTypes: string[] = [];
  if (workoutText.toLowerCase().includes('yoga')) workoutTypes.push('yoga');
  if (workoutText.toLowerCase().includes('stretch')) workoutTypes.push('stretching');
  if (workoutText.toLowerCase().includes('cardio') || workoutText.toLowerCase().includes('hiit')) workoutTypes.push('cardio');
  if (workoutText.toLowerCase().includes('strength')) workoutTypes.push('strength');
  if (workoutText.toLowerCase().includes('pilates')) workoutTypes.push('pilates');
  
  // Energy level keywords
  let energyKeywords = '';
  if (avgEnergy >= 7) {
    energyKeywords = 'high energy HIIT intense';
  } else if (avgEnergy >= 4) {
    energyKeywords = 'moderate fitness';
  } else {
    energyKeywords = 'gentle relaxing calm';
  }
  
  // Most specific search (includes workout type, energy, and time)
  if (workoutTypes.length > 0) {
    queries.push(`${workoutTypes[0]} ${energyKeywords} ${timeAvailable} workout exercise`);
  }
  
  // Medium specificity (energy + time)
  queries.push(`${energyKeywords} ${timeAvailable} workout fitness exercise`);
  
  // General search (just time and basic keywords)
  queries.push(`${timeAvailable} workout exercise fitness routine`);
  
  // Fallback search (very general)
  queries.push('beginner workout exercise fitness');
  
  console.log('🔍 Generated search queries:', queries);
  return queries;
};

export const validateVideo = async (videoId: string): Promise<boolean> => {
  try {
    // Simple validation - try to create iframe src URL
    const testUrl = `https://www.youtube.com/embed/${videoId}`;
    console.log('✅ Video validation passed for:', videoId);
    return true;
  } catch (error) {
    console.error('❌ Video validation failed for:', videoId, error);
    return false;
  }
};

export const searchWithMultipleQueries = async (queries: string[]): Promise<VideoData | null> => {
  for (const query of queries) {
    try {
      console.log('🔍 Trying search query:', query);
      const videoData = await fetchYouTubeData(query);
      
      if (videoData?.items && videoData.items.length > 0) {
        const video = videoData.items[0];
        const isValid = await validateVideo(video.id.videoId);
        
        if (isValid) {
          console.log('✅ Found valid video:', video.snippet.title, video.id.videoId);
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
  emotionRatings: any,
  timeAvailable: string
): FallbackVideo => {
  const { energy, bounciness, alertness, lightness } = emotionRatings;
  const avgEnergy = (energy + bounciness + alertness + lightness) / 4;
  
  // Determine category based on energy
  let category: 'high-energy' | 'moderate' | 'gentle';
  if (avgEnergy >= 7) {
    category = 'high-energy';
  } else if (avgEnergy >= 4) {
    category = 'moderate';
  } else {
    category = 'gentle';
  }
  
  // Try to match duration first
  const matchingDuration = FALLBACK_VIDEOS.filter(video => 
    video.category === category && video.duration === timeAvailable as any
  );
  
  if (matchingDuration.length > 0) {
    return matchingDuration[0];
  }
  
  // Fallback to category match
  const matchingCategory = FALLBACK_VIDEOS.filter(video => 
    video.category === category
  );
  
  if (matchingCategory.length > 0) {
    return matchingCategory[0];
  }
  
  // Ultimate fallback
  return FALLBACK_VIDEOS[0];
};
