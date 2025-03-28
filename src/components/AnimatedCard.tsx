
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
        'glass-card rounded-2xl p-6 shadow-lg w-full max-w-md mx-auto transition-all duration-700',
        isVisible ? 
          'animate-slide-in opacity-100 transform-none relative z-10 motion-safe:scale-105 motion-safe:animate-[slide-in_0.5s_ease-out,scale_0.2s_ease-out_0.3s]' : 
          'opacity-0 translate-y-10 absolute pointer-events-none',
        isMorning ? 'morning-theme' : 'evening-theme',
        className
      )}
      style={{ 
        boxShadow: isVisible ? '0 10px 40px rgba(31, 38, 135, 0.2)' : '0 8px 32px rgba(31, 38, 135, 0.15)'
      }}
    >
      <div className={cn(
        'transition-all duration-500',
        isVisible && 'motion-safe:animate-fade-in motion-safe:delay-200'
      )}>
        {children}
      </div>
    </div>
  );
};

export default AnimatedCard;
