import { BookOpen } from 'lucide-react';

interface LessonEmptyStateProps {
  onChooseLesson: () => void;
  theme: 'light' | 'dark';
}

export function LessonEmptyState({ onChooseLesson, theme }: LessonEmptyStateProps) {
  return (
    <div className="h-full flex items-center justify-center p-6">
      <div className="max-w-2xl w-full flex items-center gap-8 sm:gap-12">
        {/* Left: Document Illustration */}
        <div className="hidden sm:flex items-center justify-center flex-shrink-0">
          <div className="relative">
            {/* Soft shadow layer */}
            <div className="absolute inset-0 bg-gradient-to-br from-teal-200/30 to-teal-300/20 blur-xl translate-y-2" />
            
            {/* Document icon */}
            <svg width="120" height="140" viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative">
              <defs>
                <linearGradient id="docGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#5EEAD4" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#14B8A6" stopOpacity="0.7" />
                </linearGradient>
              </defs>
              {/* Paper background */}
              <path d="M20 0 H85 L110 25 V130 C110 135.523 105.523 140 100 140 H20 C14.477 140 10 135.523 10 130 V10 C10 4.477 14.477 0 20 0 Z" fill="url(#docGradient)" />
              {/* Folded corner */}
              <path d="M85 0 L85 20 C85 22.761 87.239 25 90 25 L110 25 Z" fill="#0D9488" fillOpacity="0.3" />
              {/* Lines on paper */}
              <line x1="25" y1="45" x2="85" y2="45" stroke="white" strokeOpacity="0.4" strokeWidth="2" strokeLinecap="round" />
              <line x1="25" y1="60" x2="85" y2="60" stroke="white" strokeOpacity="0.4" strokeWidth="2" strokeLinecap="round" />
              <line x1="25" y1="75" x2="70" y2="75" stroke="white" strokeOpacity="0.4" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Right: Text and Button */}
        <div className="flex-1">
          {/* Title */}
          <h3 className={`text-2xl mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            No lesson selected
          </h3>

          {/* Subtitle */}
          <p className={`text-sm mb-6 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'}`}>
            Choose a lesson PDF to generate all learning modes.
          </p>

          {/* Choose Lesson Button */}
          <button
            onClick={onChooseLesson}
            className={`px-5 py-2.5 ${theme === 'dark' ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-emerald-600 hover:bg-emerald-500'} text-white rounded-lg transition-all duration-300 flex items-center gap-2 text-sm shadow-sm hover:shadow-md`}
          >
            <BookOpen className="w-4 h-4" />
            Choose Lesson
          </button>
        </div>
      </div>
    </div>
  );
}