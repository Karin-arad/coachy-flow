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
      const timer = setTimeout(
        () => setStageIndex((prev) => prev + 1),
        stageIndex === 0 ? 1200 : 1800
      );
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
