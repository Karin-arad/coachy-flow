import React, { useEffect, useState } from 'react';
import { useFlowContext } from '@/context/FlowContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import AnimatedCard from './AnimatedCard';
import { Heart, Sun, Moon, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const EmotionalPrompt = () => {
  const { freeTextEmotion, setFreeTextEmotion, goToNextScreen, currentScreen } = useFlowContext();
  const [encouragingResponse, setEncouragingResponse] = useState<string | null>(null);
  
  const getEncouragingResponse = (text: string) => {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('טוב') || lowerText.includes('שמח') || lowerText.includes('נהדר')) {
      return "איזה כיף! בואי נשמור על האנרגיה החיובית הזו עם קצת תנועה!";
    }
    
    if (lowerText.includes('עייפ') || lowerText.includes('עייף')) {
      return "לגיטימי להרגיש עייפות! קצת תנועה עדינה יכולה לעזור לך להתרענן.";
    }
    
    if (lowerText.includes('בינוני') || lowerText.includes('ככה ככה')) {
      return "יום בינוני? בואי נהפוך אותו ליום טוב יותר עם קצת פעילות!";
    }
    
    if (lowerText.includes('רע') || lowerText.includes('לא טוב') || lowerText.includes('קשה')) {
      return "אני מבינה שקשה כרגע. תנועה יכולה לעזור לשחרר מתח ולשפר את מצב הרוח.";
    }
    
    return "תודה ששיתפת! בואי נמצא יחד את התרגול המושלם בשבילך.";
  };

  useEffect(() => {
    if (freeTextEmotion.trim()) {
      setEncouragingResponse(getEncouragingResponse(freeTextEmotion));
    } else {
      setEncouragingResponse(null);
    }
  }, [freeTextEmotion]);

  const handleNextClick = () => {
    if (freeTextEmotion.trim()) {
      goToNextScreen();
    }
  };
  
  // Get current hour to display appropriate greeting and icon
  const hour = new Date().getHours();
  const isNight = hour >= 18 || hour < 6;
  const isEvening = hour >= 16 && hour < 18;
  const isMorning = hour >= 6 && hour < 12;
  
  let greeting = "שלום";
  let TimeIcon = Sun;
  
  if (isNight) {
    greeting = "לילה טוב";
    TimeIcon = Moon;
  } else if (isEvening) {
    greeting = "ערב טוב";
    TimeIcon = Sun;
  } else if (isMorning) {
    greeting = "בוקר טוב";
    TimeIcon = Sun;
  } else {
    greeting = "צהריים טובים";
    TimeIcon = Sun;
  }

  return (
    <AnimatedCard isVisible={currentScreen === 1}>
      <div className="space-y-4">
        <motion.div 
          className="flex items-center gap-2 mb-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="flex items-center bg-gradient-to-r from-white/50 to-white/30 px-3 py-1 rounded-xl shadow-sm"
            whileHover={{ scale: 1.03 }}
          >
            <span className="text-xl font-black text-gray-500">{greeting}</span>
            <Heart className="fill-coachy-red stroke-coachy-red animate-pulse-gentle mr-1" size={20} />
            <TimeIcon className="text-amber-500 ml-1 animate-[spin_30s_linear_infinite]" size={16} />
          </motion.div>
        </motion.div>
        
        <motion.h2 
          className="text-xl font-black text-coachy-blue mb-3 bg-gradient-to-r from-coachy-blue to-indigo-600 bg-clip-text text-transparent heading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          איך המרגש היום?
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="emotional-prompt"
        >
          <Textarea
            value={freeTextEmotion}
            onChange={(e) => setFreeTextEmotion(e.target.value)}
            placeholder="רשמי את הרגשות שלך בחופשיות..."
            className="min-h-[100px] max-h-[120px] text-right border-coachy-lightBlue focus:border-coachy-blue resize-none bg-white/80 backdrop-blur-sm rounded-xl p-3 shadow-md transition-all duration-300 focus:ring-2 focus:ring-coachy-blue/30 focus:shadow-lg user-text"
            dir="rtl"
            lang="he"
            autoFocus
          />
        </motion.div>
        
        {encouragingResponse && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md"
          >
            <div className="flex items-center gap-2 text-gray-700">
              <Sparkles className="text-amber-500 h-5 w-5" />
              <p className="text-right text-sm">{encouragingResponse}</p>
            </div>
          </motion.div>
        )}
        
        <motion.div 
          className="flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Button 
            onClick={handleNextClick}
            disabled={!freeTextEmotion.trim()}
            className="continue-button px-5 py-1.5 rounded-xl shadow-sm relative overflow-hidden group font-medium text-sm"
          >
            <span className="relative z-10">יאללה, נמשיך</span>
            <span className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 group-active:scale-x-100 transition-transform origin-right duration-300"></span>
          </Button>
        </motion.div>
      </div>
    </AnimatedCard>
  );
};

export default EmotionalPrompt;
