
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

// Kept for potential future compatibility, but not actively used
export const createChatCompletion = async (
  messages: ChatMessage[],
  model: string = 'gpt-3.5-turbo'
): Promise<string> => {
  console.warn('This method is deprecated. Using custom server communication.');
  return messages[messages.length - 1].content; // Return last message content as a placeholder
};

// For future use with YouTube API
export const fetchYouTubeData = async (query: string): Promise<any> => {
  try {
    const apiKey = getYouTubeApiKey();
    
    if (!apiKey) {
      throw new Error('YouTube API key is not set. Please set your YouTube API key first.');
    }
    
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&key=${apiKey}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'שגיאה בבקשה לשירות YouTube');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error in YouTube API request:', error);
    throw error;
  }
};

