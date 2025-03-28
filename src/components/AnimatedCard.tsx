
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
        'bg-white rounded-2xl p-6 shadow-md w-full max-w-md mx-auto transition-all duration-500',
        isVisible ? 'animate-slide-in opacity-100 transform-none' : 'opacity-0 translate-y-10 absolute',
        className
      )}
      style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)' }}
    >
      {children}
    </div>
  );
};

export default AnimatedCard;
