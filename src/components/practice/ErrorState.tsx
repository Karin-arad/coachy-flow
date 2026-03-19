
import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

const ErrorState = ({ error, onRetry }: ErrorStateProps) => {
  return (
    <div className="bg-white rounded-[20px] p-6 space-y-4 w-full">
      <div className="flex items-center gap-2 text-[hsl(var(--destructive))]">
        <AlertCircle className="h-5 w-5 flex-shrink-0" />
        <p className="text-sm">{error}</p>
      </div>
      <button
        onClick={onRetry}
        className="flex items-center gap-2 bg-[hsl(var(--primary))] text-white px-4 py-2 rounded-[14px] text-sm font-medium"
      >
        <RefreshCw className="h-4 w-4" />
        Try Again
      </button>
    </div>
  );
};

export default ErrorState;
