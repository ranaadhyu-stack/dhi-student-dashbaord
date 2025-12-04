import { useState } from 'react';
import { ChevronLeft, ChevronRight, FileText, Clock } from 'lucide-react';

interface LessonLibraryPanelProps {
  isOpen: boolean;
  onToggle: () => void;
  onSelectLesson: (lesson: string) => void;
  theme: 'light' | 'dark';
}

export function LessonLibraryPanel({ isOpen, onToggle, onSelectLesson, theme }: LessonLibraryPanelProps) {
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);

  const sharePointLessons = [
    { id: 1, title: 'Introduction to Photosynthesis', subject: 'Biology', date: '2024-11-20' },
    { id: 2, title: 'Quadratic Equations', subject: 'Mathematics', date: '2024-11-18' },
    { id: 3, title: 'The French Revolution', subject: 'History', date: '2024-11-15' },
  ];

  const myUploads = [
    { id: 4, title: 'Chemistry Notes - Chapter 3', subject: 'Chemistry', date: '2024-11-22' },
    { id: 5, title: 'Physics Formula Sheet', subject: 'Physics', date: '2024-11-21' },
  ];

  const recentSessions = [
    { id: 1, lesson: 'Introduction to Photosynthesis', mode: 'Mind Map', lastOpened: '2 hours ago' },
    { id: 2, lesson: 'Quadratic Equations', mode: 'Flashcards', lastOpened: 'Yesterday' },
    { id: 3, lesson: 'The French Revolution', mode: 'Story', lastOpened: '3 days ago' },
  ];

  const handleSelectLesson = (title: string) => {
    setSelectedLesson(title);
    onSelectLesson(title);
  };

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
          isOpen ? 'w-full sm:w-80' : 'w-0'
        } ${theme === 'dark' ? 'border-zinc-800 bg-zinc-950' : 'border-gray-200 bg-white'} border-r transition-all duration-300 overflow-hidden flex flex-col fixed lg:relative left-0 top-0 bottom-0 z-50 lg:z-auto`}
      >
        {/* Header */}
        <div className={`p-4 border-b ${theme === 'dark' ? 'border-zinc-800' : 'border-gray-200'}`}>
          <h3 className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Lesson Library</h3>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-4 space-y-6">
          {/* From SharePoint */}
          <div>
            <h4 className={`text-xs mb-2 uppercase tracking-wider ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>From SharePoint</h4>
            <div className="space-y-2">
              {sharePointLessons.map((lesson) => (
                <button
                  key={lesson.id}
                  onClick={() => handleSelectLesson(lesson.title)}
                  className={`w-full p-3 rounded-xl text-left group transition-all duration-300 ${
                    selectedLesson === lesson.title
                      ? 'bg-emerald-600/10 border border-emerald-600/30'
                      : theme === 'dark' 
                        ? 'bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700'
                        : 'bg-gray-50 border border-gray-200 hover:bg-gray-100 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      theme === 'dark' ? 'bg-zinc-800 group-hover:bg-zinc-750' : 'bg-gray-200 group-hover:bg-gray-300'
                    }`}>
                      <FileText className={`w-4 h-4 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm mb-1 truncate ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{lesson.title}</p>
                      <div className={`flex items-center gap-2 text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                        <span>{lesson.subject}</span>
                        <span>•</span>
                        <span>{lesson.date}</span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* My Uploads */}
          <div>
            <h4 className={`text-xs mb-2 uppercase tracking-wider ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>My Uploads</h4>
            <div className="space-y-2">
              {myUploads.map((lesson) => (
                <button
                  key={lesson.id}
                  onClick={() => handleSelectLesson(lesson.title)}
                  className={`w-full p-3 rounded-xl text-left group transition-all duration-300 ${
                    selectedLesson === lesson.title
                      ? 'bg-emerald-600/10 border border-emerald-600/30'
                      : theme === 'dark'
                        ? 'bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700'
                        : 'bg-gray-50 border border-gray-200 hover:bg-gray-100 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      theme === 'dark' ? 'bg-zinc-800 group-hover:bg-zinc-750' : 'bg-gray-200 group-hover:bg-gray-300'
                    }`}>
                      <FileText className={`w-4 h-4 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm mb-1 truncate ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{lesson.title}</p>
                      <div className={`flex items-center gap-2 text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                        <span>{lesson.subject}</span>
                        <span>•</span>
                        <span>{lesson.date}</span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Recent Learn Sessions */}
          <div>
            <h4 className={`text-xs mb-2 uppercase tracking-wider ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>Recent Sessions</h4>
            <div className="space-y-2">
              {recentSessions.map((session) => (
                <button
                  key={session.id}
                  onClick={() => handleSelectLesson(session.lesson)}
                  className={`w-full p-3 rounded-xl text-left transition-all duration-300 ${
                    theme === 'dark'
                      ? 'bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700'
                      : 'bg-gray-50 border border-gray-200 hover:bg-gray-100 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-200'
                    }`}>
                      <Clock className={`w-4 h-4 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm mb-1 truncate ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{session.lesson}</p>
                      <div className={`flex items-center gap-2 text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                        <span className="text-emerald-500">{session.mode}</span>
                        <span>•</span>
                        <span>{session.lastOpened}</span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className={`absolute left-0 top-1/2 -translate-y-1/2 w-6 h-12 rounded-r-lg flex items-center justify-center transition-all duration-300 z-10 ${
          theme === 'dark'
            ? 'bg-zinc-900 border border-zinc-800 border-l-0 hover:bg-zinc-800'
            : 'bg-white border border-gray-200 border-l-0 hover:bg-gray-50'
        }`}
        style={{ left: isOpen ? '320px' : '0px' }}
      >
        {isOpen ? (
          <ChevronLeft className={`w-4 h-4 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`} />
        ) : (
          <ChevronRight className={`w-4 h-4 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`} />
        )}
      </button>
    </>
  );
}
