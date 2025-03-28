
import React, { useEffect, useState } from 'react';
import { useFlowContext } from '@/context/FlowContext';
import { Button } from '@/components/ui/button';
import AnimatedCard from './AnimatedCard';
import CelebrationEffects from './CelebrationEffects';
import { Heart, Play, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Helper component for confetti particle
const ConfettiParticle = ({ color, delay, left }: { color: string; delay: number; left: string }) => (
  <motion.div 
    className="absolute top-0 z-50 w-3 h-3 rounded-full"
    initial={{ opacity: 0, top: "10%", scale: 0 }}
    animate={{ 
      opacity: [0, 1, 0],
      top: ["10%", "100%"],
      scale: [0, 1, 0.5],
      x: [0, Math.random() * 100 - 50]
    }}
    transition={{ 
      duration: 2, 
      delay: delay / 1000,
      ease: "easeOut"
    }}
    style={{ 
      backgroundColor: color, 
      left: left,
    }}
  />
);

const PracticeSummary = () => {
  const { currentScreen, freeTextEmotion, emotionRatings, timeAvailable } = useFlowContext();
  const [showConfetti, setShowConfetti] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [celebrationType, setCelebrationType] = useState<'confetti' | 'fireworks' | 'stars' | 'emoji' | 'colorful-fireworks' | ''>('');
  const [celebrationActive, setCelebrationActive] = useState(false);
  
  // Confetti colors from our palette
  const confettiColors = ['#FF8DC7', '#5B9BD5', '#4ECDC4', '#FFD166'];
  
  useEffect(() => {
    if (currentScreen === 4) {
      // Play stars effect when this screen becomes visible
      setCelebrationType('stars');
      setCelebrationActive(true);
      
      // Disable celebration after 2 seconds
      const timer = setTimeout(() => {
        setCelebrationActive(false);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);
  
  const handleStartPractice = () => {
    // Trigger confetti explosion on button click
    setButtonClicked(true);
    setShowConfetti(true);
    
    // Start random celebration
    const celebrations = ['confetti', 'fireworks', 'emoji', 'colorful-fireworks'] as const;
    const randomCelebration = celebrations[Math.floor(Math.random() * celebrations.length)];
    setCelebrationType(randomCelebration);
    setCelebrationActive(true);
    
    // Hide confetti after animation completes
    setTimeout(() => {
      setShowConfetti(false);
      setButtonClicked(false);
      setCelebrationActive(false);
    }, 3000);
    
    // This would connect to the practice system in the future
    console.log('Starting practice with data:', {
      freeTextEmotion,
      emotionRatings,
      timeAvailable
    });
  };

  return (
    <>
      <CelebrationEffects 
        effectType={celebrationType} 
        active={celebrationActive} 
        duration={3000} 
      />
      
      <AnimatedCard isVisible={currentScreen === 4} className="min-h-[400px] flex flex-col">
        <AnimatePresence>
          {showConfetti && (
            <>
              {/* Generate confetti particles with random positions and delays */}
              {Array.from({ length: 40 }).map((_, i) => (
                <ConfettiParticle 
                  key={i}
                  color={confettiColors[i % confettiColors.length]}
                  delay={i * 30} 
                  left={`${Math.random() * 90}%`}
                />
              ))}
            </>
          )}
        </AnimatePresence>
        
        <div className="space-y-6 h-full flex flex-col">
          <motion.div 
            className="flex items-center justify-center gap-3 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Sparkles className="text-amber-500 animate-float" size={26} />
            <h2 className="text-2xl font-medium bg-gradient-to-r from-coachy-blue to-indigo-600 bg-clip-text text-transparent">
              תודה קארין!
            </h2>
            <Heart className="fill-coachy-red stroke-coachy-red animate-heartbeat" size={32} />
          </motion.div>

          <motion.p 
            className="text-xl text-coachy-text bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            הנה תרגול קטן שיעשה לך טוב היום 💫
          </motion.p>
          
          <motion.div 
            className="relative overflow-hidden rounded-xl bg-gradient-to-br from-coachy-gray via-gray-100 to-coachy-gray p-1 aspect-video my-6 shadow-md group"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5, type: "spring" }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="absolute inset-0 backdrop-blur-[1px] bg-white/10 flex items-center justify-center">
              <motion.div 
                className="text-gray-500 flex flex-col items-center gap-3"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div 
                  className="w-16 h-16 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover:scale-125 transition-transform duration-500 hover:bg-gradient-to-r hover:from-coachy-blue hover:to-indigo-600"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Play className="text-coachy-blue group-hover:text-white h-8 w-8 ml-1 transition-colors duration-500" />
                </motion.div>
                <p>כאן יופיע סרטון YouTube עם תרגול מותאם אישית</p>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex justify-center mt-auto pt-6 mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <Button 
              onClick={handleStartPractice}
              variant="joyful"
              className="bg-gradient-to-r from-coachy-pink to-coachy-yellow hover:brightness-105 text-white px-8 py-6 text-lg rounded-xl transition-all duration-500 transform hover:scale-110 active:scale-95 shadow-sm hover:shadow-lg group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>התחילי תרגול</span>
                <Play className="h-5 w-5 ml-1 group-hover:animate-bounce-button" />
              </span>
              <span className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 group-active:scale-x-100 transition-transform origin-right duration-300 rounded-xl"></span>
              
              {buttonClicked && (
                <motion.span 
                  className="absolute inset-0 bg-white/20 rounded-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.2, 0] }}
                  transition={{ duration: 0.5 }}
                />
              )}
            </Button>
          </motion.div>
        </div>
      </AnimatedCard>
    </>
  );
};

export default PracticeSummary;
