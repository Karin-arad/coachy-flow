
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Check, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { useFlowContext } from "@/context/FlowContext"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 active:scale-95 active:bg-primary/95",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:scale-105 active:scale-95",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground hover:scale-105 active:scale-95",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:scale-105 active:scale-95",
        ghost: "hover:bg-accent hover:text-accent-foreground hover:scale-105 active:scale-95",
        link: "text-primary underline-offset-4 hover:underline",
        green: "bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:brightness-110 hover:from-green-400 hover:to-emerald-400 hover:scale-105 active:scale-95 active:brightness-90 shadow-sm hover:shadow-md",
        // Enhanced colorful variants
        rainbow: "bg-gradient-to-r from-coachy-pink via-coachy-yellow to-coachy-blue text-white hover:brightness-110 hover:scale-105 active:scale-95 active:brightness-90 shadow-sm hover:shadow-lg",
        energetic: "bg-gradient-to-r from-coachy-yellow to-amber-500 text-white hover:brightness-110 hover:scale-105 active:scale-95 active:brightness-90 shadow-sm hover:shadow-lg",
        calm: "bg-gradient-to-r from-coachy-blue to-coachy-turquoise text-white hover:brightness-110 hover:scale-105 active:scale-95 active:brightness-90 shadow-sm hover:shadow-lg",
        joyful: "bg-gradient-to-r from-coachy-pink to-coachy-yellow text-white hover:brightness-110 hover:scale-105 active:scale-95 active:brightness-90 shadow-sm hover:shadow-lg",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  showCompletionEffect?: boolean;
  showCelebration?: boolean;
  sparkleEffect?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    asChild = false, 
    showCompletionEffect = false, 
    showCelebration = true, 
    sparkleEffect = true, 
    onClick, 
    ...props 
  }, ref) => {
    const Comp = asChild ? Slot : "button"
    const [isClicked, setIsClicked] = React.useState(false);
    const [showCompletion, setShowCompletion] = React.useState(false);
    const [showSparkles, setShowSparkles] = React.useState(false);
    const { triggerCelebration } = useFlowContext();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      setIsClicked(true);
      
      // Show sparkles on button click if enabled
      if (sparkleEffect && !props.disabled) {
        setShowSparkles(true);
        setTimeout(() => setShowSparkles(false), 1000);
      }
      
      // If completion effect is requested, show it after a delay
      if (showCompletionEffect) {
        setTimeout(() => {
          setShowCompletion(true);
          
          // Hide the completion effect after 2 seconds
          setTimeout(() => {
            setShowCompletion(false);
          }, 2000);
        }, 200);
      }
      
      // Show celebration on button click if enabled
      if (showCelebration && !props.disabled) {
        // Trigger two different celebration effects for more impact
        triggerCelebration('confetti');
        
        // Add a second celebration with a delay
        setTimeout(() => {
          const celebrations = ['stars', 'emoji', 'fireworks'] as const;
          const randomCelebration = celebrations[Math.floor(Math.random() * celebrations.length)];
          triggerCelebration(randomCelebration);
        }, 500);
      }
      
      // Reset the click state after the animation duration
      setTimeout(() => {
        setIsClicked(false);
      }, 300);
      
      // Call the original onClick handler
      onClick?.(e);
    };
    
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          isClicked && "animate-button-press",
          isClicked && "shadow-inner",
          "relative overflow-hidden" // Added for sparkle container
        )}
        ref={ref}
        onClick={handleClick}
        {...props}
      >
        <span className="relative flex items-center gap-2">
          {props.children}
          
          {/* Completion check mark that appears and fades */}
          {showCompletion && (
            <span className="absolute -right-6 animate-check-appear">
              <Check className="text-white h-5 w-5" />
            </span>
          )}
        </span>
        
        {/* Sparkle effects on the button */}
        {showSparkles && (
          <>
            <span className="absolute top-0 right-0 animate-sparkle">
              <Sparkles className="text-white h-4 w-4" />
            </span>
            <span className="absolute bottom-0 left-0 animate-sparkle-delayed">
              <Sparkles className="text-white h-3 w-3" />
            </span>
            <span className="absolute top-1/2 left-1/4 transform -translate-y-1/2 animate-sparkle" style={{ animationDelay: '0.2s' }}>
              <Sparkles className="text-white h-3 w-3" />
            </span>
          </>
        )}
        
        {/* Ripple effect on click */}
        {isClicked && (
          <>
            <span className="absolute inset-0 bg-white/30 rounded-md animate-ripple" />
            <span className="absolute inset-0 bg-white/20 rounded-md animate-ripple" style={{ animationDelay: '0.1s' }} />
          </>
        )}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
