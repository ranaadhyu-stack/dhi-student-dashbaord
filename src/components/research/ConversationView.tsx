import { useState } from 'react';
import { Plus, Bold, Italic, List, ListOrdered } from 'lucide-react';

interface ConversationViewProps {
  question: string;
  theme: 'light' | 'dark';
}

export function ConversationView({ question, theme }: ConversationViewProps) {
  const [notesExpanded, setNotesExpanded] = useState(false);

  return (
    <div className="max-w-4xl mx-auto py-6 sm:py-8 lg:py-12 px-4 sm:px-6 lg:px-8">
      {/* Question Bubble */}
      <div className="mb-6 flex justify-end">
        <div className={`max-w-2xl ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-gray-100 border-gray-200'} border rounded-2xl px-5 py-3`}>
          <p className={`${theme === 'dark' ? 'text-zinc-200' : 'text-gray-700'} text-sm`}>{question}</p>
        </div>
      </div>

      {/* AI Answer Block */}
      <div className="mb-6">
        <div className={`${theme === 'dark' ? 'bg-zinc-900/50 border-zinc-800' : 'bg-white border-gray-200'} border rounded-2xl p-6`}>
          <div className="prose prose-invert max-w-none">
            <h3 className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-3`}>Understanding Quantum Mechanics</h3>
            <p className={`${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'} leading-relaxed mb-4`}>
              Quantum mechanics is a fundamental theory in physics that describes the behavior of matter and energy at the atomic and subatomic scales. Unlike classical physics, which deals with everyday objects, quantum mechanics reveals that particles can exist in multiple states simultaneously—a phenomenon known as superposition.
            </p>
            <p className={`${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'} leading-relaxed mb-4`}>
              Key principles include wave-particle duality, where particles exhibit both wave-like and particle-like properties, and the Heisenberg uncertainty principle, which states that certain pairs of physical properties cannot be simultaneously known to arbitrary precision.
            </p>
            <p className={`${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'} leading-relaxed`}>
              The mathematical framework involves complex probability amplitudes and operators, making it one of the most sophisticated theories in modern physics. Its applications range from quantum computing to understanding chemical bonds and stellar processes.
            </p>
          </div>

          {/* Sources Row */}
          <div className={`mt-6 pt-4 border-t ${theme === 'dark' ? 'border-zinc-800' : 'border-gray-200'}`}>
            <div className={`flex items-center gap-2 text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'} mb-2`}>
              Sources:
            </div>
            <div className="flex flex-wrap gap-2">
              <a href="#" className={`px-3 py-1.5 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:text-zinc-300 hover:border-zinc-600' : 'bg-gray-100 border-gray-200 text-gray-600 hover:text-gray-700 hover:border-gray-300'} border rounded-lg text-xs transition-all duration-300`}>
                Stanford Physics Dept.
              </a>
              <a href="#" className={`px-3 py-1.5 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:text-zinc-300 hover:border-zinc-600' : 'bg-gray-100 border-gray-200 text-gray-600 hover:text-gray-700 hover:border-gray-300'} border rounded-lg text-xs transition-all duration-300`}>
                MIT OpenCourseWare
              </a>
              <a href="#" className={`px-3 py-1.5 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:text-zinc-300 hover:border-zinc-600' : 'bg-gray-100 border-gray-200 text-gray-600 hover:text-gray-700 hover:border-gray-300'} border rounded-lg text-xs transition-all duration-300`}>
                Nature Physics Journal
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Add to Notes Button */}
      <div className="mb-6 flex justify-center">
        <button
          onClick={() => setNotesExpanded(!notesExpanded)}
          className={`px-6 py-2.5 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:border-zinc-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'} border rounded-xl text-sm transition-all duration-300 flex items-center gap-2`}
        >
          <Plus className="w-4 h-4" />
          {notesExpanded ? 'Hide Notes' : 'Add to Notes'}
        </button>
      </div>

      {/* Notes Panel */}
      {notesExpanded && (
        <div className={`${theme === 'dark' ? 'bg-zinc-900/50 border-zinc-800' : 'bg-white border-gray-200'} border rounded-2xl p-6`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} text-sm`}>Research Notes</h3>
            <div className="flex items-center gap-1">
              <button className={`w-8 h-8 flex items-center justify-center rounded-lg ${theme === 'dark' ? 'hover:bg-zinc-800' : 'hover:bg-gray-100'} transition-all duration-300`}>
                <Bold className={`w-4 h-4 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`} />
              </button>
              <button className={`w-8 h-8 flex items-center justify-center rounded-lg ${theme === 'dark' ? 'hover:bg-zinc-800' : 'hover:bg-gray-100'} transition-all duration-300`}>
                <Italic className={`w-4 h-4 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`} />
              </button>
              <button className={`w-8 h-8 flex items-center justify-center rounded-lg ${theme === 'dark' ? 'hover:bg-zinc-800' : 'hover:bg-gray-100'} transition-all duration-300`}>
                <List className={`w-4 h-4 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`} />
              </button>
              <button className={`w-8 h-8 flex items-center justify-center rounded-lg ${theme === 'dark' ? 'hover:bg-zinc-800' : 'hover:bg-gray-100'} transition-all duration-300`}>
                <ListOrdered className={`w-4 h-4 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`} />
              </button>
            </div>
          </div>

          <textarea
            placeholder="Start taking notes..."
            className={`w-full min-h-[200px] px-4 py-3 ${theme === 'dark' ? 'bg-zinc-800/50 border-zinc-700 text-zinc-300 placeholder:text-zinc-600 focus:border-zinc-600' : 'bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-gray-400'} border rounded-xl resize-none focus:outline-none transition-all duration-300`}
          />
        </div>
      )}

      {/* Follow-up Input */}
      <div className="mt-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Ask a follow-up question..."
            className={`w-full px-6 py-4 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500 focus:border-zinc-700' : 'bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-gray-300'} border rounded-2xl focus:outline-none transition-all duration-300`}
          />
        </div>
      </div>
    </div>
  );
}
