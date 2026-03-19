
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

interface ConversationTextareaProps {
  value: string;
  onChange: (value: string) => void;
}

const ConversationTextarea = ({ value, onChange }: ConversationTextareaProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const viewport = window.visualViewport;
    if (!viewport) return;

    const handleResize = () => {
      const textarea = document.querySelector('textarea');
      if (textarea && document.activeElement === textarea) {
        textarea.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    };

    viewport.addEventListener('resize', handleResize);
    return () => viewport.removeEventListener('resize', handleResize);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="flex-1 relative"
    >
      <div className="bg-white rounded-2xl p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)] border-[1.5px] border-[hsl(var(--primary-light))]">
        <div className="flex gap-2">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="למשל: כאבי גב תחתון, בעיות ברכיים, רק פלג עליון, בלי פלאנקים..."
            className="bg-transparent border-none focus:outline-none resize-none w-full min-h-[100px] text-sm"
            style={{
              fontSize: '16px',
              WebkitAppearance: 'none',
              touchAction: 'manipulation'
            }}
          />
          <button
            onClick={() => {}}
            className="w-9 h-9 rounded-full bg-[hsl(var(--primary))] flex items-center justify-center self-end flex-shrink-0"
          >
            <ArrowUp size={16} className="text-white" />
          </button>
        </div>

        <div className="flex gap-2 mt-3">
          {['💪 חיזוק', '🧘 מתיחות', '🔥 קרדיו'].map((tag) => (
            <button
              key={tag}
              onClick={() => onChange(value ? value + ' ' + tag : tag)}
              className="bg-[hsl(var(--background))] px-3 py-1.5 rounded-full text-xs"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ConversationTextarea;
