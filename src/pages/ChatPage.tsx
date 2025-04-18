import React, { useState, useRef, useEffect } from 'react';
import { askCoachyAI } from '@/utils/coachyService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import APIKeyInput from '@/components/APIKeyInput';
import YouTubeVideo from '@/components/YouTubeVideo';
import { fetchYouTubeData } from '@/utils/openaiService';
import { hasYouTubeApiKey, getYouTubeApiKey } from '@/utils/apiHelpers';

interface VideoData {
  id: string;
  title: string;
}

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  video?: VideoData;
}

const WORKOUT_TYPES = [
  { type: "yoga", keywords: ["yoga", "יוגה", "גמישות", "מתיחות", "רוגע", "נשימה"] },
  { type: "pilates", keywords: ["pilates", "פילאטיס", "ליבה", "חיזוק"] },
  { type: "hiit", keywords: ["hiit", "היט", "אינטרוול", "אינטנסיבי", "קרדיו"] },
  { type: "meditation", keywords: ["meditation", "מדיטציה", "מיינדפולנס", "רוגע", "נשימות"] },
  { type: "dance", keywords: ["dance", "ריקוד", "זומבה", "תנועה"] },
  { type: "strength", keywords: ["strength", "חיזוק", "כוח", "שרירים", "משקולות"] },
  { type: "stretching", keywords: ["stretching", "מתיחות", "גמישות"] },
  { type: "cardio", keywords: ["cardio", "קרדיו", "אירובי", "לב", "ריצה"] }
];

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [workoutHistory, setWorkoutHistory] = useState<string[]>([]);

  useEffect(() => {
    console.log('💬 Chat page loaded - initializing welcome message');
    const hasYTKey = hasYouTubeApiKey();
    console.log('🔑 YouTube API key availability:', hasYTKey ? `Available (starts with: ${getYouTubeApiKey()?.substring(0, 3)}...)` : 'Not available');
    
    const history = localStorage.getItem('workout-history');
    if (history) {
      try {
        setWorkoutHistory(JSON.parse(history));
      } catch (e) {
        console.error('Error parsing workout history:', e);
      }
    }
    
    setMessages([
      {
        id: 'welcome',
        content: 'שלום! אני כאן כדי לעזור ל��. במה אוכל לסייע היום?',
        sender: 'assistant',
        timestamp: new Date(),
      },
    ]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const findWorkoutVideo = async (userInput: string, aiResponse: string) => {
    try {
      console.log('🎥 Searching for workout video based on conversation');
      console.log('🔍 User input:', userInput);
      console.log('🤖 AI response:', aiResponse);
      
      if (!hasYouTubeApiKey()) {
        console.warn('⚠️ No YouTube API key available, skipping video search');
        return null;
      }
      
      const combinedText = `${userInput.toLowerCase()} ${aiResponse.toLowerCase()}`;
      
      const matchingWorkouts = WORKOUT_TYPES.filter(workout => 
        workout.keywords.some(keyword => combinedText.includes(keyword))
      );
      
      let filteredWorkouts = matchingWorkouts.filter(workout => 
        !workoutHistory.includes(workout.type)
      );
      
      if (filteredWorkouts.length === 0) {
        filteredWorkouts = matchingWorkouts.length > 0 ? matchingWorkouts : WORKOUT_TYPES;
      }
      
      const randomIndex = Math.floor(Math.random() * filteredWorkouts.length);
      const selectedWorkout = filteredWorkouts[randomIndex];
      
      let searchQuery = `${selectedWorkout.type} workout`;
      
      if (combinedText.includes("gentle") || combinedText.includes("קל")) {
        searchQuery = `gentle ${searchQuery}`;
      } else if (combinedText.includes("intense") || combinedText.includes("אינטנסיבי")) {
        searchQuery = `intense ${searchQuery}`;
      }
      
      if (combinedText.includes("quick") || combinedText.includes("מהיר")) {
        searchQuery = `${searchQuery} 10 minutes`;
      } else if (combinedText.includes("long") || combinedText.includes("ארוך")) {
        searchQuery = `${searchQuery} 30 minutes`;
      }
      
      console.log('🔍 Search query for YouTube:', searchQuery);
      const videoData = await fetchYouTubeData(searchQuery);
      
      if (!videoData) {
        console.error('❌ YouTube API returned no data');
        return null;
      }
      
      if (videoData.items && videoData.items.length > 0) {
        console.log('✅ Found YouTube videos:', videoData.items.length);
        const video = videoData.items[0];
        console.log('📺 Selected video:', video.snippet.title);
        
        const updatedHistory = [...workoutHistory, selectedWorkout.type].slice(-5);
        setWorkoutHistory(updatedHistory);
        
        try {
          localStorage.setItem('workout-history', JSON.stringify(updatedHistory));
        } catch (e) {
          console.error('Error saving workout history:', e);
        }
        
        return {
          id: video.id.videoId,
          title: video.snippet.title
        };
      }
      
      console.warn('⚠️ No YouTube videos found for the search query');
      return null;
    } catch (error) {
      console.error('❌ Error fetching YouTube video:', error);
      toast({
        title: 'שגיאה בחיפוש וידאו',
        description: error instanceof Error ? error.message : 'אירעה שגיאה בחיפוש וידאו התרגול',
        variant: 'destructive',
      });
      return null;
    }
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    console.log('🔘 Send button clicked or form submitted', { inputValue: input });
    e?.preventDefault();
    
    if (!input.trim()) {
      console.log('⚠️ Empty input, not sending message');
      return;
    }
    
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };
    
    console.log('📤 User message:', userMessage);
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      console.log('⏳ Waiting for AI response...');
      const response = await askCoachyAI(input);
      console.log('📥 AI response received:', response);
      
      const videoData = await findWorkoutVideo(input, response);
      
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        content: response,
        sender: 'assistant',
        timestamp: new Date(),
        video: videoData || undefined
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('❌ Chat error:', error);
      toast({
        title: 'שגיאה',
        description: error instanceof Error ? error.message : 'אירעה שגיאה בתקשורת עם השרת',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    console.log('✏️ Input changed:', e.target.value);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-white via-[#f8f9fa] to-white">
      <APIKeyInput />
      
      <header className="p-4 border-b flex items-center justify-between">
        <Link to="/" className="flex items-center gap-1 text-gray-600 hover:text-gray-900">
          <ArrowLeft className="h-5 w-5" />
          <span>חזרה</span>
        </Link>
        <h1 className="text-xl font-bold text-center flex-1">שיחה עם קואוצ׳י</h1>
        <div className="w-10"></div>
      </header>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.sender === 'user'
                  ? 'bg-coachy-blue text-white rounded-tr-none'
                  : 'bg-gray-100 text-gray-800 rounded-tl-none'
              }`}
            >
              <p>{message.content}</p>
              {message.video && (
                <div className="mt-3">
                  <YouTubeVideo videoId={message.video.id} title={message.video.title} />
                  <p className="text-xs mt-1 text-gray-500">Video ID: {message.video.id}</p>
                </div>
              )}
              <div
                className={`text-xs mt-1 ${
                  message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                }`}
              >
                {message.timestamp.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-lg p-4 bg-gray-100 text-gray-800 rounded-tl-none flex items-center">
              <div className="flex space-x-1 rtl:space-x-reverse">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSendMessage} className="p-4 border-t">
        <div className="flex items-center gap-2">
          <Input
            placeholder="הקלד את הודעתך כאן..."
            value={input}
            onChange={handleInputChange}
            disabled={isLoading}
            className="flex-1"
          />
          <Button 
            type="submit" 
            disabled={isLoading || !input.trim()}
            onClick={() => console.log('🔘 Send button clicked directly')}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatPage;
