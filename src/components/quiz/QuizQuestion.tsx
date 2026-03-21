import { motion } from 'framer-motion';
import { QuizNode, Language } from '@/types/quiz';

interface QuizQuestionProps {
  question: QuizNode;
  step: number;
  totalSteps: number;
  language: Language;
  onAnswer: (value: string) => void;
}

const QuizQuestion = ({
  question,
  step,
  totalSteps,
  language,
  onAnswer,
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
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              i <= step ? 'bg-[#FF8C42]' : 'bg-white/20'
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
    </motion.div>
  );
};

export default QuizQuestion;
