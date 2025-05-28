
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface ConversationActionsProps {
  onContinue: () => void;
  onPrevious: () => void;
}

const ConversationActions = ({ onContinue, onPrevious }: ConversationActionsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className="mt-auto pt-6 space-y-3"
    >
      <Button 
        onClick={onContinue}
        variant="energetic"
        className="w-full py-6 rounded-xl relative overflow-hidden group ios-button-fix"
        style={{
          touchAction: 'manipulation',
          WebkitTouchCallout: 'none',
          WebkitUserSelect: 'none'
        }}
      >
        <span className="relative z-10">יאללה, נמשיך</span>
        <span className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 group-active:scale-x-100 transition-transform origin-right duration-300"></span>
      </Button>
      
      <Button 
        onClick={onPrevious}
        variant="outline"
        className="w-full py-3 rounded-xl ios-button-fix"
        style={{
          touchAction: 'manipulation',
          WebkitTouchCallout: 'none',
          WebkitUserSelect: 'none'
        }}
      >
        חזרה
      </Button>
    </motion.div>
  );
};

export default ConversationActions;
