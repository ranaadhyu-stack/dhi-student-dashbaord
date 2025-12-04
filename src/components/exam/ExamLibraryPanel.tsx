import { useState } from 'react';
import { Search, ChevronLeft, ChevronRight, FileText } from 'lucide-react';

interface ExamLibraryPanelProps {
  isOpen: boolean;
  onToggle: () => void;
  theme: 'light' | 'dark';
}

export function ExamLibraryPanel({ isOpen, onToggle, theme }: ExamLibraryPanelProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [yearFilter, setYearFilter] = useState<'5' | '10' | 'all'>('all');
  const [subjectFilter, setSubjectFilter] = useState('all');

  const papers = [
    { id: 1, title: 'Mathematics Final Exam 2024', year: 2024, subject: 'Mathematics', type: 'Board', group: 'Institution Papers' },
    { id: 2, title: 'Physics Midterm 2023', year: 2023, subject: 'Physics', type: 'School', group: 'Past 5 Years' },
    { id: 3, title: 'Chemistry Sample Paper', year: 2024, subject: 'Chemistry', type: 'Sample', group: 'Student Uploads' },
    { id: 4, title: 'Biology Board Exam 2022', year: 2022, subject: 'Biology', type: 'Board', group: 'Past 5 Years' },
    { id: 5, title: 'English Literature 2021', year: 2021, subject: 'English', type: 'Board', group: 'Past 5 Years' },
  ];

  const groupedPapers = papers.reduce((acc, paper) => {
    if (!acc[paper.group]) acc[paper.group] = [];
    acc[paper.group].push(paper);
    return acc;
  }, {} as Record<string, typeof papers>);

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
        } border-r ${theme === 'dark' ? 'border-zinc-800 bg-zinc-950' : 'border-gray-200 bg-white'} transition-all duration-300 overflow-hidden flex flex-col fixed lg:relative left-0 top-0 bottom-0 z-50 lg:z-auto`}
      >
        {/* Header */}
        <div className={`p-4 border-b ${theme === 'dark' ? 'border-zinc-800' : 'border-gray-200'}`}>
          <h3 className={`mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Exam Library</h3>

          {/* Search */}
          <div className="relative mb-4">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-400'}`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search papers..."
              className={`w-full pl-10 pr-4 py-2 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500 focus:border-zinc-700' : 'bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-gray-300'} border rounded-xl text-sm focus:outline-none transition-all duration-300`}
            />
          </div>

          {/* Filters */}
          <div className="space-y-3">
            <div>
              <label className={`text-xs mb-1.5 block ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>Year Range</label>
              <div className="flex gap-2">
                {['5', '10', 'all'].map((range) => (
                  <button
                    key={range}
                    onClick={() => setYearFilter(range as any)}
                    className={`flex-1 px-3 py-1.5 rounded-lg text-xs transition-all duration-300 ${
                      yearFilter === range
                        ? 'bg-emerald-600 text-white'
                        : theme === 'dark'
                        ? 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:bg-zinc-800'
                        : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {range === 'all' ? 'All' : `Last ${range}Y`}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className={`text-xs mb-1.5 block ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>Subject</label>
              <select
                value={subjectFilter}
                onChange={(e) => setSubjectFilter(e.target.value)}
                className={`w-full px-3 py-2 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800 text-white focus:border-zinc-700' : 'bg-white border-gray-200 text-gray-900 focus:border-gray-300'} border rounded-lg text-xs focus:outline-none transition-all duration-300`}
              >
                <option value="all">All Subjects</option>
                <option value="mathematics">Mathematics</option>
                <option value="physics">Physics</option>
                <option value="chemistry">Chemistry</option>
                <option value="biology">Biology</option>
              </select>
            </div>
          </div>
        </div>

        {/* Papers List */}
        <div className="flex-1 overflow-auto p-4 space-y-6">
          {Object.entries(groupedPapers).map(([group, items]) => (
            <div key={group}>
              <h4 className={`text-xs mb-2 ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>{group}</h4>
              <div className="space-y-2">
                {items.map((paper) => (
                  <button
                    key={paper.id}
                    className={`w-full p-3 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700' : 'bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300'} border rounded-xl transition-all duration-300 text-left group`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-lg ${theme === 'dark' ? 'bg-zinc-800 group-hover:bg-zinc-750' : 'bg-gray-100 group-hover:bg-gray-200'} flex items-center justify-center flex-shrink-0 transition-all duration-300`}>
                        <FileText className={`w-4 h-4 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm mb-1 truncate ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{paper.title}</p>
                        <div className={`flex items-center gap-2 text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                          <span>{paper.year}</span>
                          <span>•</span>
                          <span>{paper.subject}</span>
                          <span>•</span>
                          <span>{paper.type}</span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className={`absolute left-0 top-1/2 -translate-y-1/2 w-6 h-12 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800 hover:bg-zinc-800' : 'bg-white border-gray-200 hover:bg-gray-100'} border border-l-0 rounded-r-lg flex items-center justify-center transition-all duration-300 z-10`}
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
