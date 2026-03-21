# AI Quiz Router Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an interactive quiz at `/discover` that routes visitors to the most relevant site destination using AI recommendations via Make.com.

**Architecture:** Vite + React SPA with a new `/discover` route. Quiz questions are hardcoded (bilingual). Answers POST to a Make.com webhook which queries Notion for the catalog, calls an AI model, and returns a recommendation. Result displays as a vibe card with primary + secondary recommendations. Optional email capture for "your vibe today" follow-up.

**Tech Stack:** React 18, TypeScript, React Router DOM v6, Framer Motion, Tailwind CSS (existing project stack). Make.com webhook for backend. No new dependencies needed.

**Spec:** `docs/superpowers/specs/2026-03-21-quiz-router-design.md`

---

## File Structure

```
src/
  types/quiz.ts                     — Quiz types (answers, catalog item, recommendation, question)
  data/quizQuestions.ts              — Hardcoded questions + answers (HE + EN)
  utils/recommendService.ts         — POST to Make webhook, parse response, error handling
  components/quiz/QuizQuestion.tsx   — Single question: dark bg, floating bubbles, progress dots
  components/quiz/QuizLoading.tsx    — Mysterious loading: "רגע..." → "רואים משהו מעניין..." → "הנה."
  components/quiz/QuizResultCard.tsx — Vibe card: insight + primary/secondary CTA
  components/quiz/QuizEmailCapture.tsx — Optional email field below result
  components/quiz/QuizFlow.tsx       — Orchestrator: questions → loading → result → email
  pages/DiscoverPage.tsx             — /discover route wrapper
  App.tsx                            — Add /discover route (modify existing)
```

---

## Task 1: Types

**Files:**
- Create: `src/types/quiz.ts`

- [ ] **Step 1: Create quiz types file**

```typescript
// src/types/quiz.ts

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
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `cd /tmp/coachy-flow && npx tsc --noEmit src/types/quiz.ts 2>&1 | head -20`
Expected: No errors (or only unrelated existing errors)

- [ ] **Step 3: Commit**

```bash
cd /tmp/coachy-flow && git add src/types/quiz.ts && git commit -m "feat(quiz): add quiz types"
```

---

## Task 2: Quiz Questions Data

**Files:**
- Create: `src/data/quizQuestions.ts`

- [ ] **Step 1: Create questions data file**

```typescript
// src/data/quizQuestions.ts
import { QuizQuestion } from '@/types/quiz';

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'emotionalState',
    titleHe: 'מה הכי נכון עכשיו?',
    titleEn: 'What feels most true right now?',
    options: [
      { value: 'noisy-head', labelHe: 'הראש רועש', labelEn: 'My head is noisy' },
      { value: 'stuck', labelHe: 'תקוע/ה', labelEn: 'I feel stuck' },
      { value: 'bored', labelHe: 'משעמם', labelEn: 'I am bored' },
      { value: 'creative', labelHe: 'רוצה משהו יצירתי', labelEn: 'I want something creative' },
      { value: 'emotionally-tangled', labelHe: 'מסובך רגשית', labelEn: 'I feel emotionally tangled' },
    ],
  },
  {
    id: 'desiredMode',
    titleHe: 'מה רוצים יותר עכשיו?',
    titleEn: 'What do you want more right now?',
    options: [
      { value: 'understand', labelHe: 'להבין', labelEn: 'To understand' },
      { value: 'play', labelHe: 'לשחק', labelEn: 'To play' },
      { value: 'move', labelHe: 'לזוז', labelEn: 'To move' },
      { value: 'write', labelHe: 'לכתוב', labelEn: 'To write' },
      { value: 'unstuck-quickly', labelHe: 'להתפרק מהר', labelEn: 'To get unstuck quickly' },
    ],
  },
  {
    id: 'energyLevel',
    titleHe: 'כמה אנרגיה יש עכשיו?',
    titleEn: 'How much energy do you have?',
    options: [
      { value: 'very-low', labelHe: 'מאוד נמוכה', labelEn: 'Very low' },
      { value: 'medium', labelHe: 'בינונית', labelEn: 'Medium' },
      { value: 'high', labelHe: 'גבוהה', labelEn: 'High' },
    ],
  },
  {
    id: 'helpType',
    titleHe: 'מה נשמע הכי מועיל עכשיו?',
    titleEn: 'What sounds most helpful right now?',
    options: [
      { value: 'sharp-questions', labelHe: 'שאלות חדות', labelEn: 'Sharp questions' },
      { value: 'tool', labelHe: 'כלי', labelEn: 'A tool' },
      { value: 'game', labelHe: 'משחק', labelEn: 'A game' },
      { value: 'small-push', labelHe: 'דחיפה קטנה', labelEn: 'A small push' },
      { value: 'creative-direction', labelHe: 'כיוון יצירתי', labelEn: 'A creative direction' },
    ],
  },
  {
    id: 'avoiding',
    titleHe: 'ממה הכי נמנעים?',
    titleEn: 'What are you avoiding most?',
    optional: true,
    options: [
      { value: 'thinking-honestly', labelHe: 'לחשוב בכנות', labelEn: 'Thinking honestly' },
      { value: 'starting', labelHe: 'להתחיל', labelEn: 'Starting' },
      { value: 'finishing', labelHe: 'לסיים', labelEn: 'Finishing' },
      { value: 'slowing-down', labelHe: 'להאט', labelEn: 'Slowing down' },
      { value: 'feeling-truth', labelHe: 'להרגיש מה באמת קורה', labelEn: 'Feeling what is actually going on' },
    ],
  },
];
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `cd /tmp/coachy-flow && npx tsc --noEmit src/data/quizQuestions.ts 2>&1 | head -20`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
cd /tmp/coachy-flow && git add src/data/quizQuestions.ts && git commit -m "feat(quiz): add quiz questions data (HE + EN)"
```

---

## Task 3: Recommendation Service

**Files:**
- Create: `src/utils/recommendService.ts`

- [ ] **Step 1: Create the recommendation service**

Follow the existing pattern in `src/utils/coachyService.ts` — fetch with AbortSignal timeout, Hebrew error messages, typed response.

```typescript
// src/utils/recommendService.ts
import { QuizAnswer, QuizRecommendation, Language } from '@/types/quiz';

const MAKE_WEBHOOK_URL = import.meta.env.VITE_QUIZ_WEBHOOK_URL || '';
const MAKE_EMAIL_WEBHOOK_URL = import.meta.env.VITE_QUIZ_EMAIL_WEBHOOK_URL || '';

export const getRecommendation = async (
  answers: QuizAnswer,
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
  answers: QuizAnswer,
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
```

- [ ] **Step 2: Add env vars to .env.example (if exists) or note them**

Create or update `.env.example`:
```
VITE_QUIZ_WEBHOOK_URL=https://hook.eu2.make.com/your-quiz-webhook-id
VITE_QUIZ_EMAIL_WEBHOOK_URL=https://hook.eu2.make.com/your-email-webhook-id
```

- [ ] **Step 3: Commit**

```bash
cd /tmp/coachy-flow && git add src/utils/recommendService.ts .env.example && git commit -m "feat(quiz): add recommendation service (Make webhook)"
```

---

## Task 4: QuizQuestion Component

**Files:**
- Create: `src/components/quiz/QuizQuestion.tsx`

- [ ] **Step 1: Create the QuizQuestion component**

Dark gradient background, floating bubble answers, progress dots. Follow existing framer-motion patterns.

```tsx
// src/components/quiz/QuizQuestion.tsx
import { motion } from 'framer-motion';
import { QuizQuestion as QuizQuestionType, Language } from '@/types/quiz';

interface QuizQuestionProps {
  question: QuizQuestionType;
  currentIndex: number;
  totalQuestions: number;
  language: Language;
  onAnswer: (value: string) => void;
  onSkip?: () => void;
}

const QuizQuestion = ({
  question,
  currentIndex,
  totalQuestions,
  language,
  onAnswer,
  onSkip,
}: QuizQuestionProps) => {
  const title = language === 'he' ? question.titleHe : question.titleEn;
  const isRTL = language === 'he';

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="min-h-[100dvh] flex flex-col items-center justify-center px-6 py-8"
      style={{
        background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
        direction: isRTL ? 'rtl' : 'ltr',
      }}
    >
      {/* Progress dots */}
      <div className="flex gap-2 mb-8">
        {Array.from({ length: totalQuestions }).map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              i <= currentIndex
                ? 'bg-[#FF8C42]'
                : 'bg-white/20'
            }`}
          />
        ))}
      </div>

      {/* Question */}
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="text-xl font-semibold text-[#FFD6A5] text-center mb-8 font-hebrew"
      >
        {title}
      </motion.h2>

      {/* Bubble options */}
      <div className="flex flex-wrap gap-3 justify-center max-w-sm">
        {question.options.map((option, i) => {
          const label = language === 'he' ? option.labelHe : option.labelEn;
          return (
            <motion.button
              key={option.value}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 + i * 0.07, duration: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onAnswer(option.value)}
              className="px-5 py-3 rounded-3xl text-sm font-hebrew text-[#FFD6A5] cursor-pointer
                         border border-[rgba(255,140,66,0.4)] bg-[rgba(255,140,66,0.15)]
                         hover:bg-[rgba(255,140,66,0.3)] transition-colors duration-200"
            >
              {label}
            </motion.button>
          );
        })}
      </div>

      {/* Skip button for optional questions */}
      {question.optional && onSkip && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          onClick={onSkip}
          className="mt-8 text-sm text-white/30 hover:text-white/50 transition-colors font-hebrew"
        >
          {language === 'he' ? 'דלג ←' : 'Skip →'}
        </motion.button>
      )}
    </motion.div>
  );
};

export default QuizQuestion;
```

- [ ] **Step 2: Verify it compiles**

Run: `cd /tmp/coachy-flow && npx tsc --noEmit 2>&1 | grep -i "quiz" | head -10`
Expected: No errors related to quiz files

- [ ] **Step 3: Commit**

```bash
cd /tmp/coachy-flow && git add src/components/quiz/QuizQuestion.tsx && git commit -m "feat(quiz): add QuizQuestion component (dark bubbles)"
```

---

## Task 5: QuizLoading Component

**Files:**
- Create: `src/components/quiz/QuizLoading.tsx`

- [ ] **Step 1: Create the mysterious loading component**

Minimal mystery style: "רגע..." → "רואים משהו מעניין..." → "הנה."

```tsx
// src/components/quiz/QuizLoading.tsx
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Language } from '@/types/quiz';

interface QuizLoadingProps {
  language: Language;
}

const loadingStages = {
  he: ['רגע...', 'רואים משהו מעניין...', 'הנה.'],
  en: ['Hold on...', 'Seeing something interesting...', 'Here.'],
};

const QuizLoading = ({ language }: QuizLoadingProps) => {
  const [stageIndex, setStageIndex] = useState(0);
  const stages = loadingStages[language];

  useEffect(() => {
    if (stageIndex < stages.length - 1) {
      const timer = setTimeout(() => {
        setStageIndex((prev) => prev + 1);
      }, stageIndex === 0 ? 1200 : 1800);
      return () => clearTimeout(timer);
    }
  }, [stageIndex, stages.length]);

  return (
    <div
      className="min-h-[100dvh] flex flex-col items-center justify-center px-6"
      style={{ background: 'linear-gradient(135deg, #1a1a2e, #16213e)' }}
    >
      {/* Stars */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-5xl mb-8 tracking-[16px]"
      >
        ✦ ✧ ✦
      </motion.div>

      {/* Rotating text */}
      <AnimatePresence mode="wait">
        <motion.p
          key={stageIndex}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4 }}
          className="text-lg text-[#FFD6A5] font-hebrew font-medium text-center"
        >
          {stages[stageIndex]}
        </motion.p>
      </AnimatePresence>

      {/* Typing dots */}
      {stageIndex < stages.length - 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex gap-1 mt-4"
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-[#FFD6A5]/40"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default QuizLoading;
```

- [ ] **Step 2: Commit**

```bash
cd /tmp/coachy-flow && git add src/components/quiz/QuizLoading.tsx && git commit -m "feat(quiz): add QuizLoading component (minimal mystery)"
```

---

## Task 6: QuizResultCard Component

**Files:**
- Create: `src/components/quiz/QuizResultCard.tsx`

- [ ] **Step 1: Create the vibe result card**

Vibe card with "הוויב שלך עכשיו" label, AI-generated insight, primary + secondary CTAs.

```tsx
// src/components/quiz/QuizResultCard.tsx
import { motion } from 'framer-motion';
import { QuizRecommendation, Language } from '@/types/quiz';

interface QuizResultCardProps {
  recommendation: QuizRecommendation;
  language: Language;
}

const QuizResultCard = ({ recommendation, language }: QuizResultCardProps) => {
  const { primary, secondary } = recommendation;
  const isRTL = language === 'he';

  const vibeLabel = language === 'he' ? 'הוויב שלך עכשיו' : 'Your vibe right now';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full max-w-sm mx-auto"
      style={{ direction: isRTL ? 'rtl' : 'ltr' }}
    >
      {/* Vibe insight card */}
      <div className="rounded-2xl p-6 mb-4 border border-[rgba(255,140,66,0.2)] bg-[rgba(255,140,66,0.1)]">
        <p className="text-sm text-[#FF8C42] mb-2 font-hebrew">{vibeLabel}</p>
        <h3 className="text-xl font-semibold text-[#FFD6A5] leading-relaxed mb-3 font-hebrew">
          {primary.description}
        </h3>
        <p className="text-sm text-[#FFD6A5]/60 leading-relaxed font-hebrew">
          {primary.reason}
        </p>
      </div>

      {/* Primary CTA */}
      <motion.a
        href={primary.url}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="block w-full rounded-xl p-4 text-center bg-[#FF8C42] cursor-pointer mb-3 no-underline"
      >
        <span className="text-xs text-white/70 block font-hebrew">
          {language === 'he' ? 'מומלץ' : 'Recommended'}
        </span>
        <span className="text-base font-semibold text-white font-hebrew">
          {primary.title} ✨
        </span>
      </motion.a>

      {/* Secondary CTA */}
      {secondary && (
        <motion.a
          href={secondary.url}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="block w-full rounded-xl p-3 text-center border border-white/10 bg-white/5 cursor-pointer no-underline"
        >
          <span className="text-xs text-white/40 block font-hebrew">
            {language === 'he' ? 'אפשרות נוספת' : 'Another option'}
          </span>
          <span className="text-sm text-white/60 font-hebrew">
            {secondary.title}
          </span>
        </motion.a>
      )}
    </motion.div>
  );
};

export default QuizResultCard;
```

- [ ] **Step 2: Commit**

```bash
cd /tmp/coachy-flow && git add src/components/quiz/QuizResultCard.tsx && git commit -m "feat(quiz): add QuizResultCard component (vibe card)"
```

---

## Task 7: QuizEmailCapture Component

**Files:**
- Create: `src/components/quiz/QuizEmailCapture.tsx`

- [ ] **Step 1: Create the email capture component**

```tsx
// src/components/quiz/QuizEmailCapture.tsx
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Language, QuizAnswer } from '@/types/quiz';
import { submitEmailCapture } from '@/utils/recommendService';

interface QuizEmailCaptureProps {
  answers: QuizAnswer;
  language: Language;
}

const QuizEmailCapture = ({ answers, language }: QuizEmailCaptureProps) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const isRTL = language === 'he';

  const handleSubmit = async () => {
    if (!email.trim() || submitted) return;
    setSubmitted(true);
    await submitEmailCapture(email.trim(), answers, language);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.4 }}
      className="w-full max-w-sm mx-auto mt-6 rounded-xl p-4 bg-white/5 text-center"
      style={{ direction: isRTL ? 'rtl' : 'ltr' }}
    >
      {!submitted ? (
        <>
          <p className="text-sm text-[#FFD6A5]/50 mb-1 font-hebrew">
            {language === 'he'
              ? '🔮 רוצים לקבל את הוויב המלא שלכם היום?'
              : '🔮 Want your full vibe analysis today?'}
          </p>
          <p className="text-xs text-white/30 mb-3 font-hebrew">
            {language === 'he'
              ? 'נשלח ניתוח קצר עם הסוכנים שלנו'
              : "We'll send a short analysis with our agents"}
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              dir="ltr"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="email@example.com"
              className="flex-1 rounded-lg px-3 py-2 text-sm bg-white/10 border border-white/10
                         text-white/80 placeholder-white/20 outline-none focus:border-[#FF8C42]/40
                         font-sans"
            />
            <button
              onClick={handleSubmit}
              disabled={!email.trim()}
              className="rounded-lg px-4 py-2 text-sm font-semibold bg-[#FF8C42]/20 text-[#FF8C42]
                         hover:bg-[#FF8C42]/30 transition-colors disabled:opacity-30 font-hebrew"
            >
              {language === 'he' ? 'שליחה' : 'Send'}
            </button>
          </div>
        </>
      ) : (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-[#FFD6A5]/60 font-hebrew"
        >
          {language === 'he' ? '✨ בדרך אליך!' : '✨ On its way!'}
        </motion.p>
      )}
    </motion.div>
  );
};

export default QuizEmailCapture;
```

- [ ] **Step 2: Commit**

```bash
cd /tmp/coachy-flow && git add src/components/quiz/QuizEmailCapture.tsx && git commit -m "feat(quiz): add QuizEmailCapture component"
```

---

## Task 8: QuizFlow Orchestrator

**Files:**
- Create: `src/components/quiz/QuizFlow.tsx`

- [ ] **Step 1: Create the main quiz flow component**

Manages state machine: questions → loading → result. Calls recommendation service.

```tsx
// src/components/quiz/QuizFlow.tsx
import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { QuizAnswer, QuizRecommendation, QuizState, Language } from '@/types/quiz';
import { quizQuestions } from '@/data/quizQuestions';
import { getRecommendation } from '@/utils/recommendService';
import QuizQuestion from './QuizQuestion';
import QuizLoading from './QuizLoading';
import QuizResultCard from './QuizResultCard';
import QuizEmailCapture from './QuizEmailCapture';

const QuizFlow = () => {
  const [state, setState] = useState<QuizState>('questions');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Partial<QuizAnswer>>({});
  const [recommendation, setRecommendation] = useState<QuizRecommendation | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Detect language from document direction; default to Hebrew
  const language: Language = document.documentElement.dir === 'ltr' ? 'en' : 'he';

  const currentQuestion = quizQuestions[currentQuestionIndex];

  const handleAnswer = useCallback(
    async (value: string) => {
      const updatedAnswers = { ...answers, [currentQuestion.id]: value };
      setAnswers(updatedAnswers);

      const nextIndex = currentQuestionIndex + 1;
      if (nextIndex < quizQuestions.length) {
        setCurrentQuestionIndex(nextIndex);
      } else {
        await submitQuiz(updatedAnswers as QuizAnswer);
      }
    },
    [answers, currentQuestion, currentQuestionIndex]
  );

  const handleSkip = useCallback(async () => {
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < quizQuestions.length) {
      setCurrentQuestionIndex(nextIndex);
    } else {
      await submitQuiz(answers as QuizAnswer);
    }
  }, [answers, currentQuestionIndex]);

  const submitQuiz = async (finalAnswers: QuizAnswer) => {
    setState('loading');
    setError(null);

    try {
      const result = await getRecommendation(finalAnswers, language);
      setRecommendation(result);
      setState('result');
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : language === 'he'
            ? 'משהו השתבש. אפשר לנסות שוב.'
            : 'Something went wrong. Try again.'
      );
      setState('questions');
      setCurrentQuestionIndex(0);
      setAnswers({});
    }
  };

  const handleRetry = () => {
    setState('questions');
    setCurrentQuestionIndex(0);
    setAnswers({});
    setRecommendation(null);
    setError(null);
  };

  return (
    <div className="min-h-[100dvh]" style={{ background: 'linear-gradient(135deg, #1a1a2e, #16213e)' }}>
      <AnimatePresence mode="wait">
        {state === 'questions' && (
          <QuizQuestion
            key={`q-${currentQuestionIndex}`}
            question={currentQuestion}
            currentIndex={currentQuestionIndex}
            totalQuestions={quizQuestions.length}
            language={language}
            onAnswer={handleAnswer}
            onSkip={currentQuestion.optional ? handleSkip : undefined}
          />
        )}

        {state === 'loading' && <QuizLoading key="loading" language={language} />}

        {state === 'result' && recommendation && (
          <div
            key="result"
            className="min-h-[100dvh] flex flex-col items-center justify-center px-6 py-8"
          >
            <QuizResultCard recommendation={recommendation} language={language} />
            <QuizEmailCapture answers={answers as QuizAnswer} language={language} />

            {/* Retry link */}
            <button
              onClick={handleRetry}
              className="mt-8 text-xs text-white/20 hover:text-white/40 transition-colors font-hebrew"
            >
              {language === 'he' ? 'רוצים לנסות שוב?' : 'Want to try again?'}
            </button>
          </div>
        )}
      </AnimatePresence>

      {/* Error toast */}
      {error && (
        <div className="fixed bottom-4 left-4 right-4 mx-auto max-w-sm rounded-xl p-3 bg-red-500/20 border border-red-500/30 text-center">
          <p className="text-sm text-red-300 font-hebrew">{error}</p>
        </div>
      )}
    </div>
  );
};

export default QuizFlow;
```

- [ ] **Step 2: Commit**

```bash
cd /tmp/coachy-flow && git add src/components/quiz/QuizFlow.tsx && git commit -m "feat(quiz): add QuizFlow orchestrator"
```

---

## Task 9: Discover Page + Route

**Files:**
- Create: `src/pages/DiscoverPage.tsx`
- Modify: `src/App.tsx` — add `/discover` route

- [ ] **Step 1: Create the Discover page**

```tsx
// src/pages/DiscoverPage.tsx
import QuizFlow from '@/components/quiz/QuizFlow';

const DiscoverPage = () => {
  return <QuizFlow />;
};

export default DiscoverPage;
```

- [ ] **Step 2: Add the /discover route to App.tsx**

In `src/App.tsx`, add the import and route. The route should be added before the `*` catch-all route.

Add import at top:
```tsx
import DiscoverPage from "./pages/DiscoverPage";
```

Add route inside `<Routes>`, before `<Route path="*"`:
```tsx
<Route path="/discover" element={<DiscoverPage />} />
```

- [ ] **Step 3: Verify the app compiles**

Run: `cd /tmp/coachy-flow && npx vite build 2>&1 | tail -10`
Expected: Build succeeds with no errors

- [ ] **Step 4: Commit**

```bash
cd /tmp/coachy-flow && git add src/pages/DiscoverPage.tsx src/App.tsx && git commit -m "feat(quiz): add /discover page and route"
```

---

## Task 10: Manual Integration Test

**Files:** None (testing only)

- [ ] **Step 1: Start the dev server**

Run: `cd /tmp/coachy-flow && npx vite --port 5173`

- [ ] **Step 2: Open http://localhost:5173/discover in browser**

Verify:
- Dark gradient background renders
- First question appears with bubble options
- Clicking a bubble advances to next question
- Progress dots update
- Question 5 shows "דלג" skip button
- After last question, loading animation plays ("רגע..." → "רואים משהו מעניין..." → "הנה.")

Note: Without a configured Make webhook URL, the quiz will show an error after loading. This is expected — the Make scenario needs to be set up separately.

- [ ] **Step 3: Test error recovery**

Without `VITE_QUIZ_WEBHOOK_URL` set, verify:
- Error message appears after loading
- Quiz resets to first question
- User can try again

- [ ] **Step 4: Verify main app still works**

Open http://localhost:5173/ and verify the existing workout flow is unaffected.

- [ ] **Step 5: Final commit (if any fixes needed)**

```bash
cd /tmp/coachy-flow && git add -A && git commit -m "fix(quiz): integration fixes"
```

---

## Task 11: Make.com Scenario Documentation

**Files:**
- Create: `docs/make-quiz-scenario.md`

This task documents the Make scenario setup — not code, but necessary for the feature to work end-to-end.

- [ ] **Step 1: Write Make scenario setup guide**

```markdown
# Make.com Quiz Recommendation Scenario

## Scenario 1: Quiz Recommendation

### Trigger: Webhook (Custom)
- Method: POST
- Parse JSON body

### Module 2: Notion — Search Objects
- Database: [Your Catalog DB ID]
- Filter: `active` = true
- Return all fields

### Module 3: Tools — Set Variable
Build the AI prompt. Combine:
- User answers from webhook body
- Catalog items from Notion query
- System instructions (see below)

### Module 4: OpenAI / Claude — Create Chat Completion
- Model: gpt-4o or claude-sonnet-4-20250514
- System prompt: (see AI Prompt below)
- User message: the variable from Module 3
- Response format: JSON

### Module 5: Webhook Response
- Status: 200
- Body: AI response JSON

## AI System Prompt

You are a sharp, human recommendation engine for a personal development website.

You receive:
1. A user's quiz answers (emotional state, desired mode, energy level, help type, avoidance pattern)
2. A catalog of available site destinations

Your job: choose the ONE best destination and ONE secondary option.

Rules:
- Choose ONLY from the provided catalog
- Never invent destinations that don't exist
- Adapt your tone to the user's energy:
  - Low energy → warm, gentle, empathetic
  - High energy → sharp, direct, energizing
  - Bored → playful, provocative
  - Emotionally tangled → honest but caring
- Write in the language specified (he/en)
- Use gender-neutral language (no masculine/feminine assumptions)
- The "description" field should be a sharp insight about the user — NOT a description of the tool
- The "reason" field should feel like a friend explaining why this is right
- Max 2 sentences each
- Return valid JSON matching this schema:

{
  "primary": {
    "id": "catalog-item-id",
    "title": "Item title in user's language",
    "description": "Sharp insight about the user",
    "reason": "Why this is the right thing right now",
    "url": "/path/from/catalog",
    "type": "type-from-catalog"
  },
  "secondary": {
    "id": "catalog-item-id",
    "title": "Item title",
    "url": "/path/from/catalog",
    "type": "type-from-catalog"
  }
}

## Scenario 2: Email Capture

### Trigger: Webhook (Custom)
- Method: POST

### Module 2: Store email + answers
- Option A: Add to Notion "Leads" database
- Option B: Add to email marketing tool (Brevo/Mailchimp)

### Module 3: (Future) Trigger vibe analysis
- Will call site agents to generate personalized content
- Out of scope for v1
```

- [ ] **Step 2: Commit**

```bash
cd /tmp/coachy-flow && git add docs/make-quiz-scenario.md && git commit -m "docs: add Make.com scenario setup guide for quiz"
```
