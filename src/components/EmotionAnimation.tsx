import React from 'react';
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
              y: [0, -30 * intensity, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.5, 1],
            }}
            style={{
              opacity: 0.7 + intensity * 0.3,
            }}
            className="flex justify-center items-center"
          >
            <span className="text-7xl drop-shadow-lg" style={{ 
              filter: `saturate(${100 + intensity * 100}%) brightness(1.2)`,
              transform: `scale(${1 + intensity * 0.3})`
            }}>
              {intensity < 0.3 ? "🐰" : intensity < 0.6 ? "🐇" : "🦘"}
            </span>
          </motion.div>
        );
        
      case 'energy':
        return (
          <div className="flex justify-center items-center">
            <motion.div
              animate={{
                scale: [1, 1.1 + intensity * 0.2, 1],
              }}
              transition={{
                duration: 0.8 - intensity * 0.3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex justify-center items-center"
            >
              <motion.div 
                className="text-7xl"
                animate={{
                  rotate: intensity > 0.5 ? [0, 15, -15, 0] : [0, 5, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {intensity < 0.3 ? "🔥" : intensity < 0.6 ? "⚡️" : "💥"}
              </motion.div>
            </motion.div>
          </div>
        );
        
      case 'alertness':
        return (
          <div className="flex justify-center items-center">
            <motion.div 
              className="flex gap-5 p-3 rounded-full"
              animate={{
                scale: [1, intensity > 0.7 ? 1.05 : 1, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <motion.div
                animate={{
                  scaleY: [1, intensity < 0.3 ? 0.8 : (intensity < 0.6 ? 0.9 : 1)],
                }}
                transition={{
                  duration: intensity < 0.3 ? 3.5 : (intensity < 0.6 ? 2.5 : 1.5),
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="text-6xl"
              >
                {intensity < 0.3 ? "😴" : intensity < 0.6 ? "🧐" : "🚨"}
              </motion.div>
            </motion.div>
          </div>
        );
        
      case 'lightness':
        return (
          <div className="flex justify-center items-center">
            <motion.div
              animate={{
                y: [0, -15 * intensity, 0],
                rotate: intensity > 0.5 ? [0, 10, -10, 0] : [0, 5, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-7xl"
              style={{
                filter: `brightness(${1 + intensity * 0.2})`,
              }}
            >
              {intensity < 0.3 ? "🪨" : intensity < 0.6 ? "🎈" : "🦋"}
            </motion.div>
          </div>
        );
    }
  };
  
  return (
    <div className="h-32 flex items-center justify-center w-full">
      {renderAnimation()}
    </div>
  );
};

export default EmotionAnimation;
