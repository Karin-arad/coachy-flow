
import React, { useState } from 'react';
import { useFlowContext } from '@/context/FlowContext';
import AnimatedCard from './AnimatedCard';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import VideoPlayerWithControls from './VideoPlayerWithControls';
import { PlayCircle, Sparkles } from 'lucide-react';
import { playSound } from '@/utils/soundEffects';

const PracticeSummary = () => {
  const { 
    currentScreen, 
    freeTextEmotion, 
    emotionRatings, 
    timeAvailable, 
    triggerCelebration 
  } = useFlowContext();
  
  const [showVideo, setShowVideo] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);
  
  // This would be replaced by actual API data in a production app
  const videoRecommendation = {
    id: 'Kmiw4FYTq2I',
    title: videoTitle(),
    thumbnail: `https://img.youtube.com/vi/Kmiw4FYTq2I/hqdefault.jpg`,
    duration: timeAvailable
  };
  
  function videoTitle() {
    const emotion = getMainEmotion();
    const time = timeAvailable.split(' ')[0]; // Get only the number part
    
    if (emotion === 'high-energy') {
      return `אימון ${time} דקות אנרגטי וקופצני`;
    } else if (emotion === 'focused') {
      return `אימון ${time} דקות ממוקד ורגוע`;
    } else if (emotion === 'relaxed') {
      return `אימון ${time} דקות מדיטטיבי ומרגיע`;
    } else {
      return `אימון ${time} דקות מאוזן ומותאם אישית`;
    }
  }
  
  function getMainEmotion() {
    const { energy, alertness, lightness, bounciness } = emotionRatings;
    
    if (energy > 7 && bounciness > 6) {
      return 'high-energy';
    } else if (alertness > 7 && energy < 5) {
      return 'focused';
    } else if (lightness > 7 && alertness < 5) {
      return 'relaxed';
    } else {
      return 'balanced';
    }
  }
  
  const handleStartWorkout = () => {
    setVideoStarted(true);
    setShowVideo(true);
    triggerCelebration('confetti');
    playSound('success');
  };
  
  if (!videoRecommendation) {
    return (
      <AnimatedCard isVisible={currentScreen === 4}>
        <div className="flex flex-col items-center justify-center h-full">
          <div className="animate-pulse text-2xl">טוען המלצה...</div>
        </div>
      </AnimatedCard>
    );
  }

  return (
    <AnimatedCard isVisible={currentScreen === 4}>
      <div className="flex flex-col h-full">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <h2 className="text-xl font-medium flex items-center gap-2">
            <span>מצאנו עבורך את האימון המושלם!</span>
            <Sparkles className="text-coachy-yellow animate-pulse-gentle" size={16} />
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            בהתבסס על התחושות והזמן שלך, הנה האימון המתאים ביותר:
          </p>
        </motion.div>
        
        {!videoStarted ? (
          <motion.div 
            className="flex-1 flex flex-col"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="relative rounded-xl overflow-hidden aspect-video mb-3 shadow-md">
              <img 
                src={videoRecommendation.thumbnail} 
                alt={videoRecommendation.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <PlayCircle className="text-white w-16 h-16" />
              </div>
            </div>
            
            <div className="mt-2">
              <h3 className="font-medium text-lg mb-1">{videoRecommendation.title}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>{videoRecommendation.duration} אימון</span>
              </div>
            </div>
            
            <motion.div 
              className="mt-auto pt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Button 
                onClick={handleStartWorkout}
                variant="energetic"
                className="w-full text-white font-medium py-6 relative overflow-hidden group"
                size="lg"
              >
                <span className="relative z-10 flex items-center gap-2">
                  התחל אימון
                  <PlayCircle size={16} />
                </span>
                <span className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 group-active:scale-x-100 transition-transform origin-right duration-300"></span>
              </Button>
            </motion.div>
          </motion.div>
        ) : (
          <div className="flex-1">
            <VideoPlayerWithControls 
              videoId={videoRecommendation.id} 
              title={videoRecommendation.title}
              onClose={() => setShowVideo(false)}
            />
          </div>
        )}
      </div>
    </AnimatedCard>
  );
};

export default PracticeSummary;
