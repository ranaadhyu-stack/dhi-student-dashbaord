import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SessionsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'light' | 'dark';
}

const sessions = [
  { id: 1, title: 'Quantum Mechanics Research', subject: 'Physics', lastEdited: '2 hours ago' },
  { id: 2, title: 'Renaissance Art Analysis', subject: 'History', lastEdited: '1 day ago' },
  { id: 3, title: 'Climate Change Data', subject: 'Environmental Science', lastEdited: '3 days ago' },
  { id: 4, title: 'Molecular Biology Notes', subject: 'Biology', lastEdited: '5 days ago' },
  { id: 5, title: 'Machine Learning Algorithms', subject: 'Computer Science', lastEdited: '1 week ago' },
];

export function SessionsPanel({ isOpen, onClose, theme }: SessionsPanelProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/40 z-40"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className={`fixed left-0 top-0 h-full w-full sm:w-80 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'} border-r z-50 shadow-2xl`}
          >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className={`flex items-center justify-between p-5 border-b ${theme === 'dark' ? 'border-zinc-800' : 'border-gray-200'}`}>
            <h2 className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>My Sessions</h2>
            <button
              onClick={onClose}
              className={`w-8 h-8 flex items-center justify-center rounded-lg ${theme === 'dark' ? 'hover:bg-zinc-800' : 'hover:bg-gray-100'} transition-all duration-300`}
            >
              <X className={`w-4 h-4 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`} />
            </button>
          </div>

          {/* Sessions List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {sessions.map((session) => (
              <button
                key={session.id}
                className={`w-full p-4 rounded-xl ${theme === 'dark' ? 'bg-zinc-800/50 border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700' : 'bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-gray-300'} border transition-all duration-300 text-left`}
              >
                <div className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-1 truncate`}>{session.title}</div>
                <div className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'} mb-1`}>{session.subject}</div>
                <div className={`text-xs ${theme === 'dark' ? 'text-zinc-600' : 'text-gray-400'}`}>{session.lastEdited}</div>
              </button>
            ))}
          </div>

          {/* New Session Button */}
          <div className={`p-4 border-t ${theme === 'dark' ? 'border-zinc-800' : 'border-gray-200'}`}>
            <button className="w-full px-4 py-3 bg-emerald-600 rounded-xl text-sm text-white hover:bg-emerald-500 transition-all duration-300">
              + New Session
            </button>
          </div>
        </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
