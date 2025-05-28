
import React from 'react';

interface WorkoutDisplayProps {
  workoutDescription: string;
}

const WorkoutDisplay = ({ workoutDescription }: WorkoutDisplayProps) => {
  return (
    <div className="bg-white/80 rounded-xl p-5 shadow-sm border border-gray-100">
      <p className="text-gray-700 text-left whitespace-pre-line text-sm">
        {workoutDescription}
      </p>
    </div>
  );
};

export default WorkoutDisplay;
