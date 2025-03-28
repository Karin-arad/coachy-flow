
import React, { useEffect, useState } from 'react';
import { useFlowContext } from '@/context/FlowContext';
import { Button } from '@/components/ui/button';
import AnimatedCard from './AnimatedCard';
import { Heart, Play, Sparkles, Stars } from 'lucide-react';

// Helper component for confetti particle
const ConfettiParticle = ({ color, delay, left }: { color: string; delay: number; left: string }) => (
  <div 
    className="absolute top-0 z-50 w-3 h-3 rounded-full animate-confetti-explosion"
    style={{ 
      backgroundColor: color, 
      left: left,
      animationDelay: `${delay}ms`,
      opacity: 0 // Start hidden
    }}
  />
);

const PracticeSummary = () => {
  const { currentScreen, freeTextEmotion, emotionRatings, timeAvailable } = useFlowContext();
  const [showConfetti, setShowConfetti] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  
  // Confetti colors from our new palette
  const confettiColors = ['#FF8DC7', '#5B9BD5', '#4ECDC4', '#FFD166'];
  
  useEffect(() => {
    if (currentScreen === 4) {
      // Only show confetti when this screen becomes visible
      setShowConfetti(true);
      
      // Hide confetti after animation completes
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);
  
  const handleStartPractice = () => {
    // Trigger confetti explosion on button click
    setButtonClicked(true);
    setShowConfetti(true);
    
    // Hide confetti after animation completes
    setTimeout(() => {
      setShowConfetti(false);
      setButtonClicked(false);
    }, 2000);
    
    // This would connect to the practice system in the future
    console.log('Starting practice with data:', {
      freeTextEmotion,
      emotionRatings,
      timeAvailable
    });
  };

  return (
    <AnimatedCard isVisible={currentScreen === 4} className="min-h-[400px] flex flex-col">
      {showConfetti && (
        <>
          {/* Generate 20 confetti particles with random positions and delays */}
          {Array.from({ length: 30 }).map((_, i) => (
            <ConfettiParticle 
              key={i}
              color={confettiColors[i % confettiColors.length]}
              delay={i * 50} 
              left={`${5 + (i * 3)}%`}
            />
          ))}
        </>
      )}
      
      <div className="space-y-6 h-full flex flex-col">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Sparkles className="text-amber-500 animate-float" size={26} />
          <h2 className="text-2xl font-medium bg-gradient-to-r from-coachy-blue to-indigo-600 bg-clip-text text-transparent">
            תודה קארין!
          </h2>
          <Heart className="fill-coachy-red stroke-coachy-red animate-heartbeat" size={32} />
        </div>
        <p className="text-xl text-coachy-text bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent text-center">
          הנה תרגול קטן שיעשה לך טוב היום 💫
        </p>
        
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-coachy-gray via-gray-100 to-coachy-gray p-1 aspect-video my-6 shadow-md group">
          <div className="absolute inset-0 backdrop-blur-[1px] bg-white/10 flex items-center justify-center">
            <div className="text-gray-500 flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover:scale-125 transition-transform duration-500 hover:bg-gradient-to-r hover:from-coachy-blue hover:to-indigo-600">
                <Play className="text-coachy-blue group-hover:text-white h-8 w-8 ml-1 transition-colors duration-500" />
              </div>
              <p>כאן יופיע סרטון YouTube עם תרגול מותאם אישית</p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center mt-auto pt-6 mb-2">
          <Button 
            onClick={handleStartPractice}
            className="bg-gradient-to-r from-coachy-pink to-coachy-yellow hover:brightness-105 text-white px-8 py-6 text-lg rounded-xl transition-all duration-500 transform hover:scale-110 active:scale-95 shadow-sm hover:shadow-lg group relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              <span>התחילי תרגול</span>
              <Play className="h-5 w-5 ml-1 group-hover:animate-bounce-button" />
            </span>
            <span className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 group-active:scale-x-100 transition-transform origin-right duration-300 rounded-xl"></span>
            
            {buttonClicked && (
              <span className="absolute inset-0 animate-pulse bg-white/20 rounded-xl"></span>
            )}
          </Button>
        </div>
      </div>
    </AnimatedCard>
  );
};

export default PracticeSummary;
