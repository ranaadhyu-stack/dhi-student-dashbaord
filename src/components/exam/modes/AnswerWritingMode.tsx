import { useState, useEffect } from 'react';
import { Clock, Sparkles, Upload, FileText, ChevronLeft, ChevronRight } from 'lucide-react';
import { AnswerWritingMetrics } from '../InsightsPanel';

interface Question {
  id: number;
  text: string;
  marks: number;
  targetWords: number;
}

interface AnswerWritingModeProps {
  onStartAttempt: () => void;
  onAnswerWritingMetricsUpdate?: (metrics: AnswerWritingMetrics) => void;
  onUploadClick?: () => void;
  uploadedFile?: any;
  theme: 'light' | 'dark';
}

export function AnswerWritingMode({ onStartAttempt, onAnswerWritingMetricsUpdate, onUploadClick, uploadedFile, theme }: AnswerWritingModeProps) {
  const [sessionState, setSessionState] = useState<'idle' | 'file-selected' | 'writing'>('idle');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [timerEnabled, setTimerEnabled] = useState(false);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [viewMode, setViewMode] = useState<'original' | 'refined'>('original');
  const [refinedAnswer, setRefinedAnswer] = useState('');
  const [analysisScores, setAnalysisScores] = useState({ structure: 0, clarity: 0, relevance: 0 });
  const [missingPoints, setMissingPoints] = useState<string[]>([]);
  const [strengths, setStrengths] = useState<string[]>([]);
  const [showNavigationDialog, setShowNavigationDialog] = useState(false);
  const [pendingQuestionIndex, setPendingQuestionIndex] = useState<number | null>(null);

  const currentQuestion = questions[currentQuestionIndex];
  const wordCount = answer.trim().split(/\s+/).filter(Boolean).length;
  const targetWords = currentQuestion?.targetWords || 500;
  const hasContent = answer.trim().length > 0;

  // Extract questions from uploaded file (mock implementation)
  const extractQuestionsFromFile = (file: any): Question[] => {
    // In a real implementation, this would parse the PDF and extract questions
    // For demo, we'll generate mock questions
    return [
      {
        id: 1,
        text: 'Discuss the impact of climate change on global biodiversity. Provide examples and suggest mitigation strategies.',
        marks: 15,
        targetWords: 500,
      },
      {
        id: 2,
        text: 'Analyze the role of artificial intelligence in modern healthcare systems. What are the ethical considerations?',
        marks: 20,
        targetWords: 600,
      },
      {
        id: 3,
        text: 'Examine the factors that led to the industrial revolution in Europe. How did it transform society?',
        marks: 15,
        targetWords: 500,
      },
      {
        id: 4,
        text: 'Evaluate the effectiveness of renewable energy sources in addressing global energy demands.',
        marks: 15,
        targetWords: 500,
      },
    ];
  };

  // Initialize questions when file is uploaded
  useEffect(() => {
    if (uploadedFile && questions.length === 0) {
      const extractedQuestions = extractQuestionsFromFile(uploadedFile);
      setQuestions(extractedQuestions);
      setCurrentQuestionIndex(0);
    }
  }, [uploadedFile, questions.length]);

  // Handle file upload
  useEffect(() => {
    if (uploadedFile && sessionState === 'idle') {
      setSessionState('file-selected');
    }
  }, [uploadedFile, sessionState]);

  // Handle End Session - when uploadedFile becomes null, return to idle
  useEffect(() => {
    if (!uploadedFile && sessionState !== 'idle') {
      setSessionState('idle');
      setQuestions([]);
      setCurrentQuestionIndex(0);
      setAnswer('');
      setHasAnalyzed(false);
      setAnalysisScores({ structure: 0, clarity: 0, relevance: 0 });
      setMissingPoints([]);
      setStrengths([]);
      setTimerEnabled(false);
      setViewMode('original');
      setRefinedAnswer('');
    }
  }, [uploadedFile, sessionState]);

  const handleStartWriting = () => {
    setSessionState('writing');
    onStartAttempt();
  };

  const handleAnalyze = () => {
    if (!hasAnalyzed) {
      onStartAttempt();
    }
    
    // Generate analysis based on answer content
    const words = answer.trim().split(/\s+/).filter(Boolean);
    const sentences = answer.split(/[.!?]+/).filter(s => s.trim().length > 0);
    
    // Calculate scores (simple heuristics for demo)
    const structureScore = Math.min(10, Math.max(5, Math.floor(sentences.length / 4) + (words.length > 300 ? 2 : 0)));
    const clarityScore = Math.min(10, Math.max(4, 10 - Math.floor(Math.abs(words.length / sentences.length - 15) / 2)));
    const relevanceScore = Math.min(10, Math.max(6, words.length > 400 ? 9 : 7));
    
    setAnalysisScores({ structure: structureScore, clarity: clarityScore, relevance: relevanceScore });
    
    // Generate missing points based on word count
    const missing: string[] = [];
    if (words.length < 400) missing.push('Include more specific examples');
    if (sentences.length < 8) missing.push('Add a stronger conclusion');
    if (!answer.toLowerCase().includes('example')) missing.push('Provide concrete examples');
    if (missing.length === 0) missing.push('Consider adding counter-arguments');
    setMissingPoints(missing);
    
    // Generate strengths based on answer content
    const strengthsList: string[] = [];
    if (sentences.length > 0) strengthsList.push('Clear introduction with context');
    if (answer.toLowerCase().includes('example') || answer.toLowerCase().includes('for instance')) {
      strengthsList.push('Good use of specific examples');
    }
    if (words.length > 300) strengthsList.push('Logical flow of arguments');
    if (strengthsList.length === 0) strengthsList.push('Adequate length for the topic');
    setStrengths(strengthsList);
    
    // Generate refined answer with improvements
    const refined = generateRefinedAnswer(answer);
    setRefinedAnswer(refined);
    
    setHasAnalyzed(true);
  };

  const handleBackToWriting = () => {
    setViewMode('original');
  };

  const handleShowRefined = () => {
    setViewMode('refined');
  };

  // Generate refined answer with AI improvements
  const generateRefinedAnswer = (originalAnswer: string): string => {
    // Simple demo: Add improvements to certain words/phrases
    let refined = originalAnswer;
    
    // Highlight improved portions in green
    const improvements = [
      { original: /\bhowever\b/gi, replacement: '<span style="color: rgb(34 197 94)">furthermore</span>' },
      { original: /\bbecause\b/gi, replacement: '<span style="color: rgb(34 197 94)">due to the fact that</span>' },
      { original: /\bvery important\b/gi, replacement: '<span style="color: rgb(34 197 94)">critically significant</span>' },
      { original: /\bshows\b/gi, replacement: '<span style="color: rgb(34 197 94)">demonstrates</span>' },
      { original: /\bchange\b/gi, replacement: '<span style="color: rgb(34 197 94)">transformation</span>' },
    ];
    
    improvements.forEach(({ original, replacement }) => {
      refined = refined.replace(original, replacement);
    });
    
    return refined;
  };

  // Update metrics for Insights Panel
  useEffect(() => {
    if (onAnswerWritingMetricsUpdate) {
      onAnswerWritingMetricsUpdate({
        hasAnalyzed,
        structureScore: analysisScores.structure,
        clarityScore: analysisScores.clarity,
        relevanceScore: analysisScores.relevance,
        missingPoints,
        strengths,
      });
    }
  }, [hasAnalyzed, analysisScores, missingPoints, strengths, onAnswerWritingMetricsUpdate]);

  // Reset analysis when answer is cleared
  useEffect(() => {
    if (answer.trim().length === 0 && hasAnalyzed) {
      setHasAnalyzed(false);
      setAnalysisScores({ structure: 0, clarity: 0, relevance: 0 });
      setMissingPoints([]);
      setStrengths([]);
    }
  }, [answer, hasAnalyzed]);

  // Question navigation functions
  const handleNavigateToQuestion = (targetIndex: number) => {
    if (targetIndex < 0 || targetIndex >= questions.length) return;

    // If no content and no analysis, switch directly
    if (!hasContent && !hasAnalyzed) {
      switchToQuestion(targetIndex);
      return;
    }

    // If there's content or analysis, show confirmation dialog
    setPendingQuestionIndex(targetIndex);
    setShowNavigationDialog(true);
  };

  const switchToQuestion = (targetIndex: number) => {
    // Clear current question's state
    setAnswer('');
    setHasAnalyzed(false);
    setViewMode('original');
    setRefinedAnswer('');
    setAnalysisScores({ structure: 0, clarity: 0, relevance: 0 });
    setMissingPoints([]);
    setStrengths([]);
    
    // Switch to new question
    setCurrentQuestionIndex(targetIndex);
    setShowNavigationDialog(false);
    setPendingQuestionIndex(null);
  };

  const handleConfirmNavigation = () => {
    if (pendingQuestionIndex !== null) {
      switchToQuestion(pendingQuestionIndex);
    }
  };

  const handleCancelNavigation = () => {
    setShowNavigationDialog(false);
    setPendingQuestionIndex(null);
  };

  const handlePreviousQuestion = () => {
    handleNavigateToQuestion(currentQuestionIndex - 1);
  };

  const handleNextQuestion = () => {
    handleNavigateToQuestion(currentQuestionIndex + 1);
  };

  // Idle State: Upload to Begin
  if (sessionState === 'idle') {
    return (
      <div className="h-full flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="max-w-xl w-full">
          <div className={`p-8 sm:p-12 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'} border rounded-2xl text-center`}>
            <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl ${theme === 'dark' ? 'bg-emerald-600/10' : 'bg-emerald-50'} flex items-center justify-center`}>
              <FileText className="w-8 h-8 text-emerald-600" />
            </div>
            <h2 className={`text-2xl mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Answer Writing Practice
            </h2>
            <p className={`mb-8 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
              Upload a question set to begin.
            </p>
            <button
              onClick={onUploadClick}
              className="px-8 py-3.5 bg-emerald-600 rounded-xl text-white hover:bg-emerald-500 transition-all duration-300 flex items-center gap-3 mx-auto"
            >
              <Upload className="w-5 h-5" />
              Upload Question Set
            </button>
          </div>
        </div>
      </div>
    );
  }

  // File Selected State: Start Writing
  if (sessionState === 'file-selected') {
    return (
      <div className="h-full flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="max-w-xl w-full">
          <div className={`p-8 sm:p-12 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'} border rounded-2xl text-center`}>
            <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl ${theme === 'dark' ? 'bg-emerald-600/10' : 'bg-emerald-50'} flex items-center justify-center`}>
              <FileText className="w-8 h-8 text-emerald-600" />
            </div>
            <h2 className={`text-2xl mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Ready to Begin
            </h2>
            <div className={`mb-8 p-4 ${theme === 'dark' ? 'bg-zinc-950 border-zinc-800' : 'bg-gray-50 border-gray-200'} border rounded-xl`}>
              <div className="flex items-center justify-center gap-2">
                <FileText className={`w-4 h-4 ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`} />
                <span className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                  {uploadedFile?.name || 'Question Set Uploaded'}
                </span>
              </div>
            </div>
            <button
              onClick={handleStartWriting}
              className="px-8 py-3.5 bg-emerald-600 rounded-xl text-white hover:bg-emerald-500 transition-all duration-300 flex items-center gap-3 mx-auto"
            >
              <Sparkles className="w-5 h-5" />
              Start Writing Practice
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Writing State: Full Interface
  return (
    <div className="h-full flex flex-col p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto w-full flex-1 flex flex-col">
        {/* Question */}
        <div className={`mb-6 p-6 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'} border rounded-2xl flex-shrink-0`}>
          {/* Question Navigation Header */}
          {questions.length > 1 && (
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <span className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                  Question {currentQuestionIndex + 1} / {questions.length}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                  className={`p-2 rounded-lg transition-all duration-300 flex items-center gap-1.5 ${
                    currentQuestionIndex === 0
                      ? theme === 'dark'
                        ? 'bg-zinc-950 border border-zinc-800 text-zinc-600 cursor-not-allowed'
                        : 'bg-gray-50 border border-gray-200 text-gray-400 cursor-not-allowed'
                      : theme === 'dark'
                      ? 'bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-zinc-300 hover:border-zinc-700'
                      : 'bg-gray-50 border border-gray-200 text-gray-600 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="text-sm">Previous</span>
                </button>
                <button
                  onClick={handleNextQuestion}
                  disabled={currentQuestionIndex === questions.length - 1}
                  className={`p-2 rounded-lg transition-all duration-300 flex items-center gap-1.5 ${
                    currentQuestionIndex === questions.length - 1
                      ? theme === 'dark'
                        ? 'bg-zinc-950 border border-zinc-800 text-zinc-600 cursor-not-allowed'
                        : 'bg-gray-50 border border-gray-200 text-gray-400 cursor-not-allowed'
                      : theme === 'dark'
                      ? 'bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-zinc-300 hover:border-zinc-700'
                      : 'bg-gray-50 border border-gray-200 text-gray-600 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="text-sm">Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className={`mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {currentQuestion?.text || 'Discuss the impact of climate change on global biodiversity. Provide examples and suggest mitigation strategies.'}
              </h3>
              <div className={`flex items-center gap-4 text-sm ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                <span>Long Answer</span>
                <span>•</span>
                <span>{currentQuestion?.marks || '15'} marks</span>
                <span>•</span>
                <span>Target: {targetWords} words</span>
              </div>
            </div>
            <div className="flex items-center gap-3 ml-6">
              <label className={`flex items-center gap-2 text-sm cursor-pointer ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                <input
                  type="checkbox"
                  checked={timerEnabled}
                  onChange={(e) => setTimerEnabled(e.target.checked)}
                  className={`w-4 h-4 rounded ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-gray-300'}`}
                />
                <Clock className="w-4 h-4" />
                30 min timer
              </label>
            </div>
          </div>
        </div>

        {/* Writing Area - Expanded height */}
        <div className={`flex-1 p-6 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'} border rounded-2xl flex flex-col min-h-0`}>
          <div className="mb-4 flex items-center justify-between flex-shrink-0">
            <h4 className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Your Answer</h4>
            
            <div className="flex items-center gap-4 text-sm">
              <span className={theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}>
                {wordCount} / {targetWords} words
              </span>
              <div className={`h-1 w-32 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    wordCount >= targetWords ? 'bg-emerald-600' : 'bg-amber-500'
                  }`}
                  style={{ width: `${Math.min((wordCount / targetWords) * 100, 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* View Toggle Buttons - Only visible after analysis */}
          {hasAnalyzed && (
            <div className="mb-4 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleBackToWriting}
                  className={`px-4 py-2 text-sm rounded-lg transition-all duration-300 ${
                    viewMode === 'original'
                      ? theme === 'dark'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-emerald-600 text-white'
                      : theme === 'dark'
                      ? 'bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-zinc-300 hover:border-zinc-700'
                      : 'bg-gray-50 border border-gray-200 text-gray-600 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Back to Writing
                </button>
                <button
                  onClick={handleShowRefined}
                  className={`px-4 py-2 text-sm rounded-lg transition-all duration-300 ${
                    viewMode === 'refined'
                      ? theme === 'dark'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-emerald-600 text-white'
                      : theme === 'dark'
                      ? 'bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-zinc-300 hover:border-zinc-700'
                      : 'bg-gray-50 border border-gray-200 text-gray-600 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Show Refined Version
                </button>
              </div>
              
              <button
                onClick={handleAnalyze}
                disabled={!hasContent}
                className="px-6 py-2.5 bg-emerald-600 rounded-xl text-white hover:bg-emerald-500 transition-all duration-300 flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <Sparkles className="w-4 h-4" />
                Analyze Answer
              </button>
            </div>
          )}

          {/* Original Draft View (editable) */}
          {viewMode === 'original' && (
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Start writing your answer here. Focus on structure, clarity, and relevance to the question..."
              className={`flex-1 px-4 py-3 ${theme === 'dark' ? 'bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-zinc-700' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-gray-300'} border rounded-xl resize-none focus:outline-none transition-all duration-300 min-h-[400px]`}
              style={{ height: hasAnalyzed ? 'calc(100% - 140px)' : 'calc(100% - 80px)' }}
            />
          )}

          {/* Refined View (read-only with green highlights) */}
          {viewMode === 'refined' && hasAnalyzed && (
            <div 
              className={`flex-1 px-4 py-3 ${theme === 'dark' ? 'bg-zinc-950 border-zinc-800 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'} border rounded-xl overflow-auto`}
              style={{ height: 'calc(100% - 140px)' }}
            >
              <div 
                className="leading-relaxed"
                dangerouslySetInnerHTML={{ __html: refinedAnswer }}
              />
            </div>
          )}

          {!hasAnalyzed && (
            <div className="flex items-center justify-between mt-4 flex-shrink-0">
              <span className={`text-xs ${theme === 'dark' ? 'text-zinc-600' : 'text-gray-400'}`}>
                Auto-saved just now
              </span>
              
              <button
                onClick={handleAnalyze}
                disabled={!hasContent}
                className="px-6 py-2.5 bg-emerald-600 rounded-xl text-white hover:bg-emerald-500 transition-all duration-300 flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <Sparkles className="w-4 h-4" />
                Analyze Answer
              </button>
            </div>
          )}

          {hasAnalyzed && (
            <div className="mt-4 flex-shrink-0">
              <span className={`text-xs ${theme === 'dark' ? 'text-zinc-600' : 'text-gray-400'}`}>
                Auto-saved just now
              </span>
            </div>
          )}
        </div>

        {/* Navigation Confirmation Dialog */}
        {showNavigationDialog && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className={`max-w-md p-8 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'} border rounded-2xl`}>
              <h3 className={`text-xl mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Confirm Navigation
              </h3>
              <p className={`mb-6 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                Moving to another question will clear this answer and its analysis. Continue?
              </p>
              <div className="flex items-center justify-end gap-4">
                <button
                  onClick={handleCancelNavigation}
                  className={`px-4 py-2 text-sm rounded-lg transition-all duration-300 ${
                    theme === 'dark'
                      ? 'bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-zinc-300 hover:border-zinc-700'
                      : 'bg-gray-50 border border-gray-200 text-gray-600 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  No, Stay Here
                </button>
                <button
                  onClick={handleConfirmNavigation}
                  className="px-4 py-2 text-sm rounded-lg transition-all duration-300 bg-emerald-600 text-white hover:bg-emerald-500"
                >
                  Yes, Continue
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}