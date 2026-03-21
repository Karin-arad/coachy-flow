export type Language = 'he' | 'en';

export interface QuizAnswer {
  emotionalState: string;
  desiredMode: string;
  energyLevel: string;
  helpType: string;
  avoiding?: string;
}

export interface QuizQuestion {
  id: keyof QuizAnswer;
  titleHe: string;
  titleEn: string;
  options: QuizOption[];
  optional?: boolean;
}

export interface QuizOption {
  value: string;
  labelHe: string;
  labelEn: string;
}

export interface RecommendationItem {
  id: string;
  title: string;
  description?: string;
  reason?: string;
  url: string;
  type: string;
}

export interface QuizRecommendation {
  primary: RecommendationItem;
  secondary?: RecommendationItem;
}

export interface QuizErrorResponse {
  error: string;
  fallback: RecommendationItem;
}

export type QuizState = 'questions' | 'loading' | 'result';
