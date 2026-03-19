
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
    <div className="bg-white rounded-[20px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.06)] w-full text-left">
      {tags.length > 0 && (
        <div className="flex gap-2 flex-wrap mb-3">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="bg-[hsl(var(--background))] text-[hsl(var(--primary))] px-3 py-1 rounded-full text-xs font-semibold"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      {cleanTitle && (
        <h3 className="text-[17px] font-semibold text-[hsl(var(--foreground))] mb-2">
          {cleanTitle}
        </h3>
      )}
      <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed whitespace-pre-line">
        {description || workoutDescription}
      </p>
    </div>
  );
};

export default WorkoutDisplay;
