import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { QuizNode, QuizAnswerStep, QuizRecommendation, QuizState, Language } from '@/types/quiz';
import { quizTree } from '@/data/quizQuestions';
import { getRecommendation } from '@/utils/recommendService';
import QuizQuestion from './QuizQuestion';
import QuizLoading from './QuizLoading';
import QuizResultCard from './QuizResultCard';
import QuizEmailCapture from './QuizEmailCapture';

const TOTAL_STEPS = 3;

const QuizFlow = () => {
  const [state, setState] = useState<QuizState>('questions');
  const [currentNode, setCurrentNode] = useState<QuizNode>(quizTree);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswerStep[]>([]);
  const [recommendation, setRecommendation] = useState<QuizRecommendation | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Detect language from document direction; default to Hebrew
  const language: Language = document.documentElement.dir === 'ltr' ? 'en' : 'he';

  const submitQuiz = useCallback(
    async (finalAnswers: QuizAnswerStep[]) => {
      setState('loading');
      setError(null);

      // Convert tree answers to a flat object for the API
      const answersPayload = {
        emotionalState: finalAnswers[0]?.value || '',
        desiredMode: finalAnswers[1]?.value || '',
        energyLevel: finalAnswers[2]?.value || '',
        helpType: '',
        // Include full path for richer AI context
        path: finalAnswers.map((a) => ({
          question: a.questionId,
          answer: a.value,
          label: language === 'he' ? a.labelHe : a.labelEn,
        })),
      };

      try {
        const result = await getRecommendation(answersPayload, language);
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
        setCurrentNode(quizTree);
        setStep(0);
        setAnswers([]);
      }
    },
    [language]
  );

  const handleAnswer = useCallback(
    async (value: string) => {
      const selectedOption = currentNode.options.find((o) => o.value === value);
      if (!selectedOption) return;

      const newAnswer: QuizAnswerStep = {
        questionId: currentNode.id,
        value,
        labelHe: selectedOption.labelHe,
        labelEn: selectedOption.labelEn,
      };

      const updatedAnswers = [...answers, newAnswer];
      setAnswers(updatedAnswers);

      if (selectedOption.next) {
        // Go deeper in the tree
        setCurrentNode(selectedOption.next);
        setStep((s) => s + 1);
      } else {
        // Leaf node — submit
        await submitQuiz(updatedAnswers);
      }
    },
    [answers, currentNode, submitQuiz]
  );

  const handleRetry = () => {
    setState('questions');
    setCurrentNode(quizTree);
    setStep(0);
    setAnswers([]);
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
            key={currentNode.id}
            question={currentNode}
            step={step}
            totalSteps={TOTAL_STEPS}
            language={language}
            onAnswer={handleAnswer}
          />
        )}

        {state === 'loading' && <QuizLoading key="loading" language={language} />}

        {state === 'result' && recommendation && (
          <div
            key="result"
            className="min-h-[100dvh] flex flex-col items-center justify-center px-6 py-8"
          >
            <QuizResultCard recommendation={recommendation} language={language} />
            <QuizEmailCapture answers={answers} language={language} />

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
