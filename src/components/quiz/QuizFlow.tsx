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

  const submitQuiz = useCallback(
    async (finalAnswers: QuizAnswer) => {
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
    },
    [language]
  );

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
    [answers, currentQuestion, currentQuestionIndex, submitQuiz]
  );

  const handleSkip = useCallback(async () => {
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < quizQuestions.length) {
      setCurrentQuestionIndex(nextIndex);
    } else {
      await submitQuiz(answers as QuizAnswer);
    }
  }, [answers, currentQuestionIndex, submitQuiz]);

  const handleRetry = () => {
    setState('questions');
    setCurrentQuestionIndex(0);
    setAnswers({});
    setRecommendation(null);
    setError(null);
  };

  return (
    <div
      className="min-h-[100dvh]"
      style={{ background: 'linear-gradient(135deg, #1a1a2e, #16213e)' }}
    >
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
