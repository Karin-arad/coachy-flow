
import React from 'react';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import YouTubeVideo from '@/components/YouTubeVideo';

interface VideoSectionProps {
  videoId: string | null;
  videoTitle: string;
  onVideoRetry: () => void;
}

const VideoSection = ({ videoId, videoTitle, onVideoRetry }: VideoSectionProps) => {
  if (videoId) {
    return (
      <div className="mt-6">
        <h3 className="text-lg font-medium mb-3">Your Workout Video</h3>
        <YouTubeVideo videoId={videoId} title={videoTitle} />
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-3">
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <p className="text-amber-800 text-sm">
          We're having trouble finding a video right now, but your workout plan is ready!
        </p>
      </div>
      <Button 
        onClick={onVideoRetry}
        variant="outline"
        className="flex items-center gap-2"
        size="sm"
      >
        <RefreshCw className="h-4 w-4" />
        Try Finding Video Again
      </Button>
    </div>
  );
};

export default VideoSection;
