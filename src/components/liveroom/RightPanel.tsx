import { useState } from 'react';
import { ChevronRight, Send, MoreVertical } from 'lucide-react';

interface RightPanelProps {
  isOpen: boolean;
  onToggle: () => void;
  onEnterFocus?: () => void;
  mode: 'solo' | 'public';
  theme: 'light' | 'dark';
}

interface ChatMessage {
  id: string;
  userName: string;
  message: string;
  timestamp: string;
  isSelf?: boolean;
}

export function RightPanel({ isOpen, onToggle, theme }: RightPanelProps) {
  const [message, setMessage] = useState('');

  const chatMessages: ChatMessage[] = [
    {
      id: '1',
      userName: 'Emma Chen',
      message: 'Anyone working on calculus?',
      timestamp: '10:45 AM',
    },
    {
      id: '2',
      userName: 'You',
      message: 'Yes! Working on integration',
      timestamp: '10:47 AM',
      isSelf: true,
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      <div
        className={`${
          isOpen ? 'w-full sm:w-96' : 'w-0'
        } backdrop-blur-xl border-l transition-all duration-300 overflow-hidden flex flex-col fixed lg:relative right-0 top-0 bottom-0 z-50 lg:z-auto ${
          theme === 'dark'
            ? 'bg-zinc-950/60 border-zinc-800/50'
            : 'bg-white/60 border-gray-200'
        }`}
      >
        {/* Panel Header */}
        <div className={`p-4 border-b flex items-center justify-between ${
          theme === 'dark' ? 'border-zinc-800/50' : 'border-gray-200'
        }`}>
          <h3 className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Chat</h3>
          <button
            onClick={onToggle}
            className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200 ${
              theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-gray-100'
            }`}
          >
            <ChevronRight className={`w-4 h-4 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`} />
          </button>
        </div>

        {/* Chat Content */}
        <div className="flex-1 overflow-auto p-4 flex flex-col">
          {/* Chat Messages */}
          <div className="flex-1 space-y-3 mb-4 overflow-auto">
            {chatMessages.map((msg) => (
              <div key={msg.id} className="flex gap-2 group">
                <div className={`w-7 h-7 rounded-full flex-shrink-0 ${
                  theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-200'
                }`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className={`text-xs ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{msg.userName}</span>
                    <span className={`text-xs ${theme === 'dark' ? 'text-zinc-600' : 'text-gray-500'}`}>{msg.timestamp}</span>
                  </div>
                  <div
                    className={`p-2.5 rounded-lg text-xs ${
                      msg.isSelf
                        ? theme === 'dark'
                          ? 'bg-white/10 text-white'
                          : 'bg-emerald-50 text-gray-900'
                        : theme === 'dark'
                          ? 'bg-zinc-900/50 text-zinc-300'
                          : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {msg.message}
                  </div>
                </div>
                <button className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-200 ${
                  theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-gray-100'
                }`}>
                  <MoreVertical className={`w-4 h-4 ${theme === 'dark' ? 'text-zinc-600' : 'text-gray-500'}`} />
                </button>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className={`flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none transition-all duration-200 ${
                theme === 'dark'
                  ? 'bg-zinc-900/50 border-zinc-800/50 text-white placeholder:text-zinc-600 focus:border-zinc-700'
                  : 'bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-gray-300'
              }`}
            />
            <button
              disabled={!message.trim()}
              className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed ${
                theme === 'dark'
                  ? 'bg-white text-zinc-950 hover:bg-zinc-100'
                  : 'bg-emerald-600 text-white hover:bg-emerald-700'
              }`}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Side Tab (when panel is closed) */}
      {!isOpen && (
        <button
          onClick={onToggle}
          className={`absolute right-0 top-1/2 -translate-y-1/2 w-8 h-20 backdrop-blur-xl border border-r-0 rounded-l-xl flex items-center justify-center transition-all duration-200 ${
            theme === 'dark'
              ? 'bg-zinc-900/60 border-zinc-800/50 hover:bg-zinc-800/60'
              : 'bg-white/60 border-gray-200 hover:bg-gray-50'
          }`}
        >
          <span className={`text-xs -rotate-90 whitespace-nowrap ${
            theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
          }`}>Chat</span>
        </button>
      )}
    </>
  );
}
