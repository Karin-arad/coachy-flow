
import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

const ErrorState = ({ error, onRetry }: ErrorStateProps) => {
  return (
    <div className="surface space-y-4 w-full">
      <div className="flex items-center gap-2 text-[hsl(var(--destructive))]">
        <AlertCircle className="h-5 w-5 flex-shrink-0" />
        <p className="t-body">{error}</p>
      </div>
      <button
        onClick={onRetry}
        className="btn-primary !flex-none w-full"
      >
        <RefreshCw className="h-4 w-4" />
        ניסיון נוסף
      </button>
    </div>
  );
};

export default ErrorState;
