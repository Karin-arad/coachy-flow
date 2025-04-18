
import React, { useState, useEffect } from 'react';

interface YouTubeVideoProps {
  videoId: string;
  title: string;
}

const YouTubeVideo = ({ videoId, title }: YouTubeVideoProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  
  useEffect(() => {
    console.log('🎬 YouTubeVideo component mounted with:', { videoId, title });
    
    if (!videoId) {
      console.error('❌ Missing videoId for YouTube embed');
      setHasError(true);
    }
    
    // Reset states when videoId changes
    setIsLoading(true);
    setHasError(false);
    
    // Simulate checking if video loads
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [videoId, title]);

  const handleIframeLoad = () => {
    console.log('✅ YouTube iframe loaded successfully for:', videoId);
    setIsLoading(false);
  };

  const handleIframeError = () => {
    console.error('❌ Error loading YouTube video:', videoId);
    setHasError(true);
    setIsLoading(false);
  };

  if (!videoId) {
    console.warn('⚠️ No videoId provided to YouTubeVideo component');
    return (
      <div className="w-full max-w-[560px] aspect-video rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
        No video available
      </div>
    );
  }

  return (
    <div className="w-full max-w-[560px] aspect-video rounded-lg overflow-hidden shadow-lg relative">
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce delay-100"></div>
            <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce delay-200"></div>
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
        <div className="absolute inset-0 bg-gray-100/80 flex items-center justify-center text-red-500">
          Error loading video
        </div>
      )}
    </div>
  );
};

export default YouTubeVideo;
