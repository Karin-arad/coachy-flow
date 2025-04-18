
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
            <span className="text-5xl drop-shadow-lg" style={{ filter: `saturate(${100 + intensity * 50}%)` }}>
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
                filter: [`brightness(${100 + intensity * 30}%)`, `brightness(${130 + intensity * 50}%)`, `brightness(${100 + intensity * 30}%)`],
              }}
              transition={{
                duration: 0.8 - intensity * 0.3, // Faster pulsing with higher energy
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex justify-center items-center"
            >
              <div className="relative flex items-center justify-center">
                <Flame
                  className="text-amber-500 drop-shadow-lg"
                  size={36 + intensity * 36}
                  style={{
                    opacity: 0.8 + intensity * 0.2,
                    color: intensity > 0.7 ? '#ff6b00' : (intensity > 0.4 ? '#ff9500' : '#ffc107'),
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
                      className="text-amber-300"
                      size={46 + intensity * 36}
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
              className="flex gap-3 bg-gradient-to-b from-transparent to-blue-50/30 p-3 rounded-full"
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
                  className={`drop-shadow-md ${intensity > 0.7 ? 'text-blue-600' : (intensity > 0.4 ? 'text-blue-500' : 'text-blue-400')}`}
                  size={32}
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
                  className={`drop-shadow-md ${intensity > 0.7 ? 'text-blue-600' : (intensity > 0.4 ? 'text-blue-500' : 'text-blue-400')}`}
                  size={32}
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
            <div className="relative flex flex-col items-center">
              <motion.div
                animate={{
                  rotate: [0, 15, -15, 0],
                  y: [0, -10 * intensity, 0],
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
                  className={`${intensity > 0.7 ? 'text-teal-500' : (intensity > 0.4 ? 'text-teal-400' : 'text-teal-300')}`} 
                  size={40} 
                  strokeWidth={1.5}
                  style={{
                    filter: `drop-shadow(0 ${2 + intensity * 3}px ${3 + intensity * 2}px rgba(20, 184, 166, 0.${Math.round(3 + intensity * 6)}))`,
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
                    className="text-gray-500" 
                    size={28} 
                    style={{
                      opacity: 0.9 - (intensity * 0.7),
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
                  <div className="text-xs text-teal-600 mt-14 font-semibold">
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
    <div className="h-24 flex items-center justify-center w-full">
      {renderAnimation()}
    </div>
  );
};

export default EmotionAnimation;
