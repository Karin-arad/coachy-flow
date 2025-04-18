
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

export const fetchYouTubeData = async (query: string): Promise<any> => {
  try {
    console.log('🔍 Fetching YouTube data for query:', query);
    const apiKey = getYouTubeApiKey();
    
    if (!apiKey) {
      console.error('❌ YouTube API key is missing');
      throw new Error('YouTube API key is not set. Please set your YouTube API key first.');
    }
    
    console.log('📡 Making YouTube API request with key:', apiKey.substring(0, 3) + '...' + apiKey.substring(apiKey.length - 3));
    
    const maxResults = 5; // Get top 5 results to have alternatives if needed
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&maxResults=${maxResults}&type=video&key=${apiKey}`;
    
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
