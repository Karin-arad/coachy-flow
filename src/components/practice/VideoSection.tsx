
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
      <div className="w-full">
        <h3 className="t-label mb-3 text-right">
          הסרטון שלך
        </h3>
        <YouTubeVideo videoId={videoId} title={videoTitle} />
      </div>
    );
  }

  return (
    <div className="w-full space-y-3">
      <div className="bg-[hsl(var(--background))] border border-[hsl(var(--border))] rounded-[16px] p-4">
        <p className="t-sub">
          לא מצאנו סרטון כרגע, אבל תוכנית האימון מוכנה.
        </p>
      </div>
      <button
        onClick={onVideoRetry}
        className="btn-secondary !flex-none w-full"
      >
        <RefreshCw className="h-4 w-4" />
        חיפוש סרטון נוסף
      </button>
    </div>
  );
};

export default VideoSection;
