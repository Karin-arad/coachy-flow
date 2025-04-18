import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { useFlowContext } from "@/context/FlowContext"

export interface ColoredSliderProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  emotionType?: "energy" | "bounciness" | "alertness" | "lightness";
  showSparkles?: boolean;
  showCelebration?: boolean;
}

const getEmotionColor = (type?: ColoredSliderProps["emotionType"]) => {
  switch (type) {
    case "energy":
      return "from-amber-300 via-coachy-yellow to-orange-400";
    case "bounciness":
      return "from-pink-300 via-coachy-pink to-rose-400";
    case "alertness":
      return "from-blue-300 via-coachy-blue to-indigo-500";
    case "lightness":
      return "from-teal-300 via-coachy-turquoise to-emerald-400";
    default:
      return "from-coachy-blue to-indigo-600";
  }
};

const getTrackColor = (type?: ColoredSliderProps["emotionType"]) => {
  switch (type) {
    case "energy":
      return "from-yellow-100 to-amber-200";
    case "bounciness":
      return "from-pink-100 to-rose-200";
    case "alertness":
      return "from-blue-100 to-indigo-200";
    case "lightness":
      return "from-teal-100 to-emerald-200";
    default:
      return "from-coachy-lightBlue to-blue-200";
  }
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
    const reversedValue = [props.max || 7 + 1 - newValue[0]];
    setValue(reversedValue);
    setHasSettled(false);
    
    if (showCelebration && !isDragging && reversedValue[0] !== lastValue[0]) {
      // Apply this condition to ALL sliders when the value crosses 3
      if (reversedValue[0] > 3) {
        triggerCelebration('confetti');
      }
      setLastValue(reversedValue);
    }
    
    if (props.onValueChange) {
      props.onValueChange(reversedValue);
    }
  };

  React.useEffect(() => {
    if (!isDragging && value) {
      const timer = setTimeout(() => {
        setHasSettled(true);
        
        if (showCelebration && lastValue[0] !== value[0]) {
          // Apply this condition to ALL sliders when the value crosses 3
          if (value[0] > 3) {
            triggerCelebration('stars');
          }
          setLastValue(value);
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isDragging, value, lastValue, showCelebration, triggerCelebration]);

  const intensity = Math.min(((value[0] || 1) / (props.max || 7)) * 100, 100);
  const shadowIntensity = Math.min(intensity / 80, 1);

  const getSparkles = () => {
    if (!showSparkles) return null;
    
    const sparklePositions = [
      { top: -1, right: -1, size: 16, delay: 0 },
      { top: -3, right: 4, size: 14, delay: 0.2 },
      { top: 4, right: -3, size: 12, delay: 0.4 },
      { bottom: -1, left: -1, size: 15, delay: 0.3 },
      { bottom: 4, right: 0, size: 10, delay: 0.5 },
    ];
    
    const threshold = (props.max || 7) * 0.4;
    
    if (value[0] <= threshold) {
      return null;
    }
    
    const sparkleCount = Math.floor(((value[0] - threshold) / (props.max || 7)) * sparklePositions.length) + 1;
    
    return sparklePositions.slice(0, sparkleCount).map((pos, index) => (
      <div 
        key={index}
        className="absolute" 
        style={{
          top: pos.top !== undefined ? `${pos.top}px` : undefined,
          right: pos.right !== undefined ? `${pos.right}px` : undefined,
          bottom: pos.bottom !== undefined ? `${pos.bottom}px` : undefined,
          left: pos.left !== undefined ? `${pos.left}px` : undefined,
          animation: `sparkle ${1.5 + pos.delay}s infinite ease-in-out`,
          animationDelay: `${pos.delay}s`
        }}
      >
        <Sparkles 
          className="text-white drop-shadow-lg" 
          size={pos.size} 
        />
      </div>
    ));
  };

  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className
      )}
      onPointerDown={() => setIsDragging(true)}
      onPointerUp={() => setIsDragging(false)}
      onValueChange={handleValueChange}
      {...props}
    >
      <SliderPrimitive.Track className={cn(
        "relative h-5 w-full grow overflow-hidden rounded-full bg-gradient-to-r shadow-md",
        getTrackColor(emotionType)
      )}>
        <SliderPrimitive.Range className={cn(
          "absolute h-full bg-gradient-to-r",
          hasSettled ? "animate-pulse-gentle" : "",
          getEmotionColor(emotionType),
          intensity > 30 && "shadow-[0_0_20px_rgba(255,255,255,0.8)]"
        )} 
        style={{
          filter: `brightness(${100 + intensity * 0.5}%)`,
          boxShadow: `0 0 ${shadowIntensity * 25}px rgba(255,255,255,${shadowIntensity * 0.9})`,
          transition: "filter 0.3s ease, box-shadow 0.3s ease"
        }}
        />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className={cn(
        "block h-10 w-10 rounded-full border-2 border-white bg-gradient-to-r shadow-lg transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        isDragging ? "scale-120" : "hover:scale-120",
        getEmotionColor(emotionType),
        isDragging && "animate-pulse"
      )}
      style={{
        boxShadow: intensity > 40 ? `0 0 ${intensity / 6}px ${intensity / 3}px rgba(255,255,255,0.9)` : "",
        transition: "box-shadow 0.3s ease, transform 0.2s ease"
      }}
      >
        {getSparkles()}
      </SliderPrimitive.Thumb>
    </SliderPrimitive.Root>
  )
})
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
