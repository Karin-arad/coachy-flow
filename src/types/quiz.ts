export type Language = 'he' | 'en';

export interface QuizOption {
  value: string;
  labelHe: string;
  labelEn: string;
  next?: QuizNode;
}

export interface QuizNode {
  id: string;
  titleHe: string;
  titleEn: string;
  options: QuizOption[];
}

export interface QuizAnswerStep {
  questionId: string;
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
  wink?: string;
}

export interface QuizErrorResponse {
  error: string;
  fallback: RecommendationItem;
}

export type QuizState = 'questions' | 'free-text' | 'loading' | 'result';
