
import { API_KEYS } from "@/config/apiKeys";

// YouTube API Key Constants
export const YOUTUBE_API_KEY_STORAGE = 'youtube-api-key';

/**
 * גישה למפתח ה-API של YouTube מה-localStorage או מקובץ הקונפיגורציה
 * @returns מפתח ה-API או null אם לא קיים
 */
export const getYouTubeApiKey = (): string | null => {
  // First try to get from localStorage (for user-specific keys)
  const localKey = localStorage.getItem(YOUTUBE_API_KEY_STORAGE);
  if (localKey) {
    console.log('🔑 Using YouTube API key from localStorage');
    return localKey;
  }
  
  // Fall back to the config file key, but only if it's not empty
  if (API_KEYS.YOUTUBE) {
    console.log('🔑 Using YouTube API key from config');
    return API_KEYS.YOUTUBE;
  }
  
  console.warn('⚠️ No YouTube API key found in localStorage or config');
  return null;
};

/**
 * בדיקה האם מפתח API של YouTube קיים
 * @returns בוליאני המציין האם המפתח קיים
 */
export const hasYouTubeApiKey = (): boolean => {
  const hasKey = !!getYouTubeApiKey();
  console.log('🔍 YouTube API key check:', hasKey ? 'Available' : 'Not available');
  return hasKey;
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

export const setYouTubeApiKey = (apiKey: string): void => {
  console.log('🔑 Setting new YouTube API key in localStorage');
  localStorage.setItem(YOUTUBE_API_KEY_STORAGE, apiKey);
};
