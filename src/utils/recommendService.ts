import { QuizRecommendation, Language } from '@/types/quiz';

const MAKE_WEBHOOK_URL = import.meta.env.VITE_QUIZ_WEBHOOK_URL || '';
const MAKE_EMAIL_WEBHOOK_URL = import.meta.env.VITE_QUIZ_EMAIL_WEBHOOK_URL || '';

export const getRecommendation = async (
  answers: Record<string, unknown>,
  language: Language
): Promise<QuizRecommendation> => {
  if (!MAKE_WEBHOOK_URL) {
    throw new Error('Quiz webhook URL is not configured');
  }

  try {
    const response = await fetch(MAKE_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answers, language }),
      signal: AbortSignal.timeout(15000),
    });

    if (!response.ok) {
      throw new Error(`שגיאה בתקשורת: ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      return {
        primary: data.fallback,
        secondary: undefined,
      };
    }

    if (!data.primary?.id || !data.primary?.url) {
      throw new Error('תשובה לא תקינה מהשרת');
    }

    return {
      primary: data.primary,
      secondary: data.secondary || undefined,
    };
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('לא הגיעה תשובה בזמן. אפשר לנסות שוב.');
    }
    throw error;
  }
};

export const submitEmailCapture = async (
  email: string,
  answers: Record<string, unknown>,
  language: Language
): Promise<void> => {
  if (!MAKE_EMAIL_WEBHOOK_URL) return;

  try {
    await fetch(MAKE_EMAIL_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, answers, language }),
      signal: AbortSignal.timeout(10000),
    });
  } catch {
    // Email capture is non-critical — fail silently
  }
};
