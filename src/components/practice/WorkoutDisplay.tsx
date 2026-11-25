
import React from 'react';

interface WorkoutDisplayProps {
  workoutDescription: string;
}

const WorkoutDisplay = ({ workoutDescription }: WorkoutDisplayProps) => {
  // Extract first line as title, rest as description
  const lines = workoutDescription.trim().split('\n');
  const title = lines[0];
  const description = lines.slice(1).join('\n').trim();

  // Extract any hashtag-style tags or keywords from the title
  const tags = title.match(/#\w+/g) || [];
  const cleanTitle = title.replace(/#\w+/g, '').trim();

  return (
    <div dir="auto" className="w-full text-start">
      {tags.length > 0 && (
        <div className="flex gap-2 flex-wrap mb-3">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="chip"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      {cleanTitle && (
        <h3 className="text-[20px] leading-snug font-bold text-[hsl(var(--foreground))] mb-2">
          {cleanTitle}
        </h3>
      )}
      <p className="t-sub whitespace-pre-line">
        {description || workoutDescription}
      </p>
    </div>
  );
};

export default WorkoutDisplay;
