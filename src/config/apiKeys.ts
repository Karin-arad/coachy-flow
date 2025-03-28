
// IMPORTANT: Don't commit this file to version control in a real-world application
// This is only for demo/development purposes

/**
 * Configuration file for API keys
 * In a production environment, these would be stored securely on a backend
 */

export const API_KEYS = {
  OPENAI: import.meta.env.VITE_OPENAI_API_KEY || "your-openai-api-key-here",
  YOUTUBE: import.meta.env.VITE_YOUTUBE_API_KEY || "your-youtube-api-key-here"
};
