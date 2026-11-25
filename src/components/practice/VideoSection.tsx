import React from 'react';
import { RefreshCw, ExternalLink } from 'lucide-react';
import YouTubeVideo from '@/components/YouTubeVideo';

interface VideoSectionProps {
  videoId: string | null;
  videoTitle: string;
  onVideoRetry: () => void;
  /** True once the person tapped "start": the embedded player begins playing */
  playing?: boolean;
}

const VideoSection = ({ videoId, videoTitle, onVideoRetry, playing = false }: VideoSectionProps) => {
  if (videoId) {
    return (
      <div id="workout-video" className="surface !p-3 w-full">
        <YouTubeVideo videoId={videoId} title={videoTitle} autoplay={playing} />
        {videoTitle && (
          <p dir="auto" className="t-label px-2 pt-3 text-start">{videoTitle}</p>
        )}
        {/* A plain YouTube link: phones open it in the YouTube app when it is installed */}
        <a
          href={`https://www.youtube.com/watch?v=${videoId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-2 min-h-[44px] t-label underline underline-offset-4"
        >
          <ExternalLink size={18} aria-hidden="true" />
          פתיחה באפליקציית יוטיוב
        </a>
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
