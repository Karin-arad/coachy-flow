
import React, { useState, useRef, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createChatCompletion, ChatMessage } from '@/utils/openaiService';
import { hasOpenAIApiKey } from '@/utils/apiHelpers';
import APIKeyInput from '@/components/APIKeyInput';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ArrowRight, Loader2 } from 'lucide-react';

const SYSTEM_PROMPT = "את קואצ׳י, מלווה רגשית רכה שפונה לקארין באהבה, עדינות, והומור עדין. תני לה חיבוק במילים, תשאלי שאלה פתוחה על איך היא מרגישה, ותציעי תרגול רגשי קצר או תנועה מתאימה.";

const ChatPage = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isApiKeyPresent, setIsApiKeyPresent] = useState(hasOpenAIApiKey());
  const [isApiSheetOpen, setIsApiSheetOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Check if API key is set every time the component is mounted or when API sheet is closed
  useEffect(() => {
    setIsApiKeyPresent(hasOpenAIApiKey());
  }, [isApiSheetOpen]);

  // Scroll to bottom of messages when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    if (!isApiKeyPresent) {
      setIsApiSheetOpen(true);
      return;
    }

    const userMessage: ChatMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Build complete message history with system prompt
      const fullMessageHistory: ChatMessage[] = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages,
        userMessage
      ];

      const response = await createChatCompletion(fullMessageHistory);
      
      const assistantMessage: ChatMessage = { 
        role: 'assistant', 
        content: response 
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      toast({
        title: "שגיאה",
        description: error instanceof Error ? error.message : "אירעה שגיאה בתקשורת עם OpenAI",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-white via-[#f8f9fa] to-white">
      <div className="flex-1 flex flex-col p-4 max-w-3xl mx-auto w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">שיחה עם קואצ׳י</h1>
        
        {/* Messages container */}
        <div className="flex-1 overflow-y-auto mb-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          {messages.length === 0 ? (
            <div className="h-full flex items-center justify-center text-gray-400 text-center p-4">
              <p>התחילי שיחה עם קואצ׳י, המלווה הרגשית שלך</p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-blue-100 mr-auto ml-8 text-right'
                      : 'bg-gray-100 ml-auto mr-8'
                  } max-w-[80%] shadow-sm`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="flex items-end gap-2">
          <Textarea
            placeholder="כתבי הודעה..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            className="resize-none min-h-[100px] border-gray-300"
            dir="rtl"
          />
          <Button
            onClick={handleSendMessage}
            disabled={isLoading || !input.trim()}
            className="h-[50px] w-[50px] p-0 rounded-full"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <ArrowRight className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* API Key Sheet */}
      <Sheet open={isApiSheetOpen} onOpenChange={setIsApiSheetOpen}>
        <SheetContent className="sm:max-w-md" dir="rtl">
          <SheetHeader>
            <SheetTitle>הגדרת מפתח API</SheetTitle>
          </SheetHeader>
          <div className="py-6">
            <p className="mb-4">יש להגדיר מפתח API של OpenAI לפני השימוש בצ'אט.</p>
            <APIKeyInput onClose={() => setIsApiSheetOpen(false)} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ChatPage;
