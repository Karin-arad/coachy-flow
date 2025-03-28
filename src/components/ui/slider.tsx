
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
      return "from-coachy-yellow to-amber-300";
    case "bounciness":
      return "from-coachy-pink to-pink-300";
    case "alertness":
      return "from-coachy-blue to-indigo-400";
    case "lightness":
      return "from-coachy-turquoise to-teal-300";
    default:
      return "from-coachy-blue to-indigo-600";
  }
};

const getTrackColor = (type?: ColoredSliderProps["emotionType"]) => {
  switch (type) {
    case "energy":
      return "from-yellow-100 to-amber-100";
    case "bounciness":
      return "from-pink-100 to-rose-100";
    case "alertness":
      return "from-blue-100 to-indigo-100";
    case "lightness":
      return "from-teal-100 to-emerald-100";
    default:
      return "from-coachy-lightBlue to-blue-100";
  }
};

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  ColoredSliderProps
>(({ className, emotionType, showSparkles = true, ...props }, ref) => {
  const [isDragging, setIsDragging] = React.useState(false);
  const [value, setValue] = React.useState<number[]>(props.value as number[] || [1]);
  
  React.useEffect(() => {
    if (props.value) {
      setValue(props.value as number[]);
    }
  }, [props.value]);

  const handleValueChange = (newValue: number[]) => {
    setValue(newValue);
    if (props.onValueChange) {
      props.onValueChange(newValue);
    }
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
        "relative h-3 w-full grow overflow-hidden rounded-full bg-gradient-to-r",
        getTrackColor(emotionType)
      )}>
        <SliderPrimitive.Range className={cn(
          "absolute h-full bg-gradient-to-r animate-pulse-gentle",
          getEmotionColor(emotionType)
        )} />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className={cn(
        "block h-8 w-8 rounded-full border-2 border-white bg-gradient-to-r shadow-md transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        isDragging ? "scale-110" : "hover:scale-110",
        getEmotionColor(emotionType),
        isDragging && "animate-pulse"
      )}>
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
      </SliderPrimitive.Thumb>
    </SliderPrimitive.Root>
  )
})
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
