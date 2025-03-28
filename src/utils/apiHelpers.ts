
// API Key Constants
export const OPENAI_API_KEY_STORAGE = 'openai-api-key';
export const YOUTUBE_API_KEY_STORAGE = 'youtube-api-key';

/**
 * גישה למפתח ה-API של OpenAI מה-localStorage
 * @returns מפתח ה-API או null אם לא קיים
 */
export const getOpenAIApiKey = (): string | null => {
  return localStorage.getItem(OPENAI_API_KEY_STORAGE);
};

/**
 * גישה למפתח ה-API של YouTube מה-localStorage
 * @returns מפתח ה-API או null אם לא קיים
 */
export const getYouTubeApiKey = (): string | null => {
  return localStorage.getItem(YOUTUBE_API_KEY_STORAGE);
};

/**
 * יצירת הכותרות הדרושות לבקשות API של OpenAI
 * @returns אובייקט headers לשימוש בבקשות fetch
 */
export const getOpenAIHeaders = (): HeadersInit => {
  const apiKey = getOpenAIApiKey();
  
  if (!apiKey) {
    throw new Error('API key is not set. Please set your OpenAI API key first.');
  }
  
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
  };
};

/**
 * יצירת הכותרות הדרושות לבקשות API של YouTube
 * @returns אובייקט headers לשימוש בבקשות fetch
 */
export const getYouTubeHeaders = (): HeadersInit => {
  const apiKey = getYouTubeApiKey();
  
  if (!apiKey) {
    throw new Error('API key is not set. Please set your YouTube API key first.');
  }
  
  return {
    'Content-Type': 'application/json'
  };
};

/**
 * בדיקה האם מפתח API של OpenAI קיים
 * @returns בוליאני המציין האם המפתח קיים
 */
export const hasOpenAIApiKey = (): boolean => {
  return !!getOpenAIApiKey();
};

/**
 * בדיקה האם מפתח API של YouTube קיים
 * @returns בוליאני המציין האם המפתח קיים
 */
export const hasYouTubeApiKey = (): boolean => {
  return !!getYouTubeApiKey();
};
