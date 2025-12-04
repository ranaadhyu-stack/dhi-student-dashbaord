import { useState } from 'react';
import { FileText, Play, ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react';

interface PastPapersModeProps {
  onStartAttempt: () => void;
  theme: 'light' | 'dark';
}

export function PastPapersMode({ onStartAttempt, theme }: PastPapersModeProps) {
  const [isSolving, setIsSolving] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [aiQuery, setAiQuery] = useState('');

  const totalQuestions = 10;

  const handleStartSolving = () => {
    setIsSolving(true);
    onStartAttempt();
  };

  if (isSolving) {
    return (
      <div className="h-full flex flex-col p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col">
          {/* Question Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>Question {currentQuestion} of {totalQuestions}</span>
              <span className={`text-xs ${theme === 'dark' ? 'text-zinc-600' : 'text-gray-400'}`}>Section A - Multiple Choice</span>
            </div>
            <div className={`h-1 ${theme === 'dark' ? 'bg-zinc-900' : 'bg-gray-200'} rounded-full overflow-hidden`}>
              <div
                className="h-full bg-emerald-600 rounded-full transition-all duration-300"
                style={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="flex-1 mb-6">
            <div className={`p-6 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'} border rounded-2xl mb-4`}>
              <h3 className={`mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Solve for x: 2x² + 5x - 3 = 0
              </h3>
              <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                Show all working and express your answer in simplest form.
              </p>
            </div>

            {/* Answer Area */}
            <div className={`p-6 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'} border rounded-2xl`}>
              <label className={`text-sm mb-2 block ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>Your Answer</label>
              <textarea
                value={answers[currentQuestion] || ''}
                onChange={(e) => setAnswers({ ...answers, [currentQuestion]: e.target.value })}
                placeholder="Type your answer here..."
                className={`w-full px-4 py-3 ${theme === 'dark' ? 'bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-zinc-700' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-gray-300'} border rounded-xl resize-none focus:outline-none transition-all duration-300 min-h-[200px]`}
              />
              <div className="flex items-center justify-between mt-3">
                <span className={`text-xs ${theme === 'dark' ? 'text-zinc-600' : 'text-gray-400'}`}>
                  {answers[currentQuestion]?.length || 0} characters
                </span>
                <span className="text-xs text-emerald-600">Auto-saved</span>
              </div>
            </div>
          </div>

          {/* AI Query Box */}
          <div className="mb-6">
            <div className={`p-4 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'} border rounded-xl`}>
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className={`w-4 h-4 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`} />
                <span className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>Ask about this question</span>
              </div>
              <input
                type="text"
                value={aiQuery}
                onChange={(e) => setAiQuery(e.target.value)}
                placeholder="e.g., How many times has this question appeared in 10 years?"
                className={`w-full px-3 py-2 ${theme === 'dark' ? 'bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-zinc-700' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-gray-300'} border rounded-lg text-sm focus:outline-none transition-all duration-300`}
              />
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentQuestion(Math.max(1, currentQuestion - 1))}
              disabled={currentQuestion === 1}
              className={`px-4 py-2 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:border-zinc-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'} border rounded-xl text-sm transition-all duration-300 flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed`}
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>
            <div className="flex gap-2">
              {Array.from({ length: totalQuestions }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  onClick={() => setCurrentQuestion(num)}
                  className={`w-8 h-8 rounded-lg text-sm transition-all duration-300 ${
                    currentQuestion === num
                      ? 'bg-emerald-600 text-white'
                      : answers[num]
                      ? theme === 'dark'
                        ? 'bg-zinc-800 text-emerald-500 border border-zinc-700'
                        : 'bg-gray-100 text-emerald-600 border border-gray-300'
                      : theme === 'dark'
                      ? 'bg-zinc-900 text-zinc-500 border border-zinc-800 hover:bg-zinc-800'
                      : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
            <button
              onClick={() => setCurrentQuestion(Math.min(totalQuestions, currentQuestion + 1))}
              disabled={currentQuestion === totalQuestions}
              className={`px-4 py-2 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:border-zinc-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'} border rounded-xl text-sm transition-all duration-300 flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed`}
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-2xl w-full">
        {/* Paper Preview */}
        <div className={`mb-6 sm:mb-8 p-4 sm:p-6 lg:p-8 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'} border rounded-2xl`}>
          <div className="flex items-start gap-6 mb-6">
            <div className={`w-16 h-20 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'} rounded-lg flex items-center justify-center flex-shrink-0`}>
              <FileText className={`w-8 h-8 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`} />
            </div>
            <div className="flex-1">
              <h2 className={`mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Mathematics Final Exam 2024</h2>
              <div className={`flex items-center gap-4 text-sm mb-4 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                <span>CBSE Board</span>
                <span>•</span>
                <span>Class 12</span>
                <span>•</span>
                <span>3 hours</span>
                <span>•</span>
                <span>100 marks</span>
              </div>
              <p className={`text-sm ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                This paper contains 10 questions across 3 sections. All questions are compulsory.
                Section A contains MCQs, Section B contains short answer questions, and Section C contains long answer questions.
              </p>
            </div>
          </div>

          {/* Start Button */}
          <button
            onClick={handleStartSolving}
            className="w-full px-6 py-3 bg-emerald-600 rounded-xl text-white hover:bg-emerald-500 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Play className="w-5 h-5" />
            Start Solving
          </button>
        </div>

        {/* Quick Info */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className={`p-4 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'} border rounded-xl text-center`}>
            <p className="text-2xl text-emerald-500 mb-1">10</p>
            <p className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>Questions</p>
          </div>
          <div className={`p-4 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'} border rounded-xl text-center`}>
            <p className="text-2xl text-emerald-500 mb-1">3</p>
            <p className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>Sections</p>
          </div>
          <div className={`p-4 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'} border rounded-xl text-center`}>
            <p className="text-2xl text-emerald-500 mb-1">100</p>
            <p className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>Total Marks</p>
          </div>
        </div>
      </div>
    </div>
  );
}
