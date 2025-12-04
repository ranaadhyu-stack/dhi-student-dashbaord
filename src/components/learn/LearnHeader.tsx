import { Upload, BookOpen, RefreshCw } from 'lucide-react';
import { LearnMode } from '../LearnYourWay';

interface LearnHeaderProps {
  currentMode: LearnMode;
  onModeChange: (mode: LearnMode) => void;
  onUploadClick?: () => void;
  onChangeLesson?: () => void;
  selectedLesson?: string | null;
  theme: 'light' | 'dark';
}

export function LearnHeader({ currentMode, onModeChange, onUploadClick, onChangeLesson, selectedLesson, theme }: LearnHeaderProps) {
  const modes = [
    { id: 'gamified', label: 'Gamified' },
    { id: 'real-world', label: 'Real World' },
    { id: 'story', label: 'Story' },
    { id: 'flashcards', label: 'Flashcards' },
  ];

  return (
    <div className={`border-b ${theme === 'dark' ? 'border-zinc-800 bg-zinc-950' : 'border-gray-200 bg-white'} px-3 sm:px-6 py-3 sm:py-4`}>
      {/* Header: Title and Lesson Badge */}
      <div className="flex items-center gap-3 mb-3">
        <h2 className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} hidden lg:block`}>Learn Your Way</h2>
        {selectedLesson && (
          <div className={`hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg ${theme === 'dark' ? 'bg-zinc-900 border border-zinc-800' : 'bg-gray-50 border border-gray-200'}`}>
            <BookOpen className={`w-3.5 h-3.5 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'}`} />
            <span className={`text-xs ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}>{selectedLesson}</span>
          </div>
        )}
      </div>

      {/* Mode Selector and Change Lesson */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0">
        {modes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => onModeChange(mode.id)}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm transition-all duration-300 whitespace-nowrap ${
              currentMode === mode.id
                ? 'bg-emerald-600 text-white'
                : theme === 'dark'
                  ? 'bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:border-zinc-700'
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
            }`}
          >
            {mode.label}
          </button>
        ))}
        
        {selectedLesson && onChangeLesson && (
          <button
            onClick={onChangeLesson}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm transition-all duration-300 whitespace-nowrap flex items-center gap-2 ml-2 ${
              theme === 'dark'
                ? 'bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:border-zinc-700'
                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
            }`}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Change Lesson</span>
          </button>
        )}
      </div>
    </div>
  );
}