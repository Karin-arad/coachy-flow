
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface AnimatedCardProps {
  children: ReactNode;
  isVisible: boolean;
  className?: string;
}

const AnimatedCard = ({ children, isVisible, className }: AnimatedCardProps) => {
  // Get current hour to determine theme
  const hour = new Date().getHours();
  const isMorning = hour >= 5 && hour < 17; // 5 AM to 5 PM
  
  if (!isVisible) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 30,
        duration: 0.5 
      }}
      className={cn(
        'glass-card rounded-2xl p-5 shadow-lg w-full max-w-md mx-auto overflow-hidden',
        isMorning ? 'morning-theme' : 'evening-theme',
        className
      )}
      style={{ 
        boxShadow: '0 10px 40px rgba(31, 38, 135, 0.2)',
        height: 'auto'
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="h-full"
      >
        {children}
      </motion.div>
      
      {/* Decorative elements */}
      <motion.div 
        className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-gradient-to-br from-white/40 to-white/10 blur-sm z-0"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      />
      <motion.div 
        className="absolute -bottom-3 -left-3 w-12 h-12 rounded-full bg-gradient-to-tr from-white/30 to-white/5 blur-sm z-0"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      />
      <motion.div 
        className="absolute bottom-4 right-6 w-8 h-8 rounded-full bg-gradient-to-tr from-coachy-yellow/20 to-coachy-pink/10 blur-sm z-0"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      />
    </motion.div>
  );
};

export default AnimatedCard;
