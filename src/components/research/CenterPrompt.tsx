import { useState } from 'react';
import { Upload, BookOpen, Network, Image, MoreHorizontal, ArrowRight } from 'lucide-react';

interface CenterPromptProps {
  onAskQuestion: (question: string) => void;
  theme: 'light' | 'dark';
}

export function CenterPrompt({ onAskQuestion, theme }: CenterPromptProps) {
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    if (input.trim()) {
      onAskQuestion(input);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full">
        {/* Main Heading */}
        <h1 className={`text-center mb-6 sm:mb-8 ${theme === 'dark' ? 'text-white' : 'text-gray-900'} text-2xl sm:text-3xl`}>
          What are you researching today?
        </h1>

        {/* Large Input Field */}
        <div className="relative mb-6">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask anything or describe your research topic..."
            className={`w-full px-6 py-5 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500 focus:border-zinc-700' : 'bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-gray-300'} border rounded-2xl resize-none focus:outline-none transition-all duration-300 min-h-[120px]`}
          />
          <button
            onClick={handleSubmit}
            disabled={!input.trim()}
            className="absolute bottom-4 right-4 w-10 h-10 flex items-center justify-center rounded-xl bg-emerald-600 hover:bg-emerald-500 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ArrowRight className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Category Chips */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
          <button className={`px-3 sm:px-4 py-2.5 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:border-zinc-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'} border rounded-xl text-xs sm:text-sm transition-all duration-300 flex items-center gap-2`}>
            <Upload className="w-4 h-4" />
            <span className="hidden sm:inline">Upload PDF</span>
            <span className="sm:hidden">PDF</span>
          </button>
          <button className={`px-3 sm:px-4 py-2.5 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:border-zinc-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'} border rounded-xl text-xs sm:text-sm transition-all duration-300 flex items-center gap-2`}>
            <BookOpen className="w-4 h-4" />
            <span className="hidden sm:inline">Use School Material</span>
            <span className="sm:hidden">Material</span>
          </button>
          <button className={`px-3 sm:px-4 py-2.5 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:border-zinc-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'} border rounded-xl text-xs sm:text-sm transition-all duration-300 flex items-center gap-2`}>
            <Network className="w-4 h-4" />
            <span className="hidden sm:inline">Generate Diagram</span>
            <span className="sm:hidden">Diagram</span>
          </button>
          <button className={`px-3 sm:px-4 py-2.5 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:border-zinc-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'} border rounded-xl text-xs sm:text-sm transition-all duration-300 flex items-center gap-2`}>
            <Image className="w-4 h-4" />
            <span className="hidden sm:inline">Generate Image</span>
            <span className="sm:hidden">Image</span>
          </button>
        </div>

        {/* Subtle hint text */}
        <p className={`text-center mt-8 text-xs ${theme === 'dark' ? 'text-zinc-600' : 'text-gray-500'}`}>
          Start typing or select an option above to begin your research session
        </p>
      </div>
    </div>
  );
}
