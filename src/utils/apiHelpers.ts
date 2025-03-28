
// API Key Constants
export const OPENAI_API_KEY_STORAGE = 'openai-api-key';

/**
 * גישה למפתח ה-API של OpenAI מה-localStorage
 * @returns מפתח ה-API או null אם לא קיים
 */
export const getOpenAIApiKey = (): string | null => {
  return localStorage.getItem(OPENAI_API_KEY_STORAGE);
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
 * בדיקה האם מפתח API של OpenAI קיים
 * @returns בוליאני המציין האם המפתח קיים
 */
export const hasOpenAIApiKey = (): boolean => {
  return !!getOpenAIApiKey();
};
