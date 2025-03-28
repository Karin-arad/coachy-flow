
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedCardProps {
  children: ReactNode;
  isVisible: boolean;
  className?: string;
}

const AnimatedCard = ({ children, isVisible, className }: AnimatedCardProps) => {
  return (
    <div
      className={cn(
        'bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg w-full max-w-md mx-auto transition-all duration-500',
        isVisible ? 'animate-slide-in opacity-100 transform-none relative z-10' : 'opacity-0 translate-y-10 absolute pointer-events-none',
        className
      )}
      style={{ 
        boxShadow: '0 8px 32px rgba(31, 38, 135, 0.15)',
        border: '1px solid rgba(255, 255, 255, 0.18)'
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedCard;
