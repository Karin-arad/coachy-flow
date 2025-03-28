
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
    setValue(newValue);
    setHasSettled(false);
    
    // Trigger celebration only when the value actually changes (not just when dragging)
    if (showCelebration && !isDragging && newValue[0] !== lastValue[0]) {
      triggerCelebration();
      setLastValue(newValue);
    }
    
    if (props.onValueChange) {
      props.onValueChange(newValue);
    }
  };

  React.useEffect(() => {
    if (!isDragging && value) {
      const timer = setTimeout(() => {
        setHasSettled(true);
        
        // Trigger celebration when the slider settles after dragging
        if (showCelebration && lastValue[0] !== value[0]) {
          triggerCelebration();
          setLastValue(value);
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isDragging, value, lastValue, showCelebration, triggerCelebration]);

  // Calculate intensity for visual effects based on value
  const intensity = Math.min(((value[0] || 1) / (props.max || 7)) * 100, 100);
  const shadowIntensity = Math.min(intensity / 80, 1);

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
        "relative h-4 w-full grow overflow-hidden rounded-full bg-gradient-to-r shadow-md", // increased height and added shadow
        getTrackColor(emotionType)
      )}>
        <SliderPrimitive.Range className={cn(
          "absolute h-full bg-gradient-to-r",
          hasSettled ? "animate-pulse-gentle" : "",
          getEmotionColor(emotionType),
          // Apply stronger shadow based on value
          intensity > 40 && "shadow-[0_0_15px_rgba(255,255,255,0.7)]" // enhanced glow effect
        )} 
        style={{
          // Add extra shadow/glow effect based on value
          filter: `brightness(${100 + intensity * 0.3}%)`, // increased brightness
          boxShadow: `0 0 ${shadowIntensity * 20}px rgba(255,255,255,${shadowIntensity * 0.8})`, // stronger glow
          transition: "filter 0.3s ease, box-shadow 0.3s ease"
        }}
        />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className={cn(
        "block h-9 w-9 rounded-full border-2 border-white bg-gradient-to-r shadow-lg transition-all duration-200", // increased size and shadow
        "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring focus-visible:ring-offset-2", // stronger focus ring
        "disabled:pointer-events-none disabled:opacity-50",
        isDragging ? "scale-115" : "hover:scale-115", // increased scale effect
        getEmotionColor(emotionType),
        isDragging && "animate-pulse"
      )}
      style={{
        // Add transition for the thumb shadow
        boxShadow: intensity > 50 ? `0 0 ${intensity / 8}px rgba(255,255,255,0.9)` : "", // increased glow
        transition: "box-shadow 0.3s ease, transform 0.2s ease"
      }}
      >
        {showSparkles && value[0] > (props.max || 7) / 2 && (
          <div className="absolute -top-1 -right-1">
            <Sparkles 
              className={cn(
                "text-white drop-shadow-md", 
                value[0] > (props.max || 7) * 0.7 ? "animate-sparkle" : "" // lowered threshold for animation
              )} 
              size={14} // increased size
            />
          </div>
        )}
        {/* Add extra sparkles at high values */}
        {showSparkles && value[0] > (props.max || 7) * 0.7 && ( // lowered threshold
          <div className="absolute -bottom-1 -left-1">
            <Sparkles 
              className="text-white drop-shadow-md animate-sparkle-delayed" 
              size={12} // increased size
            />
          </div>
        )}
      </SliderPrimitive.Thumb>
    </SliderPrimitive.Root>
  )
})
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
