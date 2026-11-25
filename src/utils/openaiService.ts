
import { getYouTubeApiKey } from './apiHelpers';

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ChatCompletionRequest {
  model: string;
  messages: ChatMessage[];
  temperature?: number;
  max_tokens?: number;
}

export interface ChatCompletionResponse {
  choices: {
    message: ChatMessage;
    finish_reason: string;
  }[];
}

export const createChatCompletion = async (
  messages: ChatMessage[],
  model: string = 'gpt-3.5-turbo'
): Promise<string> => {
  console.warn('This method is deprecated. Using custom server communication.');
  return messages[messages.length - 1].content; // Return last message content as a placeholder
};

export type YouTubeDurationFilter = 'any' | 'medium' | 'long';

/** ISO 8601 duration from the YouTube API ("PT1H2M30S") to minutes. */
export const isoDurationToMinutes = (iso: string): number => {
  const match = iso.match(/^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/);
  if (!match) return 0;
  const [, h, m, s] = match;
  return (Number(h) || 0) * 60 + (Number(m) || 0) + (Number(s) || 0) / 60;
};

/** Real length, in minutes, of each video. One cheap request for the whole list. */
export const fetchVideoDurations = async (videoIds: string[]): Promise<Record<string, number>> => {
  const apiKey = getYouTubeApiKey();
  if (!apiKey || videoIds.length === 0) return {};
  const url = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoIds.join(',')}&key=${apiKey}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('YouTube durations request failed');
  const data = await response.json();
  const durations: Record<string, number> = {};
  for (const item of data.items || []) {
    durations[item.id] = isoDurationToMinutes(item.contentDetails?.duration || '');
  }
  return durations;
};

export const fetchYouTubeData = async (query: string, videoDuration: YouTubeDurationFilter = 'any'): Promise<any> => {
  try {
    console.log('🔍 Fetching YouTube data for query:', query);
    const apiKey = getYouTubeApiKey();
    
    if (!apiKey) {
      console.error('❌ YouTube API key is missing');
      throw new Error('YouTube API key is not set. Please set your YouTube API key first.');
    }
    
    console.log('📡 Making YouTube API request with key:', apiKey.substring(0, 3) + '...' + apiKey.substring(apiKey.length - 3));
    
    // A search costs the same quota for 5 or 15 results, so ask for more candidates
    const maxResults = 15;
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&maxResults=${maxResults}&type=video&videoEmbeddable=true&videoDuration=${videoDuration}&key=${apiKey}`;
    
    console.log('🌐 YouTube API endpoint:', url.replace(apiKey, 'API_KEY_HIDDEN'));
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('⛔ YouTube API error response:', errorData);
      throw new Error(errorData.error?.message || 'שגיאה בבקשה לשירות YouTube');
    }
    
    const data = await response.json();
    console.log('✅ YouTube API response received:', data);
    console.log('📊 YouTube API response items count:', data.items?.length || 0);
    
    if (data.items && data.items.length > 0) {
      console.log('🎥 First video found:', {
        id: data.items[0].id.videoId,
        title: data.items[0].snippet.title
      });
    } else {
      console.warn('⚠️ No videos found in YouTube API response');
    }
    
    return data;
  } catch (error) {
    console.error('❌ Error in YouTube API request:', error);
    throw error;
  }
};
