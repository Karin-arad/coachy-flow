
import React, { useState, useRef, useEffect } from 'react';
import { Maximize, X, Pause, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface VideoPlayerProps {
  videoId: string;
  title: string;
  onClose?: () => void;
}

const VideoPlayerWithControls: React.FC<VideoPlayerProps> = ({ videoId, title, onClose }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHoveringControls, setIsHoveringControls] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);

  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLIFrameElement>(null);
  const controlsTimeoutRef = useRef<number | null>(null);

  // Handle fullscreen changes
  const toggleFullscreen = () => {
    if (!videoContainerRef.current) return;

    if (!document.fullscreenElement) {
      videoContainerRef.current.requestFullscreen().catch(err => {
        console.error('Error attempting to enable fullscreen:', err);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const handleFullscreenChange = () => {
    setIsFullscreen(!!document.fullscreenElement);
  };

  useEffect(() => {
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Hide controls after inactivity
  useEffect(() => {
    if (!isHoveringControls && isPlaying) {
      if (controlsTimeoutRef.current) {
        window.clearTimeout(controlsTimeoutRef.current);
      }

      controlsTimeoutRef.current = window.setTimeout(() => {
        setControlsVisible(false);
      }, 3000);
    } else {
      setControlsVisible(true);
      if (controlsTimeoutRef.current) {
        window.clearTimeout(controlsTimeoutRef.current);
      }
    }

    return () => {
      if (controlsTimeoutRef.current) {
        window.clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [isHoveringControls, isPlaying]);

  // YouTube iframe API doesn't allow direct control through regular means
  // This is a simplified player with control appearance
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    // In a real implementation, you would interact with the YouTube iframe API
  };

  // Handle device orientation changes
  useEffect(() => {
    const handleOrientationChange = () => {
      const isLandscape = window.matchMedia("(orientation: landscape)").matches;
      if (isLandscape && videoContainerRef.current && !document.fullscreenElement) {
        videoContainerRef.current.requestFullscreen().catch(err => {
          console.error('Error requesting fullscreen on orientation change:', err);
        });
      }
    };

    window.addEventListener('orientationchange', handleOrientationChange);
    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []);

  return (
    <div className="flex flex-col w-full h-full">
      <div
        ref={videoContainerRef}
        className={cn(
          "relative w-full overflow-hidden transition-all duration-300",
          isFullscreen ? "h-full bg-black" : "aspect-video rounded-[16px]"
        )}
        onMouseEnter={() => setIsHoveringControls(true)}
        onMouseLeave={() => setIsHoveringControls(false)}
        onTouchStart={() => {
          setIsHoveringControls(true);
          setTimeout(() => setIsHoveringControls(false), 3000);
        }}
      >
        <iframe
          ref={videoRef}
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />

        {/* Controls overlay */}
        <motion.div
          className={cn(
            "absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end",
            "pointer-events-none transition-opacity duration-300",
            controlsVisible ? "opacity-100" : "opacity-0"
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: controlsVisible ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="p-3 flex items-center justify-between pointer-events-auto">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20 h-8 w-8 p-0"
              onClick={togglePlayPause}
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </Button>

            <div className="flex-grow mx-2 h-1 bg-white/30 rounded-full overflow-hidden">
              <div className="bg-white h-full w-[30%]"></div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20 h-8 w-8 p-0"
              onClick={toggleFullscreen}
            >
              <Maximize size={16} />
            </Button>
          </div>
        </motion.div>

        {/* Close button (only when not in fullscreen) */}
        {!isFullscreen && onClose && (
          <Button
            variant="ghost"
            className="absolute top-2 left-2 text-white bg-black/50 hover:bg-black/70 h-8 w-8 p-0 rounded-full"
            onClick={onClose}
          >
            <X size={16} />
          </Button>
        )}
      </div>

      {/* Video title and info (only when not in fullscreen) */}
      {!isFullscreen && (
        <div className="mt-3 px-1">
          <h3 className="font-semibold text-[15px] text-[hsl(var(--foreground))] line-clamp-2">{title}</h3>
        </div>
      )}
    </div>
  );
};

export default VideoPlayerWithControls;
