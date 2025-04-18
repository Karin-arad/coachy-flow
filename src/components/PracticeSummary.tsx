
import React, { useState, useEffect } from 'react';
import { useFlowContext } from '@/context/FlowContext';
import { Button } from '@/components/ui/button';
import AnimatedCard from './AnimatedCard';
import { Heart, Play, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { fetchYouTubeData } from '@/utils/openaiService';
import { hasYouTubeApiKey } from '@/utils/apiHelpers';
import YouTubeVideo from './YouTubeVideo';
import { useToast } from '@/hooks/use-toast';

interface VideoData {
  id: string;
  title: string;
}

const PracticeSummary = () => {
  const { currentScreen, freeTextEmotion, emotionRatings, timeAvailable } = useFlowContext();
  const [buttonClicked, setButtonClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    // Only search for videos when we reach this screen
    if (currentScreen === 4) {
      searchForWorkoutVideo();
    }
  }, [currentScreen]);

  const searchForWorkoutVideo = async () => {
    console.log('🔍 Searching for workout video based on user inputs');
    console.log('📝 User input data:', { freeTextEmotion, emotionRatings, timeAvailable });
    
    setIsLoading(true);
    setError(null);
    
    try {
      if (!hasYouTubeApiKey()) {
        console.warn('⚠️ No YouTube API key available, skipping video search');
        setError('No YouTube API key available');
        setIsLoading(false);
        return;
      }
      
      // Generate search query based on user inputs
      let searchQuery = generateSearchQuery(freeTextEmotion, emotionRatings, timeAvailable);
      console.log('🔍 Generated search query:', searchQuery);
      
      const response = await fetchYouTubeData(searchQuery);
      
      if (!response) {
        console.error('❌ YouTube API returned no data');
        setError('Could not fetch video data');
        setIsLoading(false);
        return;
      }
      
      if (response.items && response.items.length > 0) {
        console.log('✅ Found YouTube videos:', response.items.length);
        const video = response.items[0];
        console.log('📺 Selected video:', video.snippet.title);
        
        setVideoData({
          id: video.id.videoId,
          title: video.snippet.title
        });
      } else {
        console.warn('⚠️ No YouTube videos found for the search query');
        setError('No videos found for your preferences');
      }
    } catch (error) {
      console.error('❌ Error fetching YouTube video:', error);
      setError('Error fetching video');
      toast({
        title: 'שגיאה בחיפוש וידאו',
        description: error instanceof Error ? error.message : 'אירעה שגיאה בחיפוש וידאו התרגול',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const generateSearchQuery = (
    freeText: string, 
    ratings: typeof emotionRatings, 
    time: string
  ): string => {
    // Create intensity description based on ratings
    let intensity = "moderate";
    const averageEnergy = (ratings.energy + ratings.bounciness) / 2;
    if (averageEnergy <= 3) intensity = "gentle";
    else if (averageEnergy >= 5) intensity = "energetic";
    
    // Create focus area based on free text
    let focusArea = "";
    const keywords = ["yoga", "pilates", "hiit", "stretching", "meditation", "cardio", "strength"];
    for (const keyword of keywords) {
      if (freeText.toLowerCase().includes(keyword)) {
        focusArea = keyword;
        break;
      }
    }
    
    // Default to yoga if no specific focus found
    if (!focusArea) focusArea = "yoga";
    
    // Extract time duration
    let duration = "";
    if (time.includes("10")) duration = "10 minute";
    else if (time.includes("20")) duration = "20 minute";
    else if (time.includes("חצי")) duration = "30 minute";
    else if (time.includes("שעה")) duration = "60 minute";
    
    return `${intensity} ${focusArea} workout ${duration}`.trim();
  };

  const handleStartPractice = () => {
    setButtonClicked(true);
    
    console.log('Starting practice with data:', {
      freeTextEmotion,
      emotionRatings,
      timeAvailable,
      videoData
    });
    
    // If we have video data, let's open YouTube in a new tab
    if (videoData) {
      window.open(`https://www.youtube.com/watch?v=${videoData.id}`, '_blank');
    }
    
    setTimeout(() => {
      setButtonClicked(false);
    }, 1000);
  };

  return (
    <AnimatedCard isVisible={currentScreen === 4} className="flex flex-col">
      <div className="space-y-3 flex flex-col h-full">
        <motion.div 
          className="flex items-center justify-center gap-2 mb-1"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Sparkles className="text-amber-500 animate-float" size={20} />
          <h2 className="text-xl font-medium text-gray-500">
            נהדר!
          </h2>
          <Heart className="fill-coachy-red stroke-coachy-red animate-heartbeat" size={20} />
        </motion.div>

        <motion.p 
          className="text-base text-gray-500 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          הנה תרגול שיסגור לך פינה
        </motion.p>
        
        <motion.div 
          className="relative overflow-hidden rounded-xl bg-gradient-to-br from-coachy-gray via-gray-100 to-coachy-gray p-1 aspect-video my-2 shadow-md group"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5, type: "spring" }}
          whileHover={{ scale: 1.02 }}
          style={{ maxHeight: "160px" }}
        >
          {isLoading ? (
            <div className="absolute inset-0 backdrop-blur-[1px] bg-white/10 flex items-center justify-center">
              <div className="text-gray-500 flex flex-col items-center gap-2">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                </div>
                <p className="text-xs">מחפש סרטון תרגול מותאם אישית...</p>
              </div>
            </div>
          ) : error ? (
            <div className="absolute inset-0 backdrop-blur-[1px] bg-white/10 flex items-center justify-center">
              <div className="text-gray-500 flex flex-col items-center gap-2">
                <p className="text-xs">{error}</p>
                <div 
                  className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-lg hover:scale-125 transition-transform duration-500 cursor-pointer"
                  onClick={searchForWorkoutVideo}
                >
                  <Play className="text-coachy-blue h-6 w-6 ml-1" />
                </div>
                <p className="text-xs">לחץ לנסות שוב</p>
              </div>
            </div>
          ) : videoData ? (
            <YouTubeVideo videoId={videoData.id} title={videoData.title} />
          ) : (
            <div className="absolute inset-0 backdrop-blur-[1px] bg-white/10 flex items-center justify-center">
              <motion.div 
                className="text-gray-500 flex flex-col items-center gap-2"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div 
                  className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover:scale-125 transition-transform duration-500 hover:bg-gradient-to-r hover:from-coachy-blue hover:to-indigo-600 relative"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={searchForWorkoutVideo}
                >
                  <Play className="text-coachy-blue group-hover:text-white h-6 w-6 ml-1 transition-colors duration-500" />
                </motion.div>
                <p className="text-xs">לא נמצאו סרטונים</p>
              </motion.div>
            </div>
          )}
        </motion.div>
        
        <motion.div 
          className="flex justify-center mt-auto pt-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <Button 
            onClick={handleStartPractice}
            disabled={isLoading || !videoData}
            variant="joyful"
            className="bg-gradient-to-r from-coachy-pink to-coachy-yellow hover:brightness-105 text-white px-6 py-2 text-sm rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-sm hover:shadow-md group relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-1">
              <span>התחילי תרגול</span>
              <Play className="h-4 w-4 ml-1" />
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
