
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
      className="flex-1 flex flex-col min-h-[180px]"
    >
      <div className="surface flex-1 flex flex-col !p-4">
        <div className="flex gap-2 flex-1">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="למשל: כאבי גב תחתון, בעיות ברכיים, רק פלג עליון, בלי פלאנקים..."
            className="bg-transparent border-none focus:outline-none resize-none w-full h-full min-h-[100px] t-body"
            style={{
              WebkitAppearance: 'none',
              touchAction: 'manipulation'
            }}
          />
          <button
            onClick={() => {}}
            className="w-11 h-11 rounded-full bg-[hsl(var(--primary))] flex items-center justify-center self-end flex-shrink-0"
          >
            <ArrowUp size={20} className="text-white" />
          </button>
        </div>

        <div className="flex gap-2 mt-3 flex-wrap">
          {['💪 חיזוק', '🧘 מתיחות', '🔥 קרדיו'].map((tag) => (
            <button
              key={tag}
              onClick={() => onChange(value ? value + ' ' + tag : tag)}
              className="bg-[hsl(var(--background))] px-4 h-9 rounded-full t-label"
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
