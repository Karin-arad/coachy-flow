
import React, { useEffect, useState } from 'react';
import { useFlowContext } from '@/context/FlowContext';
import { Button } from '@/components/ui/button';
import AnimatedCard from './AnimatedCard';
import { Heart, Play, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const PracticeSummary = () => {
  const { currentScreen, freeTextEmotion, emotionRatings, timeAvailable } = useFlowContext();
  const [buttonClicked, setButtonClicked] = useState(false);
  
  const handleStartPractice = () => {
    setButtonClicked(true);
    
    // Just log the data without celebrations
    console.log('Starting practice with data:', {
      freeTextEmotion,
      emotionRatings,
      timeAvailable
    });
    
    setTimeout(() => {
      setButtonClicked(false);
    }, 1000);
  };

  return (
    <AnimatedCard isVisible={currentScreen === 4} className="flex flex-col">
      <div className="space-y-4 flex flex-col h-full">
        <motion.div 
          className="flex items-center justify-center gap-3 mb-2"
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
          className="relative overflow-hidden rounded-xl bg-gradient-to-br from-coachy-gray via-gray-100 to-coachy-gray p-1 aspect-video my-4 shadow-md group"
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
                <Play className="text-coachy-blue group-hover:text-white h-10 w-10 ml-1 transition-colors duration-500" />
              </motion.div>
              <p>כאן יופיע סרטון YouTube עם תרגול מותאם אישית</p>
            </motion.div>
          </div>
        </motion.div>
        
        <motion.div 
          className="flex justify-center mt-auto pt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <Button 
            onClick={handleStartPractice}
            variant="joyful"
            className="bg-gradient-to-r from-coachy-pink to-coachy-yellow hover:brightness-105 text-white px-8 py-6 text-lg rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-sm hover:shadow-md group relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              <span>התחילי תרגול</span>
              <Play className="h-5 w-5 ml-1" />
            </span>
            <span className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 group-active:scale-x-100 transition-transform origin-right duration-300 rounded-xl"></span>
            
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
  );
};

export default PracticeSummary;
