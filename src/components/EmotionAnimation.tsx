
import React from 'react';
import { Feather, Eye, Flame, Weight } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

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
              <div className="relative flex items-center justify-center grayscale transition-all duration-300">
                <Flame
                  className="text-gray-600 drop-shadow-lg"
                  size={56 + intensity * 36}
                  style={{
                    opacity: 0.8 + intensity * 0.2,
                    strokeWidth: 1.5 + intensity * 0.5
                  }}
                />
                {intensity > 0.6 && (
                  <motion.div
                    className="absolute top-0 left-0 w-full h-full"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.7, 0.3]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Flame
                      className="text-gray-400"
                      size={66 + intensity * 36}
                      style={{
                        opacity: 0.4,
                        filter: "blur(3px)",
                      }}
                    />
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        );
        
      case 'alertness':
        return (
          <div className="flex justify-center items-center">
            <motion.div 
              className="flex gap-5 p-3 rounded-full grayscale"
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
                  scaleY: [1, intensity < 0.3 ? 0.1 : (intensity < 0.6 ? 0.5 : 0.8), 1],
                }}
                transition={{
                  duration: intensity < 0.3 ? 3.5 : (intensity < 0.6 ? 2.5 : 1.5),
                  repeat: Infinity,
                  ease: "easeInOut",
                  times: [0, 0.1, 1],
                }}
              >
                <Eye
                  className="text-gray-600 drop-shadow-md"
                  size={42}
                  style={{
                    opacity: 0.7 + intensity * 0.3,
                    strokeWidth: 1.5 + intensity * 0.5,
                  }}
                />
              </motion.div>
              
              <motion.div
                animate={{
                  scaleY: [1, intensity < 0.3 ? 0.1 : (intensity < 0.6 ? 0.5 : 0.8), 1],
                }}
                transition={{
                  duration: intensity < 0.3 ? 3.5 : (intensity < 0.6 ? 2.5 : 1.5),
                  repeat: Infinity,
                  ease: "easeInOut",
                  times: [0, 0.1, 1],
                  delay: 0.2,
                }}
              >
                <Eye
                  className="text-gray-600 drop-shadow-md"
                  size={42}
                  style={{
                    opacity: 0.7 + intensity * 0.3,
                    strokeWidth: 1.5 + intensity * 0.5,
                  }}
                />
              </motion.div>
            </motion.div>
          </div>
        );
        
      case 'lightness':
        return (
          <div className="flex justify-center items-center">
            <div className="relative flex flex-col items-center grayscale">
              <motion.div
                animate={{
                  rotate: [0, 15, -15, 0],
                  y: [0, -15 * intensity, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  opacity: 0.7 + intensity * 0.3,
                }}
              >
                <Feather 
                  className="text-gray-600" 
                  size={50} 
                  strokeWidth={1.5}
                  style={{
                    filter: `drop-shadow(0 ${2 + intensity * 3}px ${3 + intensity * 2}px rgba(0,0,0,0.3))`,
                  }}
                />
              </motion.div>
              
              {intensity < 0.85 && (
                <motion.div
                  className="absolute bottom-0 transform translate-y-12"
                  animate={{
                    y: [-5 * intensity, 0],
                    opacity: [1, 1 - intensity * 0.8],
                    scale: [1, 1 - intensity * 0.4],
                  }}
                  transition={{
                    duration: 0.8,
                    ease: "easeOut",
                  }}
                  style={{
                    transformOrigin: "center bottom",
                  }}
                >
                  <Weight 
                    className="text-gray-600" 
                    size={38} 
                    style={{
                      opacity: 0.9 - (intensity * 0.7),
                      strokeWidth: 1.5
                    }}
                  />
                </motion.div>
              )}
              
              {intensity > 0.5 && (
                <motion.div
                  className="absolute"
                  style={{
                    opacity: (intensity - 0.5) * 2,
                  }}
                  animate={{
                    y: [5, -5, 5],
                    opacity: [(intensity - 0.5) * 1.5, (intensity - 0.5) * 2, (intensity - 0.5) * 1.5],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <div className="text-xs text-gray-600 mt-14 font-semibold">
                    {intensity > 0.8 ? "משוחרר לגמרי!" : "קל יותר"}
                  </div>
                </motion.div>
              )}
            </div>
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
