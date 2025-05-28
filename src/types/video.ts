
export interface VideoData {
  id: { videoId: string };
  snippet: { title: string; description: string };
}

export interface FallbackVideo {
  videoId: string;
  title: string;
  category: 'high-energy' | 'moderate' | 'gentle';
  duration: '5-minute' | '10-minute' | '15-minute' | '20-minute' | '30-minute' | '45-minute' | '60-minute';
}

export interface EmotionRatings {
  energy: number;
  bounciness: number;
  alertness: number;
  lightness: number;
}
