import { X, Hash, Tag, Paperclip, Lightbulb } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DetailsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'light' | 'dark';
}

export function DetailsPanel({ isOpen, onClose, theme }: DetailsPanelProps) {
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
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className={`fixed right-0 top-0 h-full w-full sm:w-80 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'} border-l z-50 shadow-2xl`}
          >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className={`flex items-center justify-between p-5 border-b ${theme === 'dark' ? 'border-zinc-800' : 'border-gray-200'}`}>
            <h2 className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Session Details</h2>
            <button
              onClick={onClose}
              className={`w-8 h-8 flex items-center justify-center rounded-lg ${theme === 'dark' ? 'hover:bg-zinc-800' : 'hover:bg-gray-100'} transition-all duration-300`}
            >
              <X className={`w-4 h-4 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Research ID Status */}
            <div className={`${theme === 'dark' ? 'bg-zinc-800/50 border-zinc-800' : 'bg-gray-50 border-gray-200'} border rounded-xl p-4`}>
              <div className="flex items-center gap-2 mb-3">
                <Hash className={`w-4 h-4 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'}`} />
                <h3 className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} text-sm`}>Research ID</h3>
              </div>
              <div className={`text-xs ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'} mb-3`}>Not generated</div>
              <button className={`w-full px-3 py-2 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'} border rounded-lg text-xs transition-all duration-300`}>
                Generate ID
              </button>
            </div>

            {/* Tags */}
            <div className={`${theme === 'dark' ? 'bg-zinc-800/50 border-zinc-800' : 'bg-gray-50 border-gray-200'} border rounded-xl p-4`}>
              <div className="flex items-center gap-2 mb-3">
                <Tag className={`w-4 h-4 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'}`} />
                <h3 className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} text-sm`}>Tags</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className={`px-2.5 py-1 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-zinc-400' : 'bg-white border-gray-300 text-gray-600'} border rounded-lg text-xs`}>
                  Physics
                </span>
                <span className={`px-2.5 py-1 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-zinc-400' : 'bg-white border-gray-300 text-gray-600'} border rounded-lg text-xs`}>
                  Quantum
                </span>
                <button className={`px-2.5 py-1 border ${theme === 'dark' ? 'border-zinc-700 text-zinc-500 hover:text-zinc-400 hover:border-zinc-600' : 'border-gray-300 text-gray-500 hover:text-gray-600 hover:border-gray-400'} border-dashed rounded-lg text-xs transition-all duration-300`}>
                  + Add
                </button>
              </div>
            </div>

            {/* Attached Sources */}
            <div className={`${theme === 'dark' ? 'bg-zinc-800/50 border-zinc-800' : 'bg-gray-50 border-gray-200'} border rounded-xl p-4`}>
              <div className="flex items-center gap-2 mb-3">
                <Paperclip className={`w-4 h-4 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'}`} />
                <h3 className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} text-sm`}>Attached Sources</h3>
              </div>
              <div className="space-y-2">
                <div className={`px-3 py-2 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-gray-300'} border rounded-lg`}>
                  <div className={`text-xs ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'} mb-0.5`}>quantum_intro.pdf</div>
                  <div className={`text-xs ${theme === 'dark' ? 'text-zinc-600' : 'text-gray-400'}`}>2.4 MB</div>
                </div>
                <div className={`px-3 py-2 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-gray-300'} border rounded-lg`}>
                  <div className={`text-xs ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'} mb-0.5`}>lecture_notes.pdf</div>
                  <div className={`text-xs ${theme === 'dark' ? 'text-zinc-600' : 'text-gray-400'}`}>1.8 MB</div>
                </div>
                <button className={`w-full px-3 py-2 border ${theme === 'dark' ? 'border-zinc-700 text-zinc-500 hover:text-zinc-400 hover:border-zinc-600' : 'border-gray-300 text-gray-500 hover:text-gray-600 hover:border-gray-400'} border-dashed rounded-lg text-xs transition-all duration-300`}>
                  + Add Source
                </button>
              </div>
            </div>

            {/* AI Insights */}
            <div className={`${theme === 'dark' ? 'bg-zinc-800/50 border-zinc-800' : 'bg-gray-50 border-gray-200'} border rounded-xl p-4`}>
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className={`w-4 h-4 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'}`} />
                <h3 className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} text-sm`}>AI Insights</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <div className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'} mb-1`}>Key Concepts</div>
                  <div className={`text-xs ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'} leading-relaxed`}>
                    Wave-particle duality, superposition, uncertainty principle
                  </div>
                </div>
                <div>
                  <div className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'} mb-1`}>Missing Aspects</div>
                  <div className={`text-xs ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'} leading-relaxed`}>
                    Mathematical formulations, Schrödinger equation
                  </div>
                </div>
                <div>
                  <div className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'} mb-1`}>Suggestions</div>
                  <button className="text-xs text-emerald-500 hover:text-emerald-400 transition-colors duration-300">
                    Explore quantum entanglement →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
