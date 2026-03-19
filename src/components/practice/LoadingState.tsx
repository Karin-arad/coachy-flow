
import React from 'react';
import { motion } from 'framer-motion';

const LoadingState = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="flex items-center justify-center gap-2 py-12">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-3 h-3 rounded-full bg-[hsl(var(--primary))]"
            animate={{ scale: [0.8, 1.2, 0.8] }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.15,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
      <p className="text-[hsl(var(--muted-foreground))]">Crafting your perfect practice...</p>
    </div>
  );
};

export default LoadingState;
