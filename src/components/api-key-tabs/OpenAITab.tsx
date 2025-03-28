
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface OpenAITabProps {
  openaiKey: string;
  setOpenaiKey: (key: string) => void;
  isUsingGlobalOpenAIKey: boolean;
  hasOpenAIKey: boolean;
  saveOpenAIKey: () => void;
  removeOpenAIKey: () => void;
}

const OpenAITab = ({
  openaiKey,
  setOpenaiKey,
  isUsingGlobalOpenAIKey,
  hasOpenAIKey,
  saveOpenAIKey,
  removeOpenAIKey
}: OpenAITabProps) => {
  return (
    <div className="grid gap-2">
      <Label htmlFor="openaiKey">מפתח API של OpenAI</Label>
      {isUsingGlobalOpenAIKey ? (
        <div className="text-sm text-green-600 mb-2">
          משתמש במפתח גלובלי של האפליקציה
        </div>
      ) : (
        !hasOpenAIKey && (
          <div className="text-sm text-red-600 mb-2">
            נדרש להזין מפתח OpenAI API כדי להשתמש בפונקציות בינה מלאכותית
          </div>
        )
      )}
      <Input
        id="openaiKey"
        type="password"
        placeholder="sk-..."
        value={openaiKey}
        onChange={(e) => setOpenaiKey(e.target.value)}
        className="font-mono text-sm"
        dir="ltr"
      />
      <div className="flex justify-between mt-2">
        {hasOpenAIKey && !isUsingGlobalOpenAIKey && (
          <Button variant="outline" type="button" onClick={removeOpenAIKey}>
            הסרת מפתח
          </Button>
        )}
        <Button type="button" onClick={saveOpenAIKey}>
          שמירה
        </Button>
      </div>
    </div>
  );
};

export default OpenAITab;
