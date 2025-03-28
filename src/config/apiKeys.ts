
// IMPORTANT: Don't commit this file to version control in a real-world application
// This is only for demo/development purposes

/**
 * Configuration file for API keys
 * In a production environment, these would be stored securely on a backend
 */

export const API_KEYS = {
  // Use empty strings as fallbacks instead of placeholder text
  OPENAI: import.meta.env.VITE_OPENAI_API_KEY || "",
  YOUTUBE: import.meta.env.VITE_YOUTUBE_API_KEY || ""
};
