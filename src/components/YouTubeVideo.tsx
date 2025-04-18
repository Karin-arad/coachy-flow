
import React from 'react';

interface YouTubeVideoProps {
  videoId: string;
  title: string;
}

const YouTubeVideo = ({ videoId, title }: YouTubeVideoProps) => {
  return (
    <div className="w-full max-w-[560px] aspect-video rounded-lg overflow-hidden shadow-lg">
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

export default YouTubeVideo;
