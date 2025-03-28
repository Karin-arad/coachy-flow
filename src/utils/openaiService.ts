import { getOpenAIHeaders, getYouTubeApiKey } from './apiHelpers';

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
  try {
    const headers = getOpenAIHeaders();
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.7,
        max_tokens: 500,
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'שגיאה בבקשה לשירות OpenAI');
    }
    
    const data: ChatCompletionResponse = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error in OpenAI request:', error);
    throw error;
  }
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
