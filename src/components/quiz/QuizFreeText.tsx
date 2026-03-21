import { motion } from 'framer-motion';
import { useState } from 'react';
import { Language } from '@/types/quiz';

interface QuizFreeTextProps {
  language: Language;
  onSubmit: (text: string) => void;
}

const QuizFreeText = ({ language, onSubmit }: QuizFreeTextProps) => {
  const [text, setText] = useState('');
  const isRTL = language === 'he';

  const title =
    language === 'he'
      ? 'אם היית צריך/ה להגיד במשפט אחד מה באמת מפריע — מה היית כותב/ת?'
      : 'If you had to say in one sentence what really bothers you — what would you write?';

  const placeholder =
    language === 'he' ? 'משפט אחד. בלי פילטר.' : 'One sentence. No filter.';

  const buttonText = language === 'he' ? 'קדימה' : "Let's go";

  return (
    <motion.div
      key="free-text"
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
      {/* Progress dots — step 4 of 4 */}
      <div className="flex gap-2 mb-8">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              i <= 3 ? 'bg-[#FF8C42]' : 'bg-white/20'
            }`}
          />
        ))}
      </div>

      {/* Question */}
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="text-xl font-semibold text-[#FFD6A5] text-center mb-8 font-hebrew leading-relaxed max-w-sm"
      >
        {title}
      </motion.h2>

      {/* Text input */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.3 }}
        className="w-full max-w-sm"
      >
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={placeholder}
          dir={isRTL ? 'rtl' : 'ltr'}
          rows={3}
          className="w-full rounded-2xl px-5 py-4 text-base bg-[rgba(255,140,66,0.1)]
                     border border-[rgba(255,140,66,0.3)] text-[#FFD6A5]
                     placeholder-[#FFD6A5]/30 outline-none resize-none
                     focus:border-[#FF8C42]/60 transition-colors font-hebrew"
        />

        {/* Submit button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: text.trim() ? 1 : 0.3 }}
          whileHover={text.trim() ? { scale: 1.02 } : {}}
          whileTap={text.trim() ? { scale: 0.98 } : {}}
          onClick={() => text.trim() && onSubmit(text.trim())}
          disabled={!text.trim()}
          className="w-full mt-4 rounded-xl p-4 text-center bg-[#FF8C42] text-white
                     font-semibold font-hebrew transition-opacity disabled:cursor-not-allowed"
        >
          {buttonText}
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default QuizFreeText;
