import { Save, Send, Share2, Clock, LogOut } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ExamMode } from '../ExamPrep';

interface ExamBottomBarProps {
  hasActiveAttempt: boolean;
  timerActive: boolean;
  timeElapsed: number;
  currentMode: ExamMode;
  onEndMCQSession?: () => void;
  onSubmitTest?: () => void;
  theme: 'light' | 'dark';
}

export function ExamBottomBar({ hasActiveAttempt, timerActive, timeElapsed, currentMode, onEndMCQSession, onSubmitTest, theme }: ExamBottomBarProps) {
  const [time, setTime] = useState(timeElapsed);

  const isMockTestOrInstitutional = currentMode === 'mock-test';

  useEffect(() => {
    if (timerActive) {
      const interval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timerActive]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`border-t ${theme === 'dark' ? 'border-zinc-800 bg-zinc-950' : 'border-gray-200 bg-white'} px-3 sm:px-6 py-3 flex items-center justify-between`}>
      {/* Left: Status */}
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${hasActiveAttempt ? 'bg-emerald-500' : theme === 'dark' ? 'bg-zinc-600' : 'bg-gray-400'}`} />
          <span className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
            {hasActiveAttempt ? 'Active' : 'Draft'}
          </span>
        </div>
        {hasActiveAttempt && (
          <span className={`text-xs ${theme === 'dark' ? 'text-zinc-600' : 'text-gray-400'} hidden sm:inline`}>Auto-saving...</span>
        )}
      </div>

      {/* Center: Timer */}
      {timerActive && (
        <div className={`flex items-center gap-2 px-4 py-2 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'} border rounded-xl`}>
          <Clock className={`w-4 h-4 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`} />
          <span className={`text-sm tabular-nums ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{formatTime(time)}</span>
        </div>
      )}

      {/* Right: Actions */}
      <div className="flex items-center gap-2 sm:gap-3 relative">
        {/* Save Button - Always disabled */}
        <button
          disabled
          className={`px-3 sm:px-4 py-2 border rounded-xl text-xs sm:text-sm transition-all duration-300 flex items-center gap-2 ${
            theme === 'dark'
              ? 'bg-zinc-900/50 border-zinc-800 text-zinc-600 cursor-not-allowed opacity-50'
              : 'bg-gray-100/50 border-gray-200 text-gray-400 cursor-not-allowed opacity-50'
          }`}
        >
          <Save className="w-4 h-4" />
          <span className="hidden sm:inline">Save</span>
        </button>
        
        {/* End Session Button - Always active, replaces Export */}
        <button
          onClick={onEndMCQSession}
          className={`px-3 sm:px-4 py-2 border rounded-xl text-xs sm:text-sm transition-all duration-300 flex items-center gap-2 hidden md:flex ${
            theme === 'dark'
              ? 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:border-zinc-700'
              : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
          }`}
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">End Session</span>
        </button>
        
        {/* Submit Button - Active only for Mock Test */}
        <button
          disabled={!isMockTestOrInstitutional}
          onClick={onSubmitTest}
          className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm transition-all duration-300 flex items-center gap-2 ${
            isMockTestOrInstitutional
              ? 'bg-emerald-600 text-white hover:bg-emerald-500'
              : theme === 'dark'
              ? 'bg-emerald-900/20 text-emerald-700 cursor-not-allowed opacity-50'
              : 'bg-emerald-100 text-emerald-600 cursor-not-allowed opacity-50'
          }`}
        >
          <Send className="w-4 h-4" />
          <span className="hidden sm:inline">Submit</span>
        </button>
      </div>
    </div>
  );
}