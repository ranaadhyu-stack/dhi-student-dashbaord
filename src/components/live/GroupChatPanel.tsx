import { useState } from 'react';
import { ChevronLeft, ChevronRight, Send, ThumbsUp, HelpCircle, X, Trophy, User as UserIcon } from 'lucide-react';

interface GroupChatPanelProps {
  isOpen: boolean;
  onToggle: () => void;
}

interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  message: string;
  timestamp: string;
  reactions: {
    thanks: number;
    notSure: number;
    deny: number;
  };
}

export function GroupChatPanel({ isOpen, onToggle }: GroupChatPanelProps) {
  const [message, setMessage] = useState('');
  const [xpEarned, setXpEarned] = useState(12);

  const messages: ChatMessage[] = [
    {
      id: '1',
      userId: '2',
      userName: 'Emma Chen',
      message: 'For integration by parts, remember LIATE - that helps you choose u and dv',
      timestamp: '10:45 AM',
      reactions: { thanks: 2, notSure: 0, deny: 0 },
    },
    {
      id: '2',
      userId: '3',
      userName: 'David Lee',
      message: 'Can someone explain when to use substitution vs integration by parts?',
      timestamp: '10:47 AM',
      reactions: { thanks: 0, notSure: 1, deny: 0 },
    },
    {
      id: '3',
      userId: '1',
      userName: 'You',
      message: 'Use substitution when you see a function and its derivative. Use parts when you have a product of functions.',
      timestamp: '10:48 AM',
      reactions: { thanks: 1, notSure: 0, deny: 0 },
    },
  ];

  const handleReaction = (messageId: string, reactionType: 'thanks' | 'notSure' | 'deny') => {
    if (reactionType === 'thanks') {
      setXpEarned(xpEarned + 1);
    }
    console.log(`Reaction ${reactionType} on message ${messageId}`);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  const leaderboard = [
    { name: 'Emma Chen', xp: 15 },
    { name: 'You', xp: 12 },
    { name: 'David Lee', xp: 8 },
  ];

  return (
    <>
      <div
        className={`${
          isOpen ? 'w-96' : 'w-0'
        } border-l border-zinc-800 bg-zinc-950 transition-all duration-300 overflow-hidden flex flex-col`}
      >
        {/* Header */}
        <div className="p-4 border-b border-zinc-800">
          <h3 className="text-white mb-3">Room Chat</h3>

          {/* XP Display */}
          <div className="p-3 bg-emerald-600/10 border border-emerald-600/20 rounded-xl mb-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-emerald-500" />
                <span className="text-sm text-white">Session XP</span>
              </div>
              <span className="text-lg text-emerald-500 tabular-nums">+{xpEarned}</span>
            </div>
            <div className="text-xs text-zinc-500">Keep helping to earn more!</div>
          </div>

          {/* Mini Leaderboard */}
          <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl">
            <p className="text-xs text-zinc-500 mb-2">Top Contributors</p>
            <div className="space-y-1.5">
              {leaderboard.map((user, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-600">{idx + 1}.</span>
                    <span className="text-zinc-300">{user.name}</span>
                  </div>
                  <span className="text-emerald-500">+{user.xp}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id}>
              <div className="flex gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center flex-shrink-0">
                  <UserIcon className="w-4 h-4 text-zinc-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-sm text-white">{msg.userName}</span>
                    <span className="text-xs text-zinc-600">{msg.timestamp}</span>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-2">{msg.message}</p>

                  {/* Reaction Buttons */}
                  {msg.userId !== '1' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleReaction(msg.id, 'thanks')}
                        className={`px-3 py-1.5 rounded-lg text-xs transition-all duration-300 flex items-center gap-1.5 ${
                          msg.reactions.thanks > 0
                            ? 'bg-emerald-600/20 border border-emerald-600/30 text-emerald-500'
                            : 'bg-zinc-900 border border-zinc-800 text-zinc-500 hover:bg-zinc-800'
                        }`}
                      >
                        <ThumbsUp className="w-3 h-3" />
                        {msg.reactions.thanks > 0 && <span>{msg.reactions.thanks}</span>}
                      </button>

                      <button
                        onClick={() => handleReaction(msg.id, 'notSure')}
                        className={`px-3 py-1.5 rounded-lg text-xs transition-all duration-300 flex items-center gap-1.5 ${
                          msg.reactions.notSure > 0
                            ? 'bg-amber-500/20 border border-amber-500/30 text-amber-500'
                            : 'bg-zinc-900 border border-zinc-800 text-zinc-500 hover:bg-zinc-800'
                        }`}
                      >
                        <HelpCircle className="w-3 h-3" />
                        {msg.reactions.notSure > 0 && <span>{msg.reactions.notSure}</span>}
                      </button>

                      <button
                        onClick={() => handleReaction(msg.id, 'deny')}
                        className={`px-3 py-1.5 rounded-lg text-xs transition-all duration-300 flex items-center gap-1.5 ${
                          msg.reactions.deny > 0
                            ? 'bg-red-500/20 border border-red-500/30 text-red-500'
                            : 'bg-zinc-900 border border-zinc-800 text-zinc-500 hover:bg-zinc-800'
                        }`}
                      >
                        <X className="w-3 h-3" />
                        {msg.reactions.deny > 0 && <span>{msg.reactions.deny}</span>}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
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
              placeholder="Share your thoughts..."
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
