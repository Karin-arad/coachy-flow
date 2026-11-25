import React from 'react';
import Creature from '../Creature';
import { worlds } from '@/lib/worlds';

const ConversationHeader = () => {
  return (
    <div className="flex items-end gap-3">
      <div className="flex-1">
        <h1 className="t-title mb-2">כמה מילים עליך</h1>
        <p className="t-sub">
          יש לך כאבים או אזורים רגישים? או משהו אחר שכדאי לי לדעת לפני שמתחילים?
        </p>
      </div>
      <div className="w-[88px] h-[104px] flex-shrink-0">
        <Creature value={6} color={worlds.bounciness.creature} scale={0.36} />
      </div>
    </div>
  );
};

export default ConversationHeader;
