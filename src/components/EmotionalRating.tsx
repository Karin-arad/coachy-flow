
import React, { useEffect } from 'react';
import { useFlowContext } from '@/context/FlowContext';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import AnimatedCard from './AnimatedCard';
import { Sparkles, Zap, Eye, Feather, ChevronRight, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

const EmotionalRating = () => {
  const { 
    emotionRatings, 
    setEmotionRatings, 
    goToNextScreen, 
    currentScreen, 
    currentSlider, 
    setCurrentSlider 
  } = useFlowContext();
  
  // Reset scroll position when component becomes visible
  useEffect(() => {
    if (currentScreen === 2) {
      window.scrollTo(0, 0);
    }
  }, [currentScreen]);
  
  const handleRatingChange = (parameter: keyof typeof emotionRatings, value: number[]) => {
    setEmotionRatings({
      ...emotionRatings,
      [parameter]: value[0],
    });
  };

  const parameters = [
    { 
      id: 'bounciness', 
      label: 'קופצנות', 
      question: 'כמה קופצנית את מרגישה?', 
      icon: <Feather className="text-coachy-pink animate-float" size={20} />,
      type: 'bounciness' as const
    },
    { 
      id: 'energy', 
      label: 'אנרגיה', 
      question: 'מה רמת האנרגיה שלך?', 
      icon: <Zap className="text-coachy-yellow animate-pulse-gentle" size={20} />,
      type: 'energy' as const
    },
    { 
      id: 'alertness', 
      label: 'ערנות', 
      question: 'כמה ערנית את מרגישה?', 
      icon: <Eye className="text-coachy-blue animate-pulse-gentle" size={20} />,
      type: 'alertness' as const
    },
    { 
      id: 'lightness', 
      label: 'קלילות', 
      question: 'מה תחושת הקלילות שלך?', 
      icon: <Feather className="text-coachy-turquoise animate-float" size={20} />,
      type: 'lightness' as const
    },
  ];

  // Get current parameter
  const currentParam = parameters[currentSlider];
  
  // Determine if we're on the last parameter
  const isLastSlider = currentSlider === parameters.length - 1;

  // Handle navigation between sliders
  const goToPrevSlider = () => {
    if (currentSlider > 0) {
      setCurrentSlider(currentSlider - 1);
    }
  };

  const goToNextSlider = () => {
    if (currentSlider < parameters.length - 1) {
      setCurrentSlider(currentSlider + 1);
    }
  };

  return (
    <AnimatedCard 
      isVisible={currentScreen === 2} 
      className="screen-2-container h-[calc(100vh-200px)]"
    >
      <div className="space-y-6 text-sm">
        <h2 className="text-xl font-medium text-coachy-blue mb-5 flex items-center gap-2">
          <span>דרגי את עצמך מ־1 עד 7 בכל אחד מהפרמטרים הבאים:</span>
          <Sparkles className="text-amber-500" size={18} />
        </h2>
        
        <div className="space-y-12">
          {currentParam && (
            <div key={currentParam.id} className={cn(
              "space-y-3 bg-gradient-to-r p-5 rounded-xl transition-all duration-300",
              emotionRatings[currentParam.id as keyof typeof emotionRatings] > 4 ? 
                "from-white/70 to-white/40 shadow-md" : 
                "from-white/50 to-transparent"
            )}>
              <div className="flex items-center gap-3">
                {currentParam.icon}
                <div className={cn(
                  "text-base font-medium bg-gradient-to-r bg-clip-text text-transparent",
                  currentParam.id === 'bounciness' && "from-coachy-pink to-pink-600",
                  currentParam.id === 'energy' && "from-coachy-yellow to-amber-500",
                  currentParam.id === 'alertness' && "from-coachy-blue to-indigo-600",
                  currentParam.id === 'lightness' && "from-coachy-turquoise to-teal-600"
                )}>
                  {currentParam.question}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-sm text-coachy-text font-medium">{currentParam.label}</div>
                <div className={cn(
                  "text-xl font-medium bg-gradient-to-r bg-clip-text text-transparent",
                  currentParam.id === 'bounciness' && "from-coachy-pink to-pink-600",
                  currentParam.id === 'energy' && "from-coachy-yellow to-amber-500",
                  currentParam.id === 'alertness' && "from-coachy-blue to-indigo-600",
                  currentParam.id === 'lightness' && "from-coachy-turquoise to-teal-600"
                )}>
                  {emotionRatings[currentParam.id as keyof typeof emotionRatings]}
                </div>
              </div>
              <Slider
                emotionType={currentParam.type}
                value={[emotionRatings[currentParam.id as keyof typeof emotionRatings]]}
                min={1}
                max={7}
                step={1}
                onValueChange={(value) => handleRatingChange(currentParam.id as keyof typeof emotionRatings, value)}
                className="py-3"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>נמוך</span>
                <span>גבוה</span>
              </div>
            </div>
          )}
        </div>
        
        {/* Navigation buttons */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            size="sm"
            onClick={goToPrevSlider}
            disabled={currentSlider === 0}
            className="flex items-center gap-1"
          >
            <ChevronRight size={16} />
            <span>הקודם</span>
          </Button>
          
          {isLastSlider ? (
            <Button 
              onClick={goToNextScreen}
              variant="energetic"
              showCompletionEffect={true}
              className="text-white px-5 py-1.5 transition-all duration-300 transform hover:scale-105 active:scale-95 rounded-xl shadow-sm hover:shadow-md hover:brightness-105 relative overflow-hidden group text-sm"
            >
              <span className="relative z-10">יאללה, נמשיך</span>
              <span className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 group-active:scale-x-100 transition-transform origin-right duration-300"></span>
            </Button>
          ) : (
            <Button
              variant="joyful"
              size="sm"
              onClick={goToNextSlider}
              className="flex items-center gap-1"
            >
              <span>הבא</span>
              <ChevronLeft size={16} />
            </Button>
          )}
        </div>
        
        {/* Pagination dots for visual feedback */}
        <div className="flex justify-center gap-2 mt-4">
          {parameters.map((_, index) => (
            <div 
              key={index}
              className={cn(
                "h-2 w-2 rounded-full transition-all duration-300",
                index === currentSlider ? "bg-coachy-blue w-4" : "bg-gray-300"
              )}
              onClick={() => setCurrentSlider(index)}
            />
          ))}
        </div>
      </div>
    </AnimatedCard>
  );
};

export default EmotionalRating;
