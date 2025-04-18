
import React, { useState, useRef, useEffect } from 'react';
import { askCoachyAI } from '@/utils/coachyService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import APIKeyInput from '@/components/APIKeyInput';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Initial welcome message
  useEffect(() => {
    console.log('💬 Chat page loaded - initializing welcome message');
    setMessages([
      {
        id: 'welcome',
        content: 'שלום! אני כאן כדי לעזור לך. במה אוכל לסייע היום?',
        sender: 'assistant',
        timestamp: new Date(),
      },
    ]);
  }, []);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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
      
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        content: response,
        sender: 'assistant',
        timestamp: new Date(),
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

  // Log whenever input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    console.log('✏️ Input changed:', e.target.value);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-white via-[#f8f9fa] to-white">
      {/* API Key Input */}
      <APIKeyInput />
      
      {/* Header */}
      <header className="p-4 border-b flex items-center justify-between">
        <Link to="/" className="flex items-center gap-1 text-gray-600 hover:text-gray-900">
          <ArrowLeft className="h-5 w-5" />
          <span>חזרה</span>
        </Link>
        <h1 className="text-xl font-bold text-center flex-1">שיחה עם קואוצ׳י</h1>
        <div className="w-10"></div>
      </header>
      
      {/* Messages Container */}
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
      
      {/* Message Input */}
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
