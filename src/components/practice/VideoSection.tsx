
import React from 'react';
import { RefreshCw } from 'lucide-react';
import YouTubeVideo from '@/components/YouTubeVideo';

interface VideoSectionProps {
  videoId: string | null;
  videoTitle: string;
  onVideoRetry: () => void;
}

const VideoSection = ({ videoId, videoTitle, onVideoRetry }: VideoSectionProps) => {
  if (videoId) {
    return (
      <div className="mt-4 w-full">
        <h3 className="text-[15px] font-semibold text-[hsl(var(--foreground))] mb-3 text-left">
          Your Workout Video
        </h3>
        <YouTubeVideo videoId={videoId} title={videoTitle} />
      </div>
    );
  }

  return (
    <div className="mt-4 w-full space-y-3">
      <div className="bg-[hsl(var(--background))] border border-[hsl(var(--border))] rounded-[16px] p-4">
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          We're having trouble finding a video right now, but your workout plan is ready!
        </p>
      </div>
      <button
        onClick={onVideoRetry}
        className="flex items-center gap-2 text-[hsl(var(--primary))] text-sm font-medium px-4 py-2 rounded-[14px] border border-[hsl(var(--primary))]"
      >
        <RefreshCw className="h-4 w-4" />
        Try Finding Video Again
      </button>
    </div>
  );
};

export default VideoSection;
