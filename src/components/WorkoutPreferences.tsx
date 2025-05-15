
import React, { useEffect } from 'react';
import { useFlowContext } from '@/context/FlowContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import AnimatedCard from './AnimatedCard';
import { cn } from '@/lib/utils';
import { Pencil } from 'lucide-react';
import { motion } from 'framer-motion';
import { playSound } from '@/utils/soundEffects';

const WorkoutPreferences = () => {
  const { workoutPreferences, setWorkoutPreferences, goToNextScreen, currentScreen } = useFlowContext();
  
  useEffect(() => {
    console.log('WorkoutPreferences mounted, currentScreen:', currentScreen);
  }, []);

  const handleContinue = () => {
    console.log('WorkoutPreferences: Continue button clicked, moving from screen 3 to 4');
    goToNextScreen();
    playSound('success');
  };
  
  console.log('WorkoutPreferences rendering, currentScreen:', currentScreen);

  // If not on the correct screen, don't render anything
  if (currentScreen !== 3) {
    return null;
  }
  
  return (
    <AnimatedCard 
      isVisible={true} 
      className="h-full flex flex-col"
    >
      <div className="space-y-4 flex flex-col h-full text-sm">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-xl font-semibold mb-1">Almost done 💡</h2>
          <p className="text-gray-600 mb-5">
            Want me to fine-tune your session?
            <br />
            Is there anything I should know – pain, sensitive areas, or a preferred style?
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex-1 relative"
        >
          <Textarea
            value={workoutPreferences}
            onChange={(e) => setWorkoutPreferences(e.target.value)}
            placeholder="For example: no pressure on knees, upper body only, gentle dance, no planks..."
            className={cn(
              "resize-none w-full h-full min-h-[120px] p-4 text-sm rounded-xl",
              "border-2 border-gray-200 focus:border-coachy-blue",
              "focus:ring-1 focus:ring-coachy-blue focus:outline-none",
              "transition-all duration-300 bg-white/80"
            )}
          />
          
          <motion.div 
            className="absolute top-3 right-3 text-coachy-blue opacity-70"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, type: "spring" }}
          >
            <Pencil size={18} className="opacity-60" />
          </motion.div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-auto pt-6"
        >
          <Button 
            onClick={handleContinue}
            variant="energetic"
            className="w-full py-6 rounded-xl relative overflow-hidden group"
          >
            <span className="relative z-10">יאללה, נמשיך</span>
            <span className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 group-active:scale-x-100 transition-transform origin-right duration-300"></span>
          </Button>
        </motion.div>
      </div>
    </AnimatedCard>
  );
};

export default WorkoutPreferences;
