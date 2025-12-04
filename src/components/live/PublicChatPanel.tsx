import { useState } from 'react';
import { ChevronLeft, ChevronRight, Smile, Send, User as UserIcon, Info } from 'lucide-react';

interface PublicChatPanelProps {
  isOpen: boolean;
  onToggle: () => void;
}

interface Message {
  id: string;
  userId: string;
  userName: string;
  message: string;
  timestamp: string;
  mentions?: string[];
}

export function PublicChatPanel({ isOpen, onToggle }: PublicChatPanelProps) {
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const messages: Message[] = [
    {
      id: '1',
      userId: '2',
      userName: 'Emma Chen',
      message: 'Anyone studying for the chemistry exam tomorrow?',
      timestamp: '10:45 AM',
    },
    {
      id: '2',
      userId: '4',
      userName: 'Sofia Martinez',
      message: '@Emma Chen Yes! Working on organic chemistry right now',
      timestamp: '10:47 AM',
      mentions: ['Emma Chen'],
    },
    {
      id: '3',
      userId: '6',
      userName: 'Priya Sharma',
      message: 'Can someone explain photosynthesis? Still confused about the light reactions',
      timestamp: '10:50 AM',
    },
    {
      id: '4',
      userId: '9',
      userName: 'David Lee',
      message: '@Priya Sharma I can help! The light reactions happen in the thylakoid membranes...',
      timestamp: '10:52 AM',
      mentions: ['Priya Sharma'],
    },
  ];

  const emojis = ['😊', '👍', '🎉', '💡', '📚', '✨', '🔥', '❤️'];

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  return (
    <>
      <div
        className={`${
          isOpen ? 'w-96' : 'w-0'
        } border-l border-zinc-800 bg-zinc-950 transition-all duration-300 overflow-hidden flex flex-col`}
      >
        {/* Header */}
        <div className="p-4 border-b border-zinc-800">
          <h3 className="text-white mb-1">Public Chat</h3>
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <Info className="w-3 h-3" />
            <span>This chat is visible to everyone</span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center flex-shrink-0">
                <UserIcon className="w-4 h-4 text-zinc-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-sm text-white">{msg.userName}</span>
                  <span className="text-xs text-zinc-600">{msg.timestamp}</span>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {msg.message.split(' ').map((word, idx) => {
                    if (word.startsWith('@')) {
                      return (
                        <span key={idx} className="text-emerald-500">
                          {word}{' '}
                        </span>
                      );
                    }
                    return <span key={idx}>{word} </span>;
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-zinc-800">
          {/* Emoji Picker */}
          {showEmojiPicker && (
            <div className="mb-3 p-3 bg-zinc-900 border border-zinc-800 rounded-xl">
              <div className="flex flex-wrap gap-2">
                {emojis.map((emoji, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setMessage(message + emoji);
                      setShowEmojiPicker(false);
                    }}
                    className="w-8 h-8 rounded-lg hover:bg-zinc-800 flex items-center justify-center transition-all duration-300"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:bg-zinc-800 transition-all duration-300"
            >
              <Smile className="w-4 h-4 text-zinc-400" />
            </button>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage();
                }
              }}
              placeholder="Say something..."
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
        className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-12 bg-zinc-900 border border-zinc-800 border-r-0 rounded-l-lg flex items-center justify-center hover:bg-zinc-800 transition-all duration-300 z-10"
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
