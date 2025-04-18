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
      const timer = setTimeout(() => {
        setEncouragingResponse(getEncouragingResponse(freeTextEmotion));
      }, 1500); // 1.5 שניות

      return () => clearTimeout(timer);
    } else {
      setEncouragingResponse(null);
    }
  }, [freeTextEmotion]);

  const handleNextClick = () => {
    if (freeTextEmotion.trim()) {
      goToNextScreen();
    }
  };
  
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
      <div className="space-y-3">
        <motion.div 
          className="flex items-center gap-2 mb-1"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="flex items-center bg-gradient-to-r from-white/50 to-white/30 px-2 py-1 rounded-xl shadow-sm"
            whileHover={{ scale: 1.03 }}
          >
            <span className="text-lg font-black text-gray-500">{greeting}</span>
            <Heart className="fill-coachy-red stroke-coachy-red animate-pulse-gentle mr-1" size={18} />
            <TimeIcon className="text-amber-500 ml-1 animate-[spin_30s_linear_infinite]" size={14} />
          </motion.div>
        </motion.div>
        
        <motion.h2 
          className="text-lg font-black text-coachy-blue mb-2 bg-gradient-to-r from-coachy-blue to-indigo-600 bg-clip-text text-transparent heading"
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
            className="min-h-[80px] max-h-[100px] text-right border-coachy-lightBlue focus:border-coachy-blue resize-none bg-white/80 backdrop-blur-sm rounded-xl p-3 shadow-md transition-all duration-300 focus:ring-2 focus:ring-coachy-blue/30 focus:shadow-lg user-text text-sm"
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
            className="bg-white/80 backdrop-blur-sm rounded-xl p-3 shadow-md border-2 border-coachy-blue/30"
          >
            <div className="flex items-center gap-2 text-gray-700">
              <Sparkles className="text-amber-500 h-4 w-4" />
              <p className="text-right text-xs text-coachy-blue font-medium">
                {encouragingResponse}
              </p>
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
            className="continue-button px-4 py-1 rounded-xl shadow-sm relative overflow-hidden group text-xs"
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
