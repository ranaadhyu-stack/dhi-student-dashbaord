import { useState } from 'react';
import { ChevronLeft, ChevronRight, Send, Sparkles } from 'lucide-react';

interface AIBuddyPanelProps {
  isOpen: boolean;
  onToggle: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  message: string;
  timestamp: string;
}

export function AIBuddyPanel({ isOpen, onToggle }: AIBuddyPanelProps) {
  const [message, setMessage] = useState('');
  const [selectedMood, setSelectedMood] = useState<string>('Focused');

  const moods = ['Chill', 'Stressed', 'Sleepy', 'Focused'];

  const chatHistory: ChatMessage[] = [
    {
      id: '1',
      sender: 'ai',
      message: "Hey! Ready to crush some studying today? I'm here if you need motivation or just want to chat! 💪",
      timestamp: '10:30 AM',
    },
    {
      id: '2',
      sender: 'user',
      message: 'Feeling a bit overwhelmed with all this material',
      timestamp: '10:32 AM',
    },
    {
      id: '3',
      sender: 'ai',
      message:
        "I totally get it! Remember, you don't have to learn everything at once. Break it down into small chunks. What's the first topic you want to tackle?",
      timestamp: '10:32 AM',
    },
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log('Sending to AI:', message);
      setMessage('');
    }
  };

  return (
    <>
      <div
        className={`${
          isOpen ? 'w-96' : 'w-0'
        } border-l border-zinc-800 bg-zinc-950/90 backdrop-blur-sm transition-all duration-300 overflow-hidden flex flex-col`}
      >
        {/* Header */}
        <div className="p-4 border-b border-zinc-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-700 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-white">DHI Buddy</h3>
              <p className="text-xs text-zinc-500">Your study companion</p>
            </div>
          </div>

          {/* Mood Selector */}
          <div>
            <p className="text-xs text-zinc-500 mb-2">How are you feeling?</p>
            <div className="flex gap-2 flex-wrap">
              {moods.map((mood) => (
                <button
                  key={mood}
                  onClick={() => setSelectedMood(mood)}
                  className={`px-3 py-1.5 rounded-lg text-xs transition-all duration-300 ${
                    selectedMood === mood
                      ? 'bg-emerald-600 text-white'
                      : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:bg-zinc-800'
                  }`}
                >
                  {mood}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-auto p-4 space-y-4">
          {chatHistory.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  msg.sender === 'user'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-zinc-900 border border-zinc-800 text-zinc-300'
                }`}
              >
                <p className="text-sm leading-relaxed">{msg.message}</p>
                <p
                  className={`text-xs mt-1 ${
                    msg.sender === 'user' ? 'text-emerald-200' : 'text-zinc-600'
                  }`}
                >
                  {msg.timestamp}
                </p>
              </div>
            </div>
          ))}

          {/* AI Suggestions */}
          <div className="p-3 bg-zinc-900/50 border border-zinc-800 rounded-xl">
            <p className="text-xs text-zinc-500 mb-2">Quick suggestions:</p>
            <div className="space-y-2">
              <button className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-zinc-400 hover:bg-zinc-800 hover:text-zinc-300 transition-all duration-300 text-left">
                💡 Give me a study tip
              </button>
              <button className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-zinc-400 hover:bg-zinc-800 hover:text-zinc-300 transition-all duration-300 text-left">
                🎯 Help me stay focused
              </button>
              <button className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-zinc-400 hover:bg-zinc-800 hover:text-zinc-300 transition-all duration-300 text-left">
                ☕ Just chat with me
              </button>
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-zinc-800">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage();
                }
              }}
              placeholder="Chat with DHI Buddy..."
              className="flex-1 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-700 transition-all duration-300"
            />
            <button
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center hover:bg-emerald-500 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-12 bg-zinc-900/90 backdrop-blur-sm border border-zinc-800 border-r-0 rounded-l-lg flex items-center justify-center hover:bg-zinc-800 transition-all duration-300 z-10"
        style={{ right: isOpen ? '384px' : '0px' }}
      >
        {isOpen ? (
          <ChevronRight className="w-4 h-4 text-zinc-400" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-zinc-400" />
        )}
      </button>
    </>
  );
}
