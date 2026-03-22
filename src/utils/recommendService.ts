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

    const rawText = await response.text();
    // Make/OpenAI may wrap JSON in code fences or return it doubled — parse carefully
    let cleaned = rawText.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/i, '').trim();
    // If response is doubled (two JSON objects concatenated), take only the first one
    let data: Record<string, unknown>;
    try {
      data = JSON.parse(cleaned);
    } catch {
      // Find the end of the first complete JSON object by matching braces
      let depth = 0;
      let end = 0;
      for (let i = 0; i < cleaned.length; i++) {
        if (cleaned[i] === '{') depth++;
        else if (cleaned[i] === '}') { depth--; if (depth === 0) { end = i + 1; break; } }
      }
      if (end > 0) {
        data = JSON.parse(cleaned.substring(0, end));
      } else {
        throw new Error('תשובה לא תקינה מהשרת');
      }
    }

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
      wink: data.wink || undefined,
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
  language: Language,
  recommendation?: QuizRecommendation
): Promise<void> => {
  if (!MAKE_EMAIL_WEBHOOK_URL) return;

  try {
    await fetch(MAKE_EMAIL_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, answers, language, recommendation }),
      signal: AbortSignal.timeout(10000),
    });
  } catch {
    // Email capture is non-critical — fail silently
  }
};
