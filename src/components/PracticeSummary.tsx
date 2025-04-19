
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

const WORKOUT_TYPES = [
  { type: "yoga", keywords: ["yoga", "יוגה", "גמישות", "מתיחות", "רוגע", "נשימה"] },
  { type: "pilates", keywords: ["pilates", "פילאטיס", "ליבה", "חיזוק"] },
  { type: "hiit", keywords: ["hiit", "היט", "אינטרוול", "אינטנסיבי", "קרדיו"] },
  { type: "meditation", keywords: ["meditation", "מדיטציה", "מיינדפולנס", "רוגע", "נשימות"] },
  { type: "dance", keywords: ["dance", "ריקוד", "זומבה", "תנועה"] },
  { type: "strength", keywords: ["strength", "חיזוק", "כוח", "שרירים", "משקולות"] },
  { type: "stretching", keywords: ["stretching", "מתיחות", "גמישות"] },
  { type: "cardio", keywords: ["cardio", "קרדיו", "אירובי", "לב", "ריצה"] },
  { type: "walking", keywords: ["walking", "הליכה", "צעידה"] },
  { type: "barre", keywords: ["barre", "באר", "בלט"] },
  { type: "functional", keywords: ["functional", "פונקציונלי", "תפקודי"] }
];

const PracticeSummary = () => {
  const { currentScreen, freeTextEmotion, emotionRatings, timeAvailable } = useFlowContext();
  const [buttonClicked, setButtonClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [workoutHistory, setWorkoutHistory] = useState<string[]>([]);
  const { toast } = useToast();
  
  useEffect(() => {
    const history = localStorage.getItem('workout-history');
    if (history) {
      try {
        setWorkoutHistory(JSON.parse(history));
      } catch (e) {
        console.error('Error parsing workout history:', e);
        setWorkoutHistory([]);
      }
    }
    
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
      
      let searchQuery = generateSearchQuery(freeTextEmotion, emotionRatings, timeAvailable, workoutHistory);
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
        
        updateWorkoutHistory(searchQuery);
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
  
  const updateWorkoutHistory = (searchQuery: string) => {
    const workoutType = WORKOUT_TYPES.find(workout => 
      searchQuery.toLowerCase().includes(workout.type)
    )?.type || "unknown";
    
    const updatedHistory = [...workoutHistory, workoutType].slice(-5);
    setWorkoutHistory(updatedHistory);
    
    try {
      localStorage.setItem('workout-history', JSON.stringify(updatedHistory));
    } catch (e) {
      console.error('Error saving workout history:', e);
    }
    
    console.log('🔄 Updated workout history:', updatedHistory);
  };
  
  const generateSearchQuery = (
    freeText: string, 
    ratings: typeof emotionRatings, 
    time: string,
    history: string[]
  ): string => {
    let intensity = "moderate";
    const averageEnergy = (ratings.energy + ratings.bounciness) / 2;
    if (averageEnergy <= 3) intensity = "gentle";
    else if (averageEnergy >= 5) intensity = "energetic";
    
    const suggestedWorkouts = findMatchingWorkouts(freeText.toLowerCase());
    
    let filteredWorkouts = suggestedWorkouts.filter(workout => !history.includes(workout.type));
    
    if (filteredWorkouts.length === 0) {
      filteredWorkouts = suggestedWorkouts.length > 0 ? suggestedWorkouts : WORKOUT_TYPES;
    }
    
    let selectedWorkout;
    
    if (filteredWorkouts.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredWorkouts.length);
      selectedWorkout = filteredWorkouts[randomIndex];
    } else {
      if (averageEnergy <= 3) {
        const gentleWorkouts = WORKOUT_TYPES.filter(w => 
          ["yoga", "stretching", "meditation", "walking"].includes(w.type)
        );
        selectedWorkout = gentleWorkouts[Math.floor(Math.random() * gentleWorkouts.length)];
      } else if (averageEnergy >= 5) {
        const intenseWorkouts = WORKOUT_TYPES.filter(w => 
          ["hiit", "cardio", "dance", "strength"].includes(w.type)
        );
        selectedWorkout = intenseWorkouts[Math.floor(Math.random() * intenseWorkouts.length)];
      } else {
        const balancedWorkouts = WORKOUT_TYPES.filter(w => 
          ["pilates", "barre", "functional", "strength"].includes(w.type)
        );
        selectedWorkout = balancedWorkouts[Math.floor(Math.random() * balancedWorkouts.length)];
      }
    }
    
    let duration = "";
    if (time.includes("10")) duration = "10 minute";
    else if (time.includes("20")) duration = "20 minute";
    else if (time.includes("חצי")) duration = "30 minute";
    else if (time.includes("שעה")) duration = "60 minute";
    
    return `${intensity} ${selectedWorkout.type} workout ${duration}`.trim();
  };
  
  const findMatchingWorkouts = (text: string): typeof WORKOUT_TYPES => {
    return WORKOUT_TYPES.filter(workout => 
      workout.keywords.some(keyword => text.includes(keyword))
    );
  };

  const handleStartPractice = () => {
    setButtonClicked(true);
    
    console.log('Starting practice with data:', {
      freeTextEmotion,
      emotionRatings,
      timeAvailable,
      videoData
    });
    
    if (videoData) {
      window.open(`https://www.youtube.com/watch?v=${videoData.id}`, '_blank');
    }
    
    setTimeout(() => {
      setButtonClicked(false);
    }, 1000);
  };

  return (
    <AnimatedCard isVisible={currentScreen === 4} className="flex flex-col w-full max-w-2xl mx-auto">
      <div className="space-y-4 flex flex-col h-full items-center">
        <motion.div 
          className="flex items-center justify-center gap-2 mb-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Sparkles className="text-amber-500 animate-float" size={24} />
          <h2 className="text-2xl font-medium text-gray-500">
            נהדר!
          </h2>
          <Heart className="fill-coachy-red stroke-coachy-red animate-heartbeat" size={24} />
        </motion.div>

        <motion.p 
          className="text-lg text-gray-500 text-center mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          הנה תרגול שיסגור לך פינה
        </motion.p>
        
        <motion.div 
          className="relative overflow-hidden rounded-xl bg-gradient-to-br from-coachy-gray via-gray-100 to-coachy-gray p-1 w-full aspect-video shadow-lg group hover:shadow-xl transition-shadow duration-300"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5, type: "spring" }}
          whileHover={{ scale: 1.02 }}
        >
          {isLoading ? (
            <div className="absolute inset-0 backdrop-blur-[1px] bg-white/10 flex items-center justify-center">
              <div className="text-gray-500 flex flex-col items-center gap-3">
                <div className="flex space-x-2">
                  <div className="w-4 h-4 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-4 h-4 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-4 h-4 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                </div>
                <p className="text-sm">מחפש סרטון תרגול מותאם אישית...</p>
              </div>
            </div>
          ) : error ? (
            <div className="absolute inset-0 backdrop-blur-[1px] bg-white/10 flex items-center justify-center">
              <div className="text-gray-500 flex flex-col items-center gap-3">
                <p className="text-sm">{error}</p>
                <div 
                  className="w-14 h-14 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-lg hover:scale-125 transition-transform duration-500 cursor-pointer"
                  onClick={searchForWorkoutVideo}
                >
                  <Play className="text-coachy-blue h-7 w-7 ml-1" />
                </div>
                <p className="text-sm">לחץ לנסות שוב</p>
              </div>
            </div>
          ) : videoData ? (
            <YouTubeVideo videoId={videoData.id} title={videoData.title} />
          ) : (
            <div className="absolute inset-0 backdrop-blur-[1px] bg-white/10 flex items-center justify-center">
              <motion.div 
                className="text-gray-500 flex flex-col items-center gap-3"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div 
                  className="w-14 h-14 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover:scale-125 transition-transform duration-500 hover:bg-gradient-to-r hover:from-coachy-blue hover:to-indigo-600 relative"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={searchForWorkoutVideo}
                >
                  <Play className="text-coachy-blue group-hover:text-white h-7 w-7 ml-1 transition-colors duration-500" />
                </motion.div>
                <p className="text-sm">לא נמצאו סרטונים</p>
              </motion.div>
            </div>
          )}
        </motion.div>
        
        <motion.div 
          className="flex justify-center mt-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <Button 
            onClick={handleStartPractice}
            disabled={isLoading || !videoData}
            variant="joyful"
            className="bg-gradient-to-r from-coachy-pink to-coachy-yellow hover:brightness-105 text-white px-8 py-3 text-base rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-sm hover:shadow-md group relative overflow-hidden"
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
