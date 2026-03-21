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
