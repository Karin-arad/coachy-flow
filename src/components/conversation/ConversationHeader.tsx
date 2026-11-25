
import React from 'react';
import { motion } from 'framer-motion';

const ConversationHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="flex justify-start"
    >
      <div className="bg-white rounded-[18px] rounded-bl-[4px] p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] max-w-[85%]">
        <p className="text-[15px] text-[hsl(var(--foreground))] leading-relaxed">
          כמה מילים עליך לפני שמתחילים:
          יש לך כאבים או אזורים רגישים?
          או משהו אחר שכדאי לי לדעת?
        </p>
      </div>
    </motion.div>
  );
};

export default ConversationHeader;
