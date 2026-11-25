import React from 'react';
import Creature from '../Creature';
import { worlds } from '@/lib/worlds';

const LoadingState = () => {
  return (
    <div className="flex flex-col items-center gap-4" role="status">
      <div className="w-[200px] h-[200px]">
        <Creature value={6} color={worlds.bounciness.creature} scale={0.7} bouncing />
      </div>
      <p className="t-sub">מרכיבים לך את האימון...</p>
    </div>
  );
};

export default LoadingState;
