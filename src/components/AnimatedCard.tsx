
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedCardProps {
  children: ReactNode;
  isVisible: boolean;
  className?: string;
}

const AnimatedCard = ({ children, isVisible, className }: AnimatedCardProps) => {
  // Get current hour to determine theme
  const hour = new Date().getHours();
  const isMorning = hour >= 5 && hour < 17; // 5 AM to 5 PM
  
  return (
    <div
      className={cn(
        'glass-card rounded-2xl p-6 shadow-lg w-full max-w-md mx-auto transition-all duration-500',
        isVisible ? 'animate-slide-in opacity-100 transform-none relative z-10' : 'opacity-0 translate-y-10 absolute pointer-events-none',
        isMorning ? 'morning-theme' : 'evening-theme',
        className
      )}
      style={{ 
        boxShadow: '0 8px 32px rgba(31, 38, 135, 0.15)'
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedCard;
