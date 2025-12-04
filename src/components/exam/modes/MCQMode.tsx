import { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, ArrowRight, FileText, Upload } from 'lucide-react';
import { MCQSessionMetrics } from '../InsightsPanel';

interface MCQModeProps {
  onStartAttempt: () => void;
  onSessionStateChange?: (state: 'idle' | 'file-selected' | 'practicing') => void;
  onMetricsUpdate?: (metrics: MCQSessionMetrics) => void;
  uploadedFile?: any;
  theme: 'light' | 'dark';
}

type MCQState = 'empty' | 'file-selected' | 'practicing';

export function MCQMode({ onStartAttempt, onSessionStateChange, onMetricsUpdate, uploadedFile, theme }: MCQModeProps) {
  const [state, setState] = useState<MCQState>('empty');
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());
  const [sessionMetrics, setSessionMetrics] = useState<MCQSessionMetrics>({
    accuracy: 0,
    topicPerformance: [],
    avgTime: 0,
    fastestTime: 0,
    slowestTime: 0,
    questionsAnswered: 0,
  });

  const totalQuestions = 20;
  const correctAnswer = 'B';

  const options = [
    { id: 'A', text: 'The derivative is always zero' },
    { id: 'B', text: 'The function has a local maximum or minimum' },
    { id: 'C', text: 'The function is undefined at that point' },
    { id: 'D', text: 'The function is continuous everywhere' },
  ];

  // Update state when file is uploaded
  useEffect(() => {
    if (uploadedFile) {
      setState('file-selected');
      if (onSessionStateChange) {
        onSessionStateChange('file-selected');
      }
    } else {
      setState('empty');
      // Reset all metrics when file is cleared
      setCurrentQuestion(1);
      setSelectedAnswer(null);
      setHasSubmitted(false);
      setShowFeedback(false);
      setSessionMetrics({
        accuracy: 0,
        topicPerformance: [],
        avgTime: 0,
        fastestTime: 0,
        slowestTime: 0,
        questionsAnswered: 0,
      });
      if (onSessionStateChange) {
        onSessionStateChange('idle');
      }
    }
  }, [uploadedFile, onSessionStateChange]);

  const handleStartPractice = () => {
    setState('practicing');
    onStartAttempt();
    if (onSessionStateChange) {
      onSessionStateChange('practicing');
    }
  };

  const handleSubmit = () => {
    setHasSubmitted(true);
    setShowFeedback(true);
    
    const timeTaken = Math.floor((Date.now() - questionStartTime) / 1000); // Convert to seconds
    const isCorrect = selectedAnswer === correctAnswer ? 100 : 0; // 100% for correct, 0% for incorrect
    const totalAnswered = sessionMetrics.questionsAnswered + 1;
    
    const newMetrics: MCQSessionMetrics = {
      questionsAnswered: totalAnswered,
      avgTime: Math.floor((sessionMetrics.avgTime * sessionMetrics.questionsAnswered + timeTaken) / totalAnswered),
      fastestTime: sessionMetrics.fastestTime === 0 ? timeTaken : Math.min(sessionMetrics.fastestTime, timeTaken),
      slowestTime: Math.max(sessionMetrics.slowestTime, timeTaken),
      accuracy: Math.floor((sessionMetrics.accuracy * sessionMetrics.questionsAnswered + isCorrect) / totalAnswered),
      topicPerformance: sessionMetrics.topicPerformance, // Will be updated with real data later
    };
    
    setSessionMetrics(newMetrics);
    if (onMetricsUpdate) {
      onMetricsUpdate(newMetrics);
    }
  };

  const handleNext = () => {
    setCurrentQuestion(currentQuestion + 1);
    setSelectedAnswer(null);
    setHasSubmitted(false);
    setShowFeedback(false);
    setQuestionStartTime(Date.now());
  };

  // Empty State
  if (state === 'empty') {
    return (
      <div className="h-full flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="max-w-md w-full text-center">
          <div className={`w-16 h-16 rounded-2xl ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-gray-100 border-gray-200'} border flex items-center justify-center mx-auto mb-6`}>
            <Upload className={`w-8 h-8 ${theme === 'dark' ? 'text-zinc-600' : 'text-gray-400'}`} />
          </div>
          <h3 className={`mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Upload a file from your library to start MCQ practice.
          </h3>
          <p className={`text-sm ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
            We'll generate practice questions from the file you choose.
          </p>
        </div>
      </div>
    );
  }

  // File Selected State
  if (state === 'file-selected' && uploadedFile) {
    return (
      <div className="h-full flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="max-w-2xl w-full">
          <div className={`p-8 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'} border rounded-2xl`}>
            {/* Header */}
            <div className="flex items-start gap-4 mb-8">
              <div className={`w-12 h-12 rounded-xl ${theme === 'dark' ? 'bg-emerald-600/10' : 'bg-emerald-50'} flex items-center justify-center flex-shrink-0`}>
                <FileText className={`w-6 h-6 ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`} />
              </div>
              <div className="flex-1">
                <h3 className={`mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Selected Source
                </h3>
                <p className={`text-sm ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                  Ready to generate MCQ practice questions
                </p>
              </div>
            </div>

            {/* File Details */}
            <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-zinc-950/50 border border-zinc-800' : 'bg-gray-50 border border-gray-200'} mb-6`}>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                    File name:
                  </span>
                  <span className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {uploadedFile.name}
                  </span>
                </div>
                {uploadedFile.tags && uploadedFile.tags.length > 0 && (
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                      Subject:
                    </span>
                    <span className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {uploadedFile.tags[0]}
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                    Questions detected:
                  </span>
                  <span className={`text-sm ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`}>
                    {totalQuestions} questions
                  </span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={handleStartPractice}
              className="w-full px-6 py-3 bg-emerald-600 rounded-xl text-white hover:bg-emerald-500 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Start Practice
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Practicing State
  return (
    <div className="h-full flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-3xl w-full">
        {/* Source Indicator */}
        <div className={`mb-6 p-4 rounded-xl border ${theme === 'dark' ? 'bg-zinc-900/50 border-zinc-800' : 'bg-gray-50 border-gray-200'}`}>
          {uploadedFile ? (
            <div className="flex items-center gap-3">
              <FileText className={`w-5 h-5 ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`} />
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                  Source:
                </span>
                <span className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {uploadedFile.name}
                </span>
                {uploadedFile.tags && uploadedFile.tags.length > 0 && (
                  <>
                    <span className={`text-sm ${theme === 'dark' ? 'text-zinc-600' : 'text-gray-400'}`}>•</span>
                    <span className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                      {uploadedFile.tags[0]}
                    </span>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <FileText className={`w-5 h-5 ${theme === 'dark' ? 'text-zinc-600' : 'text-gray-400'}`} />
              <p className={`text-sm ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                Select a file from Share Point to start MCQ practice.
              </p>
            </div>
          )}
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className={`text-sm ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>Question {currentQuestion} of {totalQuestions}</span>
            <span className="text-sm text-emerald-500">{Math.round((currentQuestion / totalQuestions) * 100)}% Complete</span>
          </div>
          <div className={`h-1.5 ${theme === 'dark' ? 'bg-zinc-900' : 'bg-gray-200'} rounded-full overflow-hidden`}>
            <div
              className="h-full bg-emerald-600 rounded-full transition-all duration-300"
              style={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className={`mb-8 p-6 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'} border rounded-2xl`}>
          <div className="flex items-start gap-4 mb-6">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center flex-shrink-0 text-white">
              {currentQuestion}
            </div>
            <div className="flex-1">
              <h3 className={`mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                What does it mean when the derivative of a function equals zero at a point?
              </h3>
              <p className={`text-sm ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>Select the most appropriate answer</p>
            </div>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {options.map((option) => {
              const isSelected = selectedAnswer === option.id;
              const isCorrect = option.id === correctAnswer;
              const showCorrect = showFeedback && isCorrect;
              const showIncorrect = showFeedback && isSelected && !isCorrect;

              return (
                <button
                  key={option.id}
                  onClick={() => !hasSubmitted && setSelectedAnswer(option.id)}
                  disabled={hasSubmitted}
                  className={`w-full p-4 rounded-xl text-left transition-all duration-300 ${
                    showCorrect
                      ? 'bg-emerald-600/10 border-2 border-emerald-600'
                      : showIncorrect
                      ? 'bg-red-500/10 border-2 border-red-500'
                      : isSelected
                      ? 'bg-emerald-600 border-2 border-emerald-600'
                      : theme === 'dark'
                      ? 'bg-zinc-800 border-2 border-zinc-700 hover:border-zinc-600'
                      : 'bg-gray-50 border-2 border-gray-200 hover:border-gray-300'
                  } ${hasSubmitted ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        showCorrect
                          ? 'border-emerald-600 bg-emerald-600'
                          : showIncorrect
                          ? 'border-red-500 bg-red-500'
                          : isSelected
                          ? 'border-white bg-white'
                          : theme === 'dark'
                          ? 'border-zinc-600'
                          : 'border-gray-400'
                      }`}
                    >
                      {showCorrect && <CheckCircle2 className="w-4 h-4 text-white" />}
                      {showIncorrect && <XCircle className="w-4 h-4 text-white" />}
                      {!showFeedback && isSelected && (
                        <div className="w-2 h-2 rounded-full bg-emerald-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-sm ${
                            showCorrect || showIncorrect || isSelected
                              ? 'text-white'
                              : theme === 'dark'
                              ? 'text-zinc-300'
                              : 'text-gray-700'
                          }`}
                        >
                          <span className="opacity-60 mr-2">{option.id}.</span>
                          {option.text}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Feedback */}
        {showFeedback && (
          <div
            className={`mb-6 p-4 rounded-xl border ${
              selectedAnswer === correctAnswer
                ? 'bg-emerald-600/10 border-emerald-600/20'
                : 'bg-red-500/10 border-red-500/20'
            }`}
          >
            <div className="flex items-start gap-3">
              {selectedAnswer === correctAnswer ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              )}
              <div>
                <p
                  className={`text-sm mb-1 ${
                    selectedAnswer === correctAnswer ? 'text-emerald-500' : 'text-red-500'
                  }`}
                >
                  {selectedAnswer === correctAnswer ? 'Correct!' : 'Incorrect'}
                </p>
                <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                  {selectedAnswer === correctAnswer
                    ? 'When the derivative equals zero, the function has a local maximum or minimum at that point.'
                    : 'The correct answer is B. When the derivative equals zero, the function has a local maximum or minimum.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className={`text-sm ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
            {hasSubmitted ? 'Answer submitted' : 'Select an answer to continue'}
          </div>
          {!hasSubmitted ? (
            <button
              onClick={handleSubmit}
              disabled={!selectedAnswer}
              className="px-6 py-2.5 bg-emerald-600 rounded-xl text-white hover:bg-emerald-500 transition-all duration-300 flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Submit Answer
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-6 py-2.5 bg-emerald-600 rounded-xl text-white hover:bg-emerald-500 transition-all duration-300 flex items-center gap-2"
            >
              Next Question
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}