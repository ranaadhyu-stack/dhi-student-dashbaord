import { Hash, Download, Share2 } from 'lucide-react';

interface BottomBarProps {
  theme: 'light' | 'dark';
}

export function BottomBar({ theme }: BottomBarProps) {
  return (
    <div className={`h-14 border-t ${theme === 'dark' ? 'border-zinc-800 bg-zinc-900/50' : 'border-gray-200 bg-white/50'} flex items-center justify-between px-3 sm:px-6`}>
      <div className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
        <span className="hidden sm:inline">Citations: </span>
        <span className={theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}>0</span>
      </div>
      <div className="flex items-center gap-1 sm:gap-3">
        <button className={`px-2 sm:px-3 py-1.5 text-xs ${theme === 'dark' ? 'text-zinc-400 hover:text-zinc-300' : 'text-gray-600 hover:text-gray-700'} transition-colors duration-300 flex items-center gap-1.5`}>
          <Hash className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Generate Research ID</span>
        </button>
        <button className={`px-2 sm:px-3 py-1.5 text-xs ${theme === 'dark' ? 'text-zinc-400 hover:text-zinc-300' : 'text-gray-600 hover:text-gray-700'} transition-colors duration-300 flex items-center gap-1.5`}>
          <Download className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Export Notes</span>
        </button>
        <button className="px-2 sm:px-3 py-1.5 text-xs text-emerald-500 hover:text-emerald-400 transition-colors duration-300 flex items-center gap-1.5">
          <Share2 className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Send to Share Point</span>
          <span className="md:hidden hidden sm:inline">Share</span>
        </button>
      </div>
    </div>
  );
}
