import { fetchYouTubeData } from './openaiService';

export interface VideoData {
  id: { videoId: string };
  snippet: { title: string; description: string };
}

export interface FallbackVideo {
  videoId: string;
  title: string;
  category: 'high-energy' | 'moderate' | 'gentle';
  duration: '5-minute' | '10-minute' | '15-minute' | '20-minute' | '30-minute' | '45-minute' | '60-minute';
}

// Expanded curated list of reliable workout videos with longer durations
const FALLBACK_VIDEOS: FallbackVideo[] = [
  // High energy videos - 5-20 minutes
  { videoId: 'ML4kp4lWn00', title: '10 Min Beginner Ab Workout', category: 'high-energy', duration: '10-minute' },
  { videoId: '8iOjkB2NuuE', title: '5 Minute Fat Burning Workout', category: 'high-energy', duration: '5-minute' },
  { videoId: 'IODxDxX7oi4', title: '15 Min Full Body HIIT Workout', category: 'high-energy', duration: '15-minute' },
  { videoId: 'cb6XcBBWGaM', title: '20 Min HIIT Cardio Workout', category: 'high-energy', duration: '20-minute' },
  { videoId: 'K6I24WgiiPw', title: '5 Min High Intensity Workout', category: 'high-energy', duration: '5-minute' },
  
  // High energy videos - 30-60 minutes
  { videoId: 'gC_L9qAHVJ8', title: '30 Min Full Body HIIT Workout', category: 'high-energy', duration: '30-minute' },
  { videoId: 'M0uO8X3_tEA', title: '45 Min Total Body HIIT', category: 'high-energy', duration: '45-minute' },
  { videoId: 'ml6cT4AZdqI', title: '60 Min Full Body HIIT Challenge', category: 'high-energy', duration: '60-minute' },
  { videoId: 'UBMk30rjy0o', title: '30 Min Cardio HIIT Workout', category: 'high-energy', duration: '30-minute' },
  { videoId: 'dP1Hx8dRnWU', title: '45 Min High Energy Cardio', category: 'high-energy', duration: '45-minute' },
  
  // Moderate energy videos - 5-20 minutes
  { videoId: 'VaoV1PrYft4', title: '10 Min Morning Yoga Flow', category: 'moderate', duration: '10-minute' },
  { videoId: 'v7AYKMP6rOE', title: '15 Min Full Body Stretch', category: 'moderate', duration: '15-minute' },
  { videoId: 'UEEsdXn8oG8', title: '20 Min Pilates Workout', category: 'moderate', duration: '20-minute' },
  { videoId: 'j7rKKpwdXNE', title: '5 Min Morning Stretch', category: 'moderate', duration: '5-minute' },
  { videoId: 'X3-gKPNyrTA', title: '10 Min Pilates Core', category: 'moderate', duration: '10-minute' },
  
  // Moderate energy videos - 30-60 minutes
  { videoId: 'b1H3xO3x_Js', title: '30 Min Vinyasa Yoga Flow', category: 'moderate', duration: '30-minute' },
  { videoId: 'R6gZoF-ITEc', title: '45 Min Power Yoga Class', category: 'moderate', duration: '45-minute' },
  { videoId: 'GLZbUWdGGlE', title: '60 Min Complete Yoga Practice', category: 'moderate', duration: '60-minute' },
  { videoId: 'yx5FKtGSch8', title: '30 Min Full Body Pilates', category: 'moderate', duration: '30-minute' },
  { videoId: 'hqzOxZxtgqY', title: '45 Min Yoga Flow for Strength', category: 'moderate', duration: '45-minute' },
  
  // Gentle videos - 5-20 minutes
  { videoId: 'sTANio_2E0Q', title: '10 Min Gentle Morning Yoga', category: 'gentle', duration: '10-minute' },
  { videoId: 'GLy2rYHwUqY', title: '15 Min Relaxing Stretch', category: 'gentle', duration: '15-minute' },
  { videoId: 'g_tea8ZNk5A', title: '5 Min Chair Exercises', category: 'gentle', duration: '5-minute' },
  { videoId: 'COp7BR_Dvps', title: '20 Min Gentle Yoga', category: 'gentle', duration: '20-minute' },
  { videoId: 'qX9FSZJu448', title: '10 Min Relaxation Flow', category: 'gentle', duration: '10-minute' },
  
  // Gentle videos - 30-60 minutes
  { videoId: 'XeXz8fIZDCE', title: '30 Min Gentle Hatha Yoga', category: 'gentle', duration: '30-minute' },
  { videoId: '0o0kNeOyBws', title: '45 Min Restorative Yoga', category: 'gentle', duration: '45-minute' },
  { videoId: 'j9q6q-wJ4sU', title: '60 Min Deep Relaxation Yoga', category: 'gentle', duration: '60-minute' },
  { videoId: 'CrEPRNUuJkM', title: '30 Min Yin Yoga Practice', category: 'gentle', duration: '30-minute' },
  { videoId: 'aHrBg1UQbys', title: '45 Min Gentle Flow Yoga', category: 'gentle', duration: '45-minute' },
];

// Store last selected videos to avoid repetition
let lastSelectedVideos: string[] = [];

// Map time strings to duration categories for better matching
const mapTimeToDuration = (timeAvailable: string): string[] => {
  const lowerTime = timeAvailable.toLowerCase();
  
  // Return array of durations in order of preference
  if (lowerTime.includes('5') || lowerTime.includes('חמש')) {
    return ['5-minute', '10-minute', '15-minute'];
  } else if (lowerTime.includes('10') || lowerTime.includes('עשר')) {
    return ['10-minute', '5-minute', '15-minute'];
  } else if (lowerTime.includes('15') || lowerTime.includes('חמש עשרה')) {
    return ['15-minute', '10-minute', '20-minute'];
  } else if (lowerTime.includes('20') || lowerTime.includes('עשרים')) {
    return ['20-minute', '15-minute', '30-minute'];
  } else if (lowerTime.includes('30') || lowerTime.includes('שלושים')) {
    return ['30-minute', '20-minute', '45-minute'];
  } else if (lowerTime.includes('45') || lowerTime.includes('ארבעים וחמש')) {
    return ['45-minute', '30-minute', '60-minute'];
  } else if (lowerTime.includes('60') || lowerTime.includes('שישים') || lowerTime.includes('שעה')) {
    return ['60-minute', '45-minute', '30-minute'];
  }
  
  // Default fallback for unrecognized time formats
  return ['15-minute', '10-minute', '20-minute', '30-minute'];
};

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
