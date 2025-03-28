
import React, { useEffect, useState } from 'react';
import { useFlowContext } from '@/context/FlowContext';
import { Button } from '@/components/ui/button';
import AnimatedCard from './AnimatedCard';
import CelebrationEffects from './CelebrationEffects';
import { Heart, Play, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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

const SparkleEffect = ({ delay }: { delay: number }) => (
  <motion.div
    className="absolute z-40"
    style={{
      top: `${Math.random() * 80}%`,
      left: `${Math.random() * 80}%`,
    }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: [0, 1, 0],
      scale: [0, 1, 0]
    }}
    transition={{
      duration: 2,
      delay: delay / 1000,
      ease: "easeOut"
    }}
  >
    <Sparkles 
      className="text-amber-400" 
      size={Math.random() * 20 + 10} 
    />
  </motion.div>
);

const PracticeSummary = () => {
  const { currentScreen, freeTextEmotion, emotionRatings, timeAvailable } = useFlowContext();
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [celebrationType, setCelebrationType] = useState<'confetti' | 'fireworks' | 'stars' | 'emoji' | 'colorful-fireworks' | ''>('');
  const [celebrationActive, setCelebrationActive] = useState(false);
  
  const confettiColors = ['#FF8DC7', '#5B9BD5', '#4ECDC4', '#FFD166', '#FC9E4F', '#A0CED9', '#FFC09F'];
  
  useEffect(() => {
    if (currentScreen === 4) {
      // Show initial sparkles
      setShowSparkles(true);
      
      // Show initial celebration
      setCelebrationType('stars');
      setCelebrationActive(true);
      
      // Schedule additional celebrations for a continuous effect
      const celebrations = [
        { type: 'confetti', delay: 1000 },
        { type: 'colorful-fireworks', delay: 2500 },
        { type: 'emoji', delay: 4000 }
      ];
      
      celebrations.forEach(({ type, delay }) => {
        setTimeout(() => {
          setCelebrationType(type as any);
          setCelebrationActive(true);
          
          // Auto-disable after a duration
          setTimeout(() => {
            setCelebrationActive(false);
          }, 2000);
        }, delay);
      });
      
      // Auto-disable initial celebration
      const timer = setTimeout(() => {
        setCelebrationActive(false);
        
        // Turn off sparkles after all celebrations
        setTimeout(() => {
          setShowSparkles(false);
        }, 5000);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);
  
  const handleStartPractice = () => {
    setButtonClicked(true);
    setShowConfetti(true);
    setShowSparkles(true);
    
    // Trigger multiple celebration types in sequence
    const celebrations = [
      { type: 'confetti', delay: 0 },
      { type: 'fireworks', delay: 800 },
      { type: 'emoji', delay: 1600 }
    ];
    
    celebrations.forEach(({ type, delay }) => {
      setTimeout(() => {
        setCelebrationType(type as any);
        setCelebrationActive(true);
        
        // Auto-disable after a duration
        setTimeout(() => {
          setCelebrationActive(false);
        }, 2000);
      }, delay);
    });
    
    setTimeout(() => {
      setShowConfetti(false);
      setButtonClicked(false);
      setShowSparkles(false);
    }, 4000);
    
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
              {Array.from({ length: 60 }).map((_, i) => (
                <ConfettiParticle 
                  key={i}
                  color={confettiColors[i % confettiColors.length]}
                  delay={i * 20} 
                  left={`${Math.random() * 90}%`}
                />
              ))}
            </>
          )}
          
          {showSparkles && (
            <>
              {Array.from({ length: 20 }).map((_, i) => (
                <SparkleEffect key={i} delay={i * 100} />
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
            <Sparkles className="text-amber-500 animate-float" size={30} />
            <h2 className="text-2xl font-medium text-gray-500">
              נהדר!
            </h2>
            <Heart className="fill-coachy-red stroke-coachy-red animate-heartbeat" size={34} />
          </motion.div>

          <motion.p 
            className="text-xl text-gray-500 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            הנה תרגול שיסגור לך פינה
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
                  className="w-20 h-20 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover:scale-125 transition-transform duration-500 hover:bg-gradient-to-r hover:from-coachy-blue hover:to-indigo-600 relative"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {/* Add sparkles around the play button */}
                  <Sparkles className="absolute -top-2 -right-2 text-amber-400" size={15} />
                  <Sparkles className="absolute -bottom-3 -left-1 text-amber-400" size={12} />
                  <Play className="text-coachy-blue group-hover:text-white h-10 w-10 ml-1 transition-colors duration-500" />
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
              
              {/* Add sparkles around the button */}
              <Sparkles className="absolute -top-2 -right-2 text-white animate-sparkle" size={15} />
              <Sparkles className="absolute bottom-0 left-1/4 text-white animate-sparkle-delayed" size={12} />
              
              {buttonClicked && (
                <motion.span 
                  className="absolute inset-0 bg-white/30 rounded-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.3, 0] }}
                  transition={{ duration: 0.8 }}
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
