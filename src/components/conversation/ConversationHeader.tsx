import React from 'react';
import { motion } from 'framer-motion';

const ConversationHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.4 }}
    >
      <h1 className="t-title mb-2">כמה מילים עליך</h1>
      <p className="t-sub">
        יש לך כאבים או אזורים רגישים? או משהו אחר שכדאי לי לדעת לפני שמתחילים?
      </p>
    </motion.div>
  );
};

export default ConversationHeader;
