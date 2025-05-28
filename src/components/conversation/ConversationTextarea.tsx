
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface ConversationTextareaProps {
  value: string;
  onChange: (value: string) => void;
}

const ConversationTextarea = ({ value, onChange }: ConversationTextareaProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Enhanced iOS textarea focus handling
  const handleTextareaFocus = () => {
    console.log('📝 iOS: Textarea focused');
    if (textareaRef.current && /iPad|iPhone|iPod/.test(navigator.userAgent)) {
      // Prevent iOS zoom on focus
      textareaRef.current.setAttribute('readonly', 'readonly');
      textareaRef.current.setAttribute('style', 'font-size: 16px !important;');
      setTimeout(() => {
        textareaRef.current?.removeAttribute('readonly');
      }, 100);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="flex-1 relative"
    >
      <Textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={handleTextareaFocus}
        placeholder="למשל: כאבי גב תחתון, בעיות ברכיים, רק פלג עליון, בלי פלאנקים..."
        className={cn(
          "resize-none w-full h-full min-h-[120px] p-4 text-sm rounded-xl",
          "border-2 border-gray-200 focus:border-coachy-blue",
          "focus:ring-1 focus:ring-coachy-blue focus:outline-none",
          "transition-all duration-300 bg-white/80",
          "ios-textarea-fix ios-textarea-enhanced"
        )}
        style={{
          fontSize: '16px', // Prevent iOS zoom
          WebkitAppearance: 'none',
          touchAction: 'manipulation'
        }}
      />
    </motion.div>
  );
};

export default ConversationTextarea;
