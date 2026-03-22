import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { QuizNode, QuizAnswerStep, QuizRecommendation, QuizState, Language } from '@/types/quiz';
import { quizTree } from '@/data/quizQuestions';
import { getRecommendation } from '@/utils/recommendService';
import QuizQuestion from './QuizQuestion';
import QuizFreeText from './QuizFreeText';
import QuizLoading from './QuizLoading';
import QuizResultCard from './QuizResultCard';
import QuizEmailCapture from './QuizEmailCapture';

const TOTAL_STEPS = 4; // 3 bubbles + 1 free text

const QuizFlow = () => {
  const [state, setState] = useState<QuizState>('questions');
  const [currentNode, setCurrentNode] = useState<QuizNode>(quizTree);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswerStep[]>([]);
  const [freeText, setFreeText] = useState('');
  const [recommendation, setRecommendation] = useState<QuizRecommendation | null>(null);
  const [error, setError] = useState<string | null>(null);

  const language: Language = document.documentElement.dir === 'ltr' ? 'en' : 'he';

  const submitQuiz = useCallback(
    async (finalAnswers: QuizAnswerStep[], userFreeText: string) => {
      setState('loading');
      setError(null);

      const answersPayload = {
        path: finalAnswers.map((a) => ({
          question: a.questionId,
          answer: a.value,
          label: language === 'he' ? a.labelHe : a.labelEn,
        })),
        freeText: userFreeText,
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
        setFreeText('');
      }
    },
    [language]
  );

  const handleAnswer = useCallback(
    (value: string) => {
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
        setCurrentNode(selectedOption.next);
        setStep((s) => s + 1);
      } else {
        // Leaf node — go to free text
        setState('free-text');
        setStep(3);
      }
    },
    [answers, currentNode]
  );

  const handleFreeTextSubmit = useCallback(
    async (text: string) => {
      setFreeText(text);
      await submitQuiz(answers, text);
    },
    [answers, submitQuiz]
  );

  const handleRetry = () => {
    setState('questions');
    setCurrentNode(quizTree);
    setStep(0);
    setAnswers([]);
    setFreeText('');
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

        {state === 'free-text' && (
          <QuizFreeText
            key="free-text"
            language={language}
            onSubmit={handleFreeTextSubmit}
          />
        )}

        {state === 'loading' && <QuizLoading key="loading" language={language} />}

        {state === 'result' && recommendation && (
          <div
            key="result"
            className="min-h-[100dvh] flex flex-col items-center justify-center px-6 py-8"
          >
            <QuizResultCard recommendation={recommendation} language={language} />
            <QuizEmailCapture answers={answers} language={language} recommendation={recommendation} />

            <button
              onClick={handleRetry}
              className="mt-8 text-xs text-white/20 hover:text-white/40 transition-colors font-hebrew"
            >
              {language === 'he' ? 'רוצים לנסות שוב?' : 'Want to try again?'}
            </button>
          </div>
        )}
      </AnimatePresence>

      {error && (
        <div className="fixed bottom-4 left-4 right-4 mx-auto max-w-sm rounded-xl p-3 bg-red-500/20 border border-red-500/30 text-center">
          <p className="text-sm text-red-300 font-hebrew">{error}</p>
        </div>
      )}
    </div>
  );
};

export default QuizFlow;
