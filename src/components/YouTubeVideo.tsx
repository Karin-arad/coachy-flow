
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface YouTubeVideoProps {
  videoId: string;
  title: string;
}

const YouTubeVideo = ({ videoId, title }: YouTubeVideoProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!videoId) {
      setHasError(true);
    }

    // Reset states when videoId changes
    setIsLoading(true);
    setHasError(false);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [videoId, title]);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleIframeError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  if (!videoId) {
    return (
      <div className="w-full aspect-video rounded-[16px] bg-[hsl(var(--background))] flex items-center justify-center text-[hsl(var(--muted-foreground))] text-sm">
        No video available
      </div>
    );
  }

  return (
    <div className="w-full aspect-video rounded-[16px] overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.08)] relative">
      {isLoading && (
        <div className="absolute inset-0 bg-[hsl(var(--background))] flex items-center justify-center">
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2.5 h-2.5 rounded-full bg-[hsl(var(--primary))]"
                animate={{ scale: [0.8, 1.2, 0.8] }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
        </div>
      )}
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title || 'YouTube video player'}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        onLoad={handleIframeLoad}
        onError={handleIframeError}
      />
      {hasError && (
        <div className="absolute inset-0 bg-[hsl(var(--background))]/80 flex items-center justify-center text-[hsl(var(--destructive))] text-sm">
          Error loading video
        </div>
      )}
    </div>
  );
};

export default YouTubeVideo;
