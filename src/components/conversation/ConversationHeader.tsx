
import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const ConversationHeader = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="text-center"
    >
      <h2 className="text-xl font-semibold mb-1 flex items-center justify-center gap-2">
        <MessageCircle className="text-coachy-blue" size={20} />
        ספר/י לי קצת על עצמך
      </h2>
      <p className="text-gray-600 mb-5">
        יש לך כאבים או אזורים רגישים?
        <br />
        או אולי משהו שאת/ה רוצה שאדע לפני שנתחיל?
      </p>
    </motion.div>
  );
};

export default ConversationHeader;
