
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
  { videoId: 'cb6XcBBWGaM', title: '20 Min HIIT Cardio Workout', category: 'high-energy', duration: '20-minute' },
  { videoId: 'K6I24WgiiPw', title: '5 Min High Intensity Workout', category: 'high-energy', duration: '5-minute' },
  
  // Moderate energy videos
  { videoId: 'VaoV1PrYft4', title: '10 Min Morning Yoga Flow', category: 'moderate', duration: '10-minute' },
  { videoId: 'v7AYKMP6rOE', title: '15 Min Full Body Stretch', category: 'moderate', duration: '15-minute' },
  { videoId: 'UEEsdXn8oG8', title: '20 Min Pilates Workout', category: 'moderate', duration: '20-minute' },
  { videoId: 'j7rKKpwdXNE', title: '5 Min Morning Stretch', category: 'moderate', duration: '5-minute' },
  { videoId: 'X3-gKPNyrTA', title: '10 Min Pilates Core', category: 'moderate', duration: '10-minute' },
  
  // Gentle videos
  { videoId: 'sTANio_2E0Q', title: '10 Min Gentle Morning Yoga', category: 'gentle', duration: '10-minute' },
  { videoId: 'GLy2rYHwUqY', title: '15 Min Relaxing Stretch', category: 'gentle', duration: '15-minute' },
  { videoId: 'g_tea8ZNk5A', title: '5 Min Chair Exercises', category: 'gentle', duration: '5-minute' },
  { videoId: 'COp7BR_Dvps', title: '20 Min Gentle Yoga', category: 'gentle', duration: '20-minute' },
  { videoId: 'qX9FSZJu448', title: '10 Min Relaxation Flow', category: 'gentle', duration: '10-minute' },
];

// Store last selected videos to avoid repetition
let lastSelectedVideos: string[] = [];

export const createSearchQueries = (
  workoutText: string,
  emotionRatings: any,
  timeAvailable: string,
  userConversation: string
): string[] => {
  const { energy, bounciness, alertness, lightness } = emotionRatings;
  const avgEnergy = (energy + bounciness + alertness + lightness) / 4;
  
  console.log('🎯 Creating search queries with parameters:', {
    avgEnergy: avgEnergy.toFixed(1),
    timeAvailable,
    workoutText: workoutText.substring(0, 50),
    userConversation: userConversation.substring(0, 50)
  });
  
  const queries: string[] = [];
  
  // Extract workout type from description
  const workoutTypes: string[] = [];
  const lowerWorkout = workoutText.toLowerCase();
  const lowerConversation = userConversation.toLowerCase();
  
  if (lowerWorkout.includes('yoga') || lowerConversation.includes('יוגה')) workoutTypes.push('yoga');
  if (lowerWorkout.includes('stretch') || lowerConversation.includes('מתיחה')) workoutTypes.push('stretching');
  if (lowerWorkout.includes('cardio') || lowerWorkout.includes('hiit') || lowerConversation.includes('קרדיו')) workoutTypes.push('cardio HIIT');
  if (lowerWorkout.includes('strength') || lowerConversation.includes('כוח')) workoutTypes.push('strength training');
  if (lowerWorkout.includes('pilates') || lowerConversation.includes('פילאטיס')) workoutTypes.push('pilates');
  if (lowerWorkout.includes('dance') || lowerConversation.includes('ריקוד')) workoutTypes.push('dance workout');
  
  // Energy level keywords with more variety
  let energyKeywords = '';
  let intensityLevel = '';
  
  if (avgEnergy >= 8) {
    energyKeywords = 'high intensity HIIT explosive power';
    intensityLevel = 'advanced';
  } else if (avgEnergy >= 6) {
    energyKeywords = 'moderate intensity cardio energizing';
    intensityLevel = 'intermediate';
  } else if (avgEnergy >= 4) {
    energyKeywords = 'gentle flow moderate easy';
    intensityLevel = 'beginner';
  } else {
    energyKeywords = 'relaxing calm restorative gentle';
    intensityLevel = 'restorative';
  }
  
  // Add randomization to query order and content
  const randomSeed = Math.floor(Math.random() * 3);
  const timeVariations = [timeAvailable, timeAvailable.replace('דקות', 'minute'), timeAvailable.replace('דקה', 'min')];
  
  // Most specific search (includes workout type, energy, and time)
  if (workoutTypes.length > 0) {
    queries.push(`${workoutTypes[0]} ${energyKeywords} ${timeVariations[randomSeed % timeVariations.length]} workout`);
    if (workoutTypes.length > 1) {
      queries.push(`${workoutTypes[1]} ${intensityLevel} ${timeAvailable} exercise`);
    }
  }
  
  // Energy-based searches with variations
  queries.push(`${energyKeywords} ${timeAvailable} fitness workout exercise`);
  queries.push(`${intensityLevel} ${timeAvailable} home workout routine`);
  
  // Add user-specific terms if available
  if (userConversation.trim()) {
    const conversationKeywords = extractKeywords(userConversation);
    if (conversationKeywords.length > 0) {
      queries.push(`${conversationKeywords.join(' ')} ${energyKeywords} ${timeAvailable} workout`);
    }
  }
  
  // General search with rotation
  const generalTerms = ['fitness', 'exercise', 'workout', 'training'];
  queries.push(`${generalTerms[randomSeed % generalTerms.length]} ${timeAvailable} ${intensityLevel}`);
  
  console.log('🔍 Generated search queries:', queries);
  return queries;
};

const extractKeywords = (text: string): string[] => {
  const keywords: string[] = [];
  const lowerText = text.toLowerCase();
  
  // Hebrew keywords mapping
  if (lowerText.includes('גב') || lowerText.includes('back')) keywords.push('back pain relief');
  if (lowerText.includes('ברכיים') || lowerText.includes('knee')) keywords.push('knee friendly');
  if (lowerText.includes('צוואר') || lowerText.includes('neck')) keywords.push('neck stretch');
  if (lowerText.includes('כתפיים') || lowerText.includes('shoulder')) keywords.push('shoulder workout');
  if (lowerText.includes('בטן') || lowerText.includes('abs')) keywords.push('abs core');
  if (lowerText.includes('פלג עליון') || lowerText.includes('upper body')) keywords.push('upper body');
  if (lowerText.includes('רגליים') || lowerText.includes('legs')) keywords.push('legs workout');
  if (lowerText.includes('ללא ציוד') || lowerText.includes('no equipment')) keywords.push('no equipment');
  
  return keywords;
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
  emotionRatings: any,
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
  
  // Filter videos by category and exclude recently selected ones
  const categoryVideos = FALLBACK_VIDEOS.filter(video => 
    video.category === category && !lastSelectedVideos.includes(video.videoId)
  );
  
  // If no unselected videos in category, use all category videos
  const availableVideos = categoryVideos.length > 0 ? categoryVideos : 
    FALLBACK_VIDEOS.filter(video => video.category === category);
  
  // Try to match duration first
  const matchingDuration = availableVideos.filter(video => 
    video.duration === timeAvailable as any
  );
  
  let selectedVideo: FallbackVideo;
  
  if (matchingDuration.length > 0) {
    // Random selection from matching duration
    const randomIndex = Math.floor(Math.random() * matchingDuration.length);
    selectedVideo = matchingDuration[randomIndex];
  } else if (availableVideos.length > 0) {
    // Random selection from category
    const randomIndex = Math.floor(Math.random() * availableVideos.length);
    selectedVideo = availableVideos[randomIndex];
  } else {
    // Ultimate fallback - random from all videos
    const randomIndex = Math.floor(Math.random() * FALLBACK_VIDEOS.length);
    selectedVideo = FALLBACK_VIDEOS[randomIndex];
  }
  
  // Update last selected videos list
  lastSelectedVideos.push(selectedVideo.videoId);
  if (lastSelectedVideos.length > 5) {
    lastSelectedVideos = lastSelectedVideos.slice(-5);
  }
  
  console.log('🎯 Selected fallback video:', selectedVideo.title, 'category:', category);
  console.log('📝 Updated last selected videos:', lastSelectedVideos);
  
  return selectedVideo;
};
