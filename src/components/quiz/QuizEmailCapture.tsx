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
