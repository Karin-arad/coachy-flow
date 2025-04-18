
import React from 'react';
import { Feather, Eye, Flame, Weight } from 'lucide-react';
import { motion } from 'framer-motion';

type EmotionAnimationType = 'bounciness' | 'energy' | 'alertness' | 'lightness';

interface EmotionAnimationProps {
  type: EmotionAnimationType;
  value: number;
  maxValue: number;
}

const EmotionAnimation: React.FC<EmotionAnimationProps> = ({ type, value, maxValue }) => {
  const intensity = value / maxValue;
  
  const renderAnimation = () => {
    switch (type) {
      case 'bounciness':
        return (
          <motion.div
            animate={{
              y: [0, -20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.5, 1],
            }}
            style={{
              opacity: 0.3 + intensity * 0.7,
            }}
          >
            <span className="text-4xl">🦘</span>
          </motion.div>
        );
        
      case 'energy':
        return (
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Flame
              className="text-coachy-yellow drop-shadow-lg"
              size={24 + intensity * 24}
              style={{
                opacity: 0.3 + intensity * 0.7,
                filter: `brightness(${100 + intensity * 50}%)`,
              }}
            />
          </motion.div>
        );
        
      case 'alertness':
        return (
          <motion.div 
            className="flex gap-3"
            animate={{
              scaleY: [1, intensity < 0.3 ? 0.1 : 1, 1],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.1, 1],
            }}
          >
            <Eye
              className="text-coachy-blue drop-shadow-md"
              size={24}
              style={{
                opacity: 0.3 + intensity * 0.7,
              }}
            />
            <Eye
              className="text-coachy-blue drop-shadow-md"
              size={24}
              style={{
                opacity: 0.3 + intensity * 0.7,
              }}
            />
          </motion.div>
        );
        
      case 'lightness':
        return (
          <div className="relative">
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                y: [0, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                opacity: 0.3 + intensity * 0.7,
              }}
            >
              <Feather className="text-coachy-turquoise" size={24} />
            </motion.div>
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2"
              animate={{
                y: [-20 * intensity, 0],
              }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
              }}
              style={{
                opacity: 1 - (intensity * 0.7),
              }}
            >
              <Weight className="text-gray-400" size={16} />
            </motion.div>
          </div>
        );
    }
  };
  
  return (
    <div className="h-16 flex items-center justify-center">
      {renderAnimation()}
    </div>
  );
};

export default EmotionAnimation;
