
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface YouTubeTabProps {
  youtubeKey: string;
  setYoutubeKey: (key: string) => void;
  isUsingGlobalYouTubeKey: boolean;
  hasYouTubeKey: boolean;
  saveYouTubeKey: () => void;
  removeYouTubeKey: () => void;
}

const YouTubeTab = ({
  youtubeKey,
  setYoutubeKey,
  isUsingGlobalYouTubeKey,
  hasYouTubeKey,
  saveYouTubeKey,
  removeYouTubeKey
}: YouTubeTabProps) => {
  return (
    <div className="grid gap-2">
      <Label htmlFor="youtubeKey">מפתח API של YouTube</Label>
      {isUsingGlobalYouTubeKey ? (
        <div className="text-sm text-green-600 mb-2">
          משתמש במפתח גלובלי של האפליקציה
        </div>
      ) : (
        !hasYouTubeKey && (
          <div className="text-sm text-yellow-600 mb-2">
            נדרש להזין מפתח YouTube API כדי להשתמש בפונקציות חיפוש וידאו
          </div>
        )
      )}
      <Input
        id="youtubeKey"
        type="password"
        placeholder="AIza..."
        value={youtubeKey}
        onChange={(e) => setYoutubeKey(e.target.value)}
        className="font-mono text-sm"
        dir="ltr"
      />
      <div className="flex justify-between mt-2">
        {hasYouTubeKey && !isUsingGlobalYouTubeKey && (
          <Button variant="outline" type="button" onClick={removeYouTubeKey}>
            הסרת מפתח
          </Button>
        )}
        <Button type="button" onClick={saveYouTubeKey}>
          שמירה
        </Button>
      </div>
    </div>
  );
};

export default YouTubeTab;
