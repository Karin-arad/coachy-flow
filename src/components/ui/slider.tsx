
import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

export interface ColoredSliderProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  emotionType?: "energy" | "bounciness" | "alertness" | "lightness";
  showSparkles?: boolean;
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
>(({ className, emotionType, showSparkles = true, ...props }, ref) => {
  const [isDragging, setIsDragging] = React.useState(false);
  const [value, setValue] = React.useState<number[]>(props.value as number[] || [1]);
  const [hasSettled, setHasSettled] = React.useState(false);
  
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

  React.useEffect(() => {
    if (!isDragging && value) {
      const timer = setTimeout(() => {
        setHasSettled(true);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isDragging, value]);

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
        "relative h-3 w-full grow overflow-hidden rounded-full bg-gradient-to-r",
        getTrackColor(emotionType)
      )}>
        <SliderPrimitive.Range className={cn(
          "absolute h-full bg-gradient-to-r",
          hasSettled ? "animate-pulse-gentle" : "",
          getEmotionColor(emotionType),
          // Apply stronger shadow based on value
          intensity > 50 && "shadow-[0_0_10px_rgba(255,255,255,0.5)]"
        )} 
        style={{
          // Add extra shadow/glow effect based on value
          filter: `brightness(${100 + intensity * 0.2}%)`,
          boxShadow: `0 0 ${shadowIntensity * 15}px rgba(255,255,255,${shadowIntensity * 0.6})`,
          transition: "filter 0.3s ease, box-shadow 0.3s ease"
        }}
        />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className={cn(
        "block h-8 w-8 rounded-full border-2 border-white bg-gradient-to-r shadow-md transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        isDragging ? "scale-110" : "hover:scale-110",
        getEmotionColor(emotionType),
        isDragging && "animate-pulse"
      )}
      style={{
        // Add transition for the thumb shadow
        boxShadow: intensity > 60 ? `0 0 ${intensity / 10}px rgba(255,255,255,0.8)` : "",
        transition: "box-shadow 0.3s ease, transform 0.2s ease"
      }}
      >
        {showSparkles && value[0] > (props.max || 7) / 2 && (
          <div className="absolute -top-1 -right-1">
            <Sparkles 
              className={cn(
                "text-white drop-shadow-md", 
                value[0] > (props.max || 7) * 0.8 ? "animate-sparkle" : ""
              )} 
              size={12} 
            />
          </div>
        )}
        {/* Add extra sparkles at high values */}
        {showSparkles && value[0] > (props.max || 7) * 0.8 && (
          <div className="absolute -bottom-1 -left-1">
            <Sparkles 
              className="text-white drop-shadow-md animate-sparkle-delayed" 
              size={10} 
            />
          </div>
        )}
      </SliderPrimitive.Thumb>
    </SliderPrimitive.Root>
  )
})
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
