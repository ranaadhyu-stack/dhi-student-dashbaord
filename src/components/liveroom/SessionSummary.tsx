import { X, Clock, Trophy, ThumbsUp, MessageCircle } from 'lucide-react';

interface SessionSummaryProps {
  data: {
    focusTime: number;
    xpEarned: number;
    helpfulGiven: number;
    helpfulReceived: number;
  };
  onClose: () => void;
  theme: 'light' | 'dark';
}

export function SessionSummary({ data, onClose, theme }: SessionSummaryProps) {
  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    if (hrs > 0) {
      return `${hrs}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const topics = ['Integration', 'Calculus', 'Mathematics'];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`rounded-2xl w-full max-w-lg overflow-hidden ${theme === 'dark' ? 'bg-zinc-950' : 'bg-white'}`}>
        {/* Header */}
        <div className={`p-6 border-b ${theme === 'dark' ? 'border-zinc-800' : 'border-zinc-200'}`}>
          <div className="flex items-center justify-between">
            <h2 className={theme === 'dark' ? 'text-white' : 'text-zinc-950'}>Session Summary</h2>
            <button
              onClick={onClose}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                theme === 'dark' ? 'hover:bg-zinc-800' : 'hover:bg-zinc-100'
              }`}
            >
              <X className={`w-5 h-5 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-50 border-zinc-200'} border`}>
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-zinc-200'
                } border`}>
                  <Clock className={`w-5 h-5 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-700'}`} />
                </div>
                <div>
                  <p className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'}`}>Focus Time</p>
                  <p className={`text-xl ${theme === 'dark' ? 'text-white' : 'text-zinc-950'}`}>{formatTime(data.focusTime)}</p>
                </div>
              </div>
            </div>

            <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-50 border-zinc-200'} border`}>
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-zinc-200'
                } border`}>
                  <Trophy className={`w-5 h-5 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-700'}`} />
                </div>
                <div>
                  <p className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'}`}>XP Earned</p>
                  <p className={`text-xl ${theme === 'dark' ? 'text-white' : 'text-zinc-950'}`}>+{data.xpEarned}</p>
                </div>
              </div>
            </div>

            <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-50 border-zinc-200'} border`}>
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-zinc-200'
                } border`}>
                  <ThumbsUp className={`w-5 h-5 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-700'}`} />
                </div>
                <div>
                  <p className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'}`}>Helpful Given</p>
                  <p className={`text-xl ${theme === 'dark' ? 'text-white' : 'text-zinc-950'}`}>{data.helpfulGiven}</p>
                </div>
              </div>
            </div>

            <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-50 border-zinc-200'} border`}>
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-zinc-200'
                } border`}>
                  <MessageCircle className={`w-5 h-5 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-700'}`} />
                </div>
                <div>
                  <p className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'}`}>Helpful Received</p>
                  <p className={`text-xl ${theme === 'dark' ? 'text-white' : 'text-zinc-950'}`}>{data.helpfulReceived}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Topics Discussed */}
          <div>
            <p className={`text-sm mb-3 ${theme === 'dark' ? 'text-white' : 'text-zinc-950'}`}>Topics Discussed</p>
            <div className="flex flex-wrap gap-2">
              {topics.map((topic, idx) => (
                <div
                  key={idx}
                  className={`px-3 py-1.5 rounded-lg text-sm ${
                    theme === 'dark' 
                      ? 'bg-zinc-900 border-zinc-800 text-zinc-300'
                      : 'bg-zinc-100 border-zinc-200 text-zinc-700'
                  } border`}
                >
                  {topic}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`p-6 border-t ${theme === 'dark' ? 'border-zinc-800' : 'border-zinc-200'}`}>
          <button
            onClick={onClose}
            className={`w-full px-4 py-3 rounded-xl transition-all duration-200 ${
              theme === 'dark'
                ? 'bg-emerald-600 text-white hover:bg-emerald-500'
                : 'bg-zinc-950 text-white hover:bg-zinc-800'
            }`}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
