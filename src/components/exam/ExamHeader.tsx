import { Upload } from 'lucide-react';
import { ExamMode } from '../ExamPrep';
import { useState } from 'react';

interface ExamHeaderProps {
  currentMode: ExamMode;
  onModeChange: (mode: ExamMode) => void;
  onUploadClick: () => void;
  theme: 'light' | 'dark';
}

export function ExamHeader({ currentMode, onModeChange, onUploadClick, theme }: ExamHeaderProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const modes: { id: ExamMode; label: string }[] = [
    { id: 'past-papers', label: 'Past Papers' },
    { id: 'mcq', label: 'MCQ Practice' },
    { id: 'mock-test', label: 'Mock Test' },
    { id: 'answer-writing', label: 'Answer Writing' },
  ];

  const isUploadDisabled = currentMode === 'past-papers';

  return (
    <div className={`border-b ${theme === 'dark' ? 'border-zinc-800 bg-zinc-950' : 'border-gray-200 bg-white'} px-3 sm:px-6 py-3 sm:py-4 flex flex-col lg:flex-row items-start lg:items-center gap-3 lg:justify-between`}>
      {/* Left: Title */}
      <h2 className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} hidden lg:block`}>Exam Prep</h2>

      {/* Center: Mode Selector */}
      <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0">
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
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 sm:gap-3 w-full lg:w-auto relative">
        <div className="relative flex-1 lg:flex-initial">
          <button
            onClick={onUploadClick}
            disabled={isUploadDisabled}
            className={`w-full px-3 sm:px-4 py-2 border rounded-xl text-xs sm:text-sm transition-all duration-300 flex items-center gap-2 justify-center ${
              isUploadDisabled
                ? theme === 'dark'
                  ? 'bg-zinc-900/50 border-zinc-800 text-zinc-600 cursor-not-allowed opacity-50'
                  : 'bg-gray-100/50 border-gray-200 text-gray-400 cursor-not-allowed opacity-50'
                : theme === 'dark'
                ? 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:border-zinc-700'
                : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
            }`}
            onMouseEnter={() => isUploadDisabled && setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <Upload className="w-4 h-4" />
            <span className="hidden sm:inline">Upload</span>
          </button>
          
          {/* Tooltip */}
          {showTooltip && isUploadDisabled && (
            <div 
              className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 rounded-lg text-xs whitespace-nowrap z-50 ${
                theme === 'dark' 
                  ? 'bg-zinc-800 text-zinc-200 border border-zinc-700' 
                  : 'bg-gray-900 text-white'
              }`}
              style={{
                boxShadow: theme === 'dark' 
                  ? '0 4px 12px rgba(0, 0, 0, 0.4)' 
                  : '0 4px 12px rgba(0, 0, 0, 0.15)'
              }}
            >
              Upload is not available in Past Papers. Select another mode to upload your own files.
              {/* Arrow */}
              <div 
                className={`absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 ${
                  theme === 'dark' ? 'text-zinc-800' : 'text-gray-900'
                }`}
              >
                <svg width="12" height="6" viewBox="0 0 12 6" fill="currentColor">
                  <path d="M6 6L0 0h12z" />
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}