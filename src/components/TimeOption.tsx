
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TimeOptionProps {
  value: string;
  icon: string;
  description: string;
  isSelected: boolean;
  onClick: () => void;
  index: number;
}

const TimeOption = ({ value, icon, description, isSelected, onClick, index }: TimeOptionProps) => {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        delay: 0.1 * (index + 1),
        type: "spring",
        stiffness: 400,
        damping: 17
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={cn(
        'w-full h-32 rounded-xl transition-all duration-300 flex flex-col items-center justify-center gap-1',
        'border-2',
        isSelected 
          ? 'coachy-rainbow-gradient text-white shadow-md scale-105'
          : 'bg-white border-gray-200 text-gray-700'
      )}
    >
      <span className="text-2xl mb-1">{icon}</span>
      <span className="font-medium">{value}</span>
      <span className="text-xs opacity-80">{description}</span>
    </motion.button>
  );
};

export default TimeOption;
