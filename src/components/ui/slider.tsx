
import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { useFlowContext } from "@/context/FlowContext"
import { playSound } from "@/utils/soundEffects"

export interface ColoredSliderProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  emotionType?: "energy" | "bounciness" | "alertness" | "lightness";
  showSparkles?: boolean;
  showCelebration?: boolean;
}

// Modified color getters to use the warm palette
const getEmotionColor = (type?: ColoredSliderProps["emotionType"]) => {
  switch (type) {
    case "energy":
      return "from-[hsl(var(--primary))] to-[hsl(var(--energy))]";
    case "bounciness":
      return "from-[hsl(var(--primary))] to-[hsl(var(--primary-light))]";
    case "alertness":
      return "from-[hsl(var(--primary-light))] to-[hsl(var(--primary))]";
    case "lightness":
      return "from-[hsl(var(--primary-light))] to-[hsl(var(--secondary))]";
    default:
      return "from-[hsl(var(--primary))] to-[hsl(var(--primary-light))]";
  }
};

const getTrackColor = (type?: ColoredSliderProps["emotionType"]) => {
  return "bg-gray-100";
};

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  ColoredSliderProps
>(({ className, emotionType, showSparkles = true, showCelebration = true, ...props }, ref) => {
  const [isDragging, setIsDragging] = React.useState(false);
  const [value, setValue] = React.useState<number[]>(props.value as number[] || [1]);
  const [hasSettled, setHasSettled] = React.useState(false);
  const [lastValue, setLastValue] = React.useState<number[]>(props.value as number[] || [1]);
  const { triggerCelebration } = useFlowContext();
  
  React.useEffect(() => {
    if (props.value) {
      setValue(props.value as number[]);
    }
  }, [props.value]);

  const handleValueChange = (newValue: number[]) => {
    setValue(newValue);
    setHasSettled(false);
    
    if (props.onValueChange) {
      props.onValueChange(newValue);
    }
  };
  
  const handleDragEnd = () => {
    setIsDragging(false);
    playSound('ding'); // Play the ding sound when slider is released
    
    if (showCelebration && value && value[0] > 7) {
      triggerCelebration('stars');
    }
  };

  React.useEffect(() => {
    if (!isDragging && value) {
      const timer = setTimeout(() => {
        setHasSettled(true);
        
        if (showCelebration && lastValue[0] !== value[0]) {
          setLastValue(value);
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isDragging, value, lastValue, showCelebration, triggerCelebration]);

  const intensity = Math.min(((value[0] || 1) / (props.max || 7)) * 100, 100);

  // Simplified sparkles effect
  const getSparkles = () => {
    if (!showSparkles || value[0] <= 5) return null;
    
    return (
      <div className="absolute -right-1 -top-1 pointer-events-none">
        <Sparkles className="text-yellow-400 drop-shadow-lg animate-pulse" size={12} />
      </div>
    );
  };

  return (
    <SliderPrimitive.Root
      dir="rtl" // Ensure RTL layout for the slider
      ref={ref}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className
      )}
      onPointerDown={() => setIsDragging(true)}
      onPointerUp={handleDragEnd}
      onValueChange={handleValueChange}
      {...props}
    >
      <SliderPrimitive.Track className={cn(
        "relative h-2 w-full grow overflow-hidden rounded-full",
        getTrackColor(emotionType)
      )}>
        <SliderPrimitive.Range className={cn(
          "absolute h-full bg-gradient-to-r",
          hasSettled ? "animate-pulse-gentle" : "",
          getEmotionColor(emotionType)
        )} />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className={cn(
        "block h-6 w-6 rounded-full border-2 border-white bg-gradient-to-r shadow-md transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
        "disabled:pointer-events-none disabled:opacity-50",
        isDragging ? "scale-110" : "hover:scale-110",
        getEmotionColor(emotionType),
        isDragging && "animate-pulse"
      )}
      >
        {getSparkles()}
      </SliderPrimitive.Thumb>
    </SliderPrimitive.Root>
  )
})

Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
