
// Re-export types for backward compatibility
export type { VideoData, FallbackVideo, EmotionRatings } from '../types/video';

// Re-export functions from their new locations
export { createSearchQueries } from './videoSearch';
export { validateVideo } from './videoValidation';
export { searchWithMultipleQueries, getFallbackVideo } from './videoSelection';
