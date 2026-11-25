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
      <div className="surface !p-3 w-full">
        <YouTubeVideo videoId={videoId} title={videoTitle} />
        {videoTitle && (
          <p dir="auto" className="t-label px-2 pt-3 pb-1 text-start">{videoTitle}</p>
        )}
      </div>
    );
  }

  return (
    <div className="surface w-full flex flex-col gap-4">
      <p className="t-body">לא מצאנו סרטון כרגע, אבל תוכנית האימון מוכנה.</p>
      <button onClick={onVideoRetry} className="btn-secondary !flex-none w-full !bg-[rgba(23,21,59,0.08)]">
        <RefreshCw className="h-4 w-4" />
        חיפוש סרטון נוסף
      </button>
    </div>
  );
};

export default VideoSection;
