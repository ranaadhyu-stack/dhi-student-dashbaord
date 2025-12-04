import { Hash, Save, RotateCcw, Share2, ChevronLeft, ChevronRight } from 'lucide-react';
import { LearnMode } from '../LearnYourWay';

interface LearnBottomBarProps {
  lessonName: string;
  modeProgress: { current: number; total: number };
  currentMode: LearnMode;
  theme: 'light' | 'dark';
  onPrevious?: () => void;
  onNext?: () => void;
  canGoPrevious?: boolean;
  canGoNext?: boolean;
  onEndSession?: () => void;
  onRestartFlashcards?: () => void;
  onEndFlashcardSession?: () => void;
}

export function LearnBottomBar({ lessonName, modeProgress, currentMode, theme, onPrevious, onNext, canGoPrevious, canGoNext, onEndSession, onRestartFlashcards, onEndFlashcardSession }: LearnBottomBarProps) {
  const getModeProgressLabel = () => {
    switch (currentMode) {
      case 'gamified':
        return 'Tasks Completed';
      case 'flashcards':
        return 'Cards Reviewed';
      case 'mind-map':
        return 'Nodes Visited';
      case 'real-world':
        return 'Examples Viewed';
      case 'story':
        return 'Story Progress';
      case '3d':
        return 'Hotspots Explored';
      default:
        return 'Progress';
    }
  };

  return (
    <div className={`border-t px-3 sm:px-6 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 ${theme === 'dark' ? 'border-zinc-800 bg-zinc-950' : 'border-gray-200 bg-white'}`}>
      {/* Left: Lesson Info */}
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="flex items-center gap-2">
          <span className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'} truncate max-w-[150px] sm:max-w-none`}>{lessonName}</span>
        </div>
        <div className={`flex items-center gap-1.5 text-xs ${theme === 'dark' ? 'text-zinc-600' : 'text-gray-400'} hidden md:flex`}>
          <Hash className="w-3 h-3" />
          <span>LRN-2024-1127-001</span>
        </div>
      </div>

      {/* Center: Progress */}
      <div className="flex items-center gap-2 sm:gap-3">
        <span className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'} hidden sm:inline`}>{getModeProgressLabel()}:</span>
        <div className="flex items-center gap-2">
          {currentMode === 'story' ? (
            // Story Mode: Show percentage
            <span className={`text-xs sm:text-sm tabular-nums ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {modeProgress.total > 0 ? Math.round((modeProgress.current / modeProgress.total) * 100) : 0}%
            </span>
          ) : (
            // Other modes: Show current / total
            <span className={`text-xs sm:text-sm tabular-nums ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {modeProgress.current} / {modeProgress.total}
            </span>
          )}
          {modeProgress.total > 0 && (
            <div className={`w-16 sm:w-24 h-1.5 rounded-full overflow-hidden ${theme === 'dark' ? 'bg-zinc-900' : 'bg-gray-200'}`}>
              <div
                className="h-full bg-emerald-600 rounded-full transition-all duration-300"
                style={{
                  width: `${(modeProgress.current / modeProgress.total) * 100}%`,
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
        {currentMode === 'real-world' || currentMode === 'story' ? (
          // Real World & Story mode: Previous/Next navigation buttons
          <>
            <button
              onClick={onPrevious}
              disabled={!canGoPrevious}
              className={`px-3 py-2 border rounded-xl text-xs sm:text-sm transition-all duration-300 flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed ${
                theme === 'dark'
                  ? 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:border-zinc-700 disabled:hover:bg-zinc-900 disabled:hover:border-zinc-800'
                  : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100 hover:border-gray-300 disabled:hover:bg-gray-50 disabled:hover:border-gray-200'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>
            <button
              onClick={onNext}
              disabled={!canGoNext}
              className={`px-3 py-2 border rounded-xl text-xs sm:text-sm transition-all duration-300 flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed ${
                theme === 'dark'
                  ? 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:border-zinc-700 disabled:hover:bg-zinc-900 disabled:hover:border-zinc-800'
                  : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100 hover:border-gray-300 disabled:hover:bg-gray-50 disabled:hover:border-gray-200'
              }`}
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={onEndSession}
              className="px-3 sm:px-4 py-2 bg-red-600 hover:bg-red-500 rounded-xl text-xs sm:text-sm text-white transition-all duration-300 flex items-center gap-2 flex-1 sm:flex-initial justify-center"
            >
              <span>{currentMode === 'story' ? 'End Story' : 'End Session'}</span>
            </button>
          </>
        ) : currentMode === 'flashcards' ? (
          // Flashcards mode: Reset Mode and End Flashcard Session (right-aligned)
          <>
            <button
              onClick={onRestartFlashcards}
              className={`px-3 sm:px-4 py-2 border rounded-xl text-xs sm:text-sm transition-all duration-300 flex items-center gap-2 ${
                theme === 'dark'
                  ? 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:border-zinc-700'
                  : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100 hover:border-gray-300'
              }`}
            >
              <RotateCcw className="w-4 h-4" />
              Restart Deck
            </button>
            <button
              onClick={onEndFlashcardSession}
              className={`px-3 sm:px-4 py-2 border rounded-xl text-xs sm:text-sm transition-all duration-300 flex items-center gap-2 ${
                theme === 'dark'
                  ? 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:border-zinc-700'
                  : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100 hover:border-gray-300'
              }`}
            >
              <Save className="w-4 h-4" />
              <span>End Flashcard Session</span>
            </button>
          </>
        ) : (
          // Other modes: Save & Exit, Reset, SharePoint buttons
          <>
            <button className={`px-3 sm:px-4 py-2 border rounded-xl text-xs sm:text-sm transition-all duration-300 flex items-center gap-2 flex-1 sm:flex-initial justify-center ${
              theme === 'dark'
                ? 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:border-zinc-700'
                : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100 hover:border-gray-300'
            }`}>
              <Save className="w-4 h-4" />
              <span className="hidden sm:inline">Save & Exit</span>
              <span className="sm:hidden">Save</span>
            </button>
            <button className={`px-3 sm:px-4 py-2 border rounded-xl text-xs sm:text-sm transition-all duration-300 flex items-center gap-2 hidden md:flex ${
              theme === 'dark'
                ? 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:border-zinc-700'
                : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100 hover:border-gray-300'
            }`}>
              <RotateCcw className="w-4 h-4" />
              Reset Mode
            </button>
            <button className="px-3 sm:px-4 py-2 bg-emerald-600 rounded-xl text-xs sm:text-sm text-white hover:bg-emerald-500 transition-all duration-300 flex items-center gap-2 flex-1 sm:flex-initial justify-center">
              <Share2 className="w-4 h-4" />
              <span className="hidden md:inline">Send to SharePoint</span>
              <span className="md:hidden">Share</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}