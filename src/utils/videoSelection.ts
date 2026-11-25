
import { FallbackVideo, VideoData, EmotionRatings } from '../types/video';
import { FALLBACK_VIDEOS } from '../data/fallbackVideos';
import { mapTimeToDuration } from './videoSearch';
import { validateVideo } from './videoValidation';
import { fetchYouTubeData, fetchVideoDurations, YouTubeDurationFilter } from './openaiService';

// Recently suggested videos, kept across visits so people get variety
const RECENT_KEY = 'coachy_recent_videos';
const RECENT_LIMIT = 15;

const loadRecent = (): string[] => {
  try {
    const stored = JSON.parse(localStorage.getItem(RECENT_KEY) || '[]');
    return Array.isArray(stored) ? stored.filter((id) => typeof id === 'string') : [];
  } catch {
    return [];
  }
};

let lastSelectedVideos: string[] = loadRecent();

const rememberVideo = (videoId: string) => {
  lastSelectedVideos = [...lastSelectedVideos.filter((id) => id !== videoId), videoId].slice(-RECENT_LIMIT);
  try {
    localStorage.setItem(RECENT_KEY, JSON.stringify(lastSelectedVideos));
  } catch {
    // storage can be unavailable (private mode); variety then lasts for this visit only
  }
};

const pickRandom = <T,>(items: T[]): T => items[Math.floor(Math.random() * items.length)];

/** A video fits when it is at most 20% shorter or 15% longer than the time asked for. */
export const fitsDuration = (videoMinutes: number, targetMinutes: number): boolean =>
  videoMinutes >= targetMinutes * 0.8 && videoMinutes <= targetMinutes * 1.15;

/** YouTube's own length buckets: medium is 4-20 minutes, long is over 20. */
const durationFilterFor = (targetMinutes?: number | null): YouTubeDurationFilter => {
  if (!targetMinutes) return 'any';
  if (targetMinutes <= 15) return 'medium';
  if (targetMinutes >= 25) return 'long';
  return 'any'; // around 20 minutes sits on the boundary between the two buckets
};

export const searchWithMultipleQueries = async (
  queries: string[],
  targetMinutes?: number | null
): Promise<VideoData | null> => {
  const filter = durationFilterFor(targetMinutes);

  for (const query of queries) {
    try {
      console.log('🔍 Trying search query:', query);
      const videoData = await fetchYouTubeData(query, filter);
      const items: VideoData[] = videoData?.items || [];
      if (items.length === 0) continue;

      let candidates = items;

      if (targetMinutes) {
        // Check the real length of every result; titles often promise a different one
        try {
          const durations = await fetchVideoDurations(items.map((video) => video.id.videoId));
          candidates = items.filter((video) => fitsDuration(durations[video.id.videoId] ?? 0, targetMinutes));
          console.log(`⏱️ ${candidates.length} of ${items.length} results fit ${targetMinutes} minutes`);
          if (candidates.length === 0) continue; // try the next query
        } catch (error) {
          console.warn('⚠️ Could not check video lengths, using search results as they are', error);
        }
      }

      // Prefer videos this person has not been shown recently, then pick at random among them
      const fresh = candidates.filter((video) => !lastSelectedVideos.includes(video.id.videoId));
      const video = pickRandom(fresh.length > 0 ? fresh : candidates);

      if (await validateVideo(video.id.videoId)) {
        rememberVideo(video.id.videoId);
        console.log('✅ Found valid video:', video.snippet.title, video.id.videoId);
        return video;
      }
    } catch (error) {
      console.warn('⚠️ Search query failed:', query, error);
      continue;
    }
  }

  console.warn('⚠️ No search result matched');
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
  
  // The length asked for comes first: in this energy level, then in any level,
  // and only then the next closest length
  for (const duration of preferredDurations) {
    const inCategory = FALLBACK_VIDEOS.filter(video => video.category === category && video.duration === duration);
    const anyCategory = FALLBACK_VIDEOS.filter(video => video.duration === duration);
    const pool = inCategory.length > 0 ? inCategory : anyCategory;
    if (pool.length > 0) {
      const fresh = pool.filter(video => !lastSelectedVideos.includes(video.videoId));
      selectedVideo = pickRandom(fresh.length > 0 ? fresh : pool);
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
  
  rememberVideo(selectedVideo.videoId);

  console.log('🎯 Selected fallback video:', selectedVideo.title, 'category:', category, 'duration:', selectedVideo.duration);
  
  return selectedVideo;
};
