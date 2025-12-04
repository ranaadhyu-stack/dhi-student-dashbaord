import { useState, useEffect } from 'react';
import { Clock, ChevronLeft, ChevronRight, Upload, CheckCircle, Lock } from 'lucide-react';

interface MockTestModeProps {
  onStartAttempt: () => void;
  onStartTimer: () => void;
  onUploadPaper: () => void;
  uploadedFile: any;
  onMockTestMetricsUpdate?: (metrics: MockTestMetrics) => void;
  onEndSession?: () => void;
  onSubmitTest?: () => void;
  theme: 'light' | 'dark';
}

export interface MockTestMetrics {
  sectionA: { attempted: number; total: number };
  sectionB: { attempted: number; total: number };
  sectionC: { attempted: number; total: number };
  totalAttempted: number;
  totalQuestions: number;
  remaining: number;
  markedForReview: number;
}

type Section = 'section-a' | 'section-b' | 'section-c';
type TestState = 'upload' | 'ready' | 'testing' | 'completed';

interface Question {
  id: number;
  section: Section;
  text: string;
  marks: number;
  difficulty: string;
  type: 'mcq' | 'short' | 'long';
  options?: string[];
  answer?: string;
  timeLimit: number; // seconds per question
  locked?: boolean;
}

export function MockTestMode({ onStartAttempt, onStartTimer, onUploadPaper, uploadedFile, onMockTestMetricsUpdate, onEndSession, onSubmitTest, theme }: MockTestModeProps) {
  const [testState, setTestState] = useState<TestState>('upload');
  const [activeSection, setActiveSection] = useState<Section>('section-a');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [globalTimeRemaining, setGlobalTimeRemaining] = useState(3 * 60 * 60); // 3 hours
  const [questionTimeRemaining, setQuestionTimeRemaining] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [unlockedSections, setUnlockedSections] = useState<Section[]>(['section-a']); // Initially only Section A unlocked
  const [showToast, setShowToast] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  // Mock questions data
  const questions: Question[] = [
    // Section A - MCQs (20 questions)
    ...Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      section: 'section-a' as Section,
      text: `What is the derivative of x³ + 2x² - 5x + 7? (Question ${i + 1})`,
      marks: 2,
      difficulty: 'Easy',
      type: 'mcq' as const,
      options: ['3x² + 4x - 5', '3x² + 2x - 5', 'x² + 4x - 5', '3x² + 4x + 7'],
      timeLimit: 90, // 1.5 minutes per MCQ
      locked: false,
    })),
    // Section B - Short Answer (10 questions)
    ...Array.from({ length: 10 }, (_, i) => ({
      id: i + 21,
      section: 'section-b' as Section,
      text: `Solve the equation 2x² + 5x - 3 = 0 using the quadratic formula. (Question ${i + 21})`,
      marks: 4,
      difficulty: 'Medium',
      type: 'short' as const,
      timeLimit: 240, // 4 minutes per short answer
      locked: false,
    })),
    // Section C - Long Answer (5 questions)
    ...Array.from({ length: 5 }, (_, i) => ({
      id: i + 31,
      section: 'section-c' as Section,
      text: `Prove that the sum of angles in a triangle equals 180 degrees. Show all geometric reasoning and include a diagram. (Question ${i + 31})`,
      marks: 10,
      difficulty: 'Hard',
      type: 'long' as const,
      timeLimit: 600, // 10 minutes per long answer
      locked: false,
    })),
  ];

  const [questionsState, setQuestionsState] = useState(questions);
  const currentQuestion = questionsState[currentQuestionIndex];
  const sectionQuestions = questionsState.filter(q => q.section === activeSection);
  const currentSectionIndex = sectionQuestions.findIndex(q => q.id === currentQuestion?.id);

  // Update test state when file is uploaded
  useEffect(() => {
    if (uploadedFile && testState === 'upload') {
      setTestState('ready');
    }
  }, [uploadedFile]);

  // Start test
  const handleStartTest = () => {
    setTestState('testing');
    setQuestionTimeRemaining(questions[0].timeLimit);
    setQuestionsState(questions); // Reset all questions
    setAnswers({}); // Reset all answers
    setCurrentQuestionIndex(0);
    setActiveSection('section-a');
    setGlobalTimeRemaining(3 * 60 * 60); // Reset to 3 hours
    onStartAttempt();
    onStartTimer();
  };

  // Global timer
  useEffect(() => {
    if (testState === 'testing' && globalTimeRemaining > 0) {
      const interval = setInterval(() => {
        setGlobalTimeRemaining((prev) => {
          if (prev <= 1) {
            // Auto-submit when time runs out
            handleAutoSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [testState, globalTimeRemaining]);

  // Question timer
  useEffect(() => {
    if (testState === 'testing' && questionTimeRemaining > 0) {
      const interval = setInterval(() => {
        setQuestionTimeRemaining((prev) => {
          if (prev <= 1) {
            // Lock and auto-move to next question when timer expires
            handleTimerExpired();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [testState, questionTimeRemaining, currentQuestionIndex]);

  const handleTimerExpired = () => {
    // Lock current question
    const updatedQuestions = [...questionsState];
    updatedQuestions[currentQuestionIndex] = { ...updatedQuestions[currentQuestionIndex], locked: true };
    setQuestionsState(updatedQuestions);

    // Move to next question
    if (currentQuestionIndex < questions.length - 1) {
      const nextQuestion = questions[currentQuestionIndex + 1];
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setQuestionTimeRemaining(nextQuestion.timeLimit);
      
      // Auto-switch section if needed
      if (nextQuestion.section !== activeSection) {
        setActiveSection(nextQuestion.section);
      }
    }
  };

  const handleAutoSubmit = () => {
    setTestState('completed');
  };

  const handlePreviousQuestion = () => {
    if (currentSectionIndex > 0) {
      const prevQuestion = sectionQuestions[currentSectionIndex - 1];
      const globalIndex = questionsState.findIndex(q => q.id === prevQuestion.id);
      setCurrentQuestionIndex(globalIndex);
      if (!prevQuestion.locked) {
        setQuestionTimeRemaining(prevQuestion.timeLimit);
      } else {
        setQuestionTimeRemaining(0);
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentSectionIndex < sectionQuestions.length - 1) {
      const nextQuestion = sectionQuestions[currentSectionIndex + 1];
      const globalIndex = questionsState.findIndex(q => q.id === nextQuestion.id);
      setCurrentQuestionIndex(globalIndex);
      if (!nextQuestion.locked) {
        setQuestionTimeRemaining(nextQuestion.timeLimit);
      } else {
        setQuestionTimeRemaining(0);
      }
    }
  };

  const handleMCQSelect = (option: string) => {
    if (!currentQuestion.locked) {
      setAnswers({ ...answers, [currentQuestion.id]: option });
    }
  };

  const handleAnswerChange = (value: string) => {
    if (!currentQuestion.locked) {
      setAnswers({ ...answers, [currentQuestion.id]: value });
    }
  };

  const handleSectionChange = (section: Section) => {
    if (unlockedSections.includes(section)) {
      setActiveSection(section);
      const firstQuestionInSection = questionsState.find(q => q.section === section);
      if (firstQuestionInSection) {
        const index = questionsState.findIndex(q => q.id === firstQuestionInSection.id);
        setCurrentQuestionIndex(index);
        if (!firstQuestionInSection.locked) {
          setQuestionTimeRemaining(firstQuestionInSection.timeLimit);
        } else {
          setQuestionTimeRemaining(0);
        }
      }
    } else {
      // Show warning based on which section is locked
      if (section === 'section-b') {
        setShowToast('Please complete Section A first to unlock Section B.');
        setToastType('error');
      } else if (section === 'section-c') {
        setShowToast('Please complete Section B first to unlock Section C.');
        setToastType('error');
      }
      setTimeout(() => setShowToast(null), 3000); // Auto-hide toast after 3 seconds
    }
  };

  const formatGlobalTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs}h ${mins}m ${secs}s`;
  };

  const getTimerColor = () => {
    if (currentQuestion?.locked || questionTimeRemaining === 0) return '#6b7280'; // gray when locked
    const percentage = (questionTimeRemaining / currentQuestion?.timeLimit) * 100;
    if (percentage > 50) return '#10b981'; // green
    if (percentage > 25) return '#f59e0b'; // orange
    return '#ef4444'; // red
  };

  const getTimerStrokeDasharray = () => {
    if (currentQuestion?.locked || questionTimeRemaining === 0) return '0 283';
    const percentage = (questionTimeRemaining / currentQuestion?.timeLimit) * 100;
    const circumference = 2 * Math.PI * 45;
    return `${(percentage / 100) * circumference} ${circumference}`;
  };

  // Calculate and update metrics whenever answers change or test state changes
  useEffect(() => {
    if (testState === 'testing' && onMockTestMetricsUpdate) {
      const sectionAQuestions = questions.filter(q => q.section === 'section-a');
      const sectionBQuestions = questions.filter(q => q.section === 'section-b');
      const sectionCQuestions = questions.filter(q => q.section === 'section-c');

      const sectionAAttempted = sectionAQuestions.filter(q => answers[q.id] && answers[q.id].trim() !== '').length;
      const sectionBAttempted = sectionBQuestions.filter(q => answers[q.id] && answers[q.id].trim() !== '').length;
      const sectionCAttempted = sectionCQuestions.filter(q => answers[q.id] && answers[q.id].trim() !== '').length;

      const totalAttempted = sectionAAttempted + sectionBAttempted + sectionCAttempted;
      const totalQuestions = questions.length;

      onMockTestMetricsUpdate({
        sectionA: { attempted: sectionAAttempted, total: sectionAQuestions.length },
        sectionB: { attempted: sectionBAttempted, total: sectionBQuestions.length },
        sectionC: { attempted: sectionCAttempted, total: sectionCQuestions.length },
        totalAttempted,
        totalQuestions,
        remaining: totalQuestions - totalAttempted,
        markedForReview: 0, // Not implemented in this version
      });
    }
  }, [answers, testState, onMockTestMetricsUpdate]);

  // Reset metrics when not testing
  useEffect(() => {
    if (testState === 'upload' || testState === 'ready') {
      if (onMockTestMetricsUpdate) {
        // Reset to zero
        onMockTestMetricsUpdate({
          sectionA: { attempted: 0, total: 20 },
          sectionB: { attempted: 0, total: 10 },
          sectionC: { attempted: 0, total: 5 },
          totalAttempted: 0,
          totalQuestions: 35,
          remaining: 35,
          markedForReview: 0,
        });
      }
    }
  }, [testState, onMockTestMetricsUpdate]);

  // Reset to upload screen when uploadedFile becomes null (after End Session or Submit)
  useEffect(() => {
    if (!uploadedFile && testState !== 'upload') {
      // Reset everything back to upload state
      setTestState('upload');
      setAnswers({});
      setCurrentQuestionIndex(0);
      setActiveSection('section-a');
      setGlobalTimeRemaining(3 * 60 * 60);
      setQuestionTimeRemaining(0);
      setQuestionsState(questions);
    }
  }, [uploadedFile]);

  // Check for section completion and unlock next sections
  useEffect(() => {
    if (testState === 'testing') {
      const sectionAQuestions = questions.filter(q => q.section === 'section-a');
      const sectionBQuestions = questions.filter(q => q.section === 'section-b');
      
      // Count attempts (answers) and locked questions (auto-locked by timer)
      const sectionAAttemptedOrLocked = sectionAQuestions.filter(q => 
        (answers[q.id] && answers[q.id].trim() !== '') || questionsState.find(qs => qs.id === q.id)?.locked
      ).length;
      
      const sectionBAttemptedOrLocked = sectionBQuestions.filter(q => 
        (answers[q.id] && answers[q.id].trim() !== '') || questionsState.find(qs => qs.id === q.id)?.locked
      ).length;
      
      // Unlock Section B when all Section A questions are attempted or locked
      if (sectionAAttemptedOrLocked === sectionAQuestions.length && !unlockedSections.includes('section-b')) {
        setUnlockedSections([...unlockedSections, 'section-b']);
        setShowToast('Section B unlocked. Continue your mock test.');
        setToastType('success');
        setTimeout(() => setShowToast(null), 3000);
      }
      
      // Unlock Section C when all Section B questions are attempted or locked
      if (sectionBAttemptedOrLocked === sectionBQuestions.length && unlockedSections.includes('section-b') && !unlockedSections.includes('section-c')) {
        setUnlockedSections([...unlockedSections, 'section-c']);
        setShowToast('Section C unlocked. Continue your mock test.');
        setToastType('success');
        setTimeout(() => setShowToast(null), 3000);
      }
    }
  }, [answers, questionsState, testState, unlockedSections]);

  // Upload Screen
  if (testState === 'upload') {
    return (
      <div className={`h-full flex items-center justify-center ${theme === 'dark' ? 'bg-zinc-950' : 'bg-gray-50'}`}>
        <div className="text-center max-w-lg px-6">
          <h1 className={`text-3xl mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Ready for your Real Exam Simulation?
          </h1>
          <button
            onClick={onUploadPaper}
            className="px-8 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-500 transition-all duration-300 flex items-center gap-2 mx-auto"
          >
            <Upload className="w-5 h-5" />
            Upload Mock Paper
          </button>
        </div>
      </div>
    );
  }

  // Ready Screen (After Upload)
  if (testState === 'ready') {
    return (
      <div className={`h-full flex items-center justify-center ${theme === 'dark' ? 'bg-zinc-950' : 'bg-gray-50'}`}>
        <div className="text-center max-w-lg px-6">
          <h1 className={`text-3xl mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Ready for your Real Exam Simulation?
          </h1>
          <div className={`mb-6 p-4 rounded-xl ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'} border`}>
            <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'} mb-1`}>Paper Name:</p>
            <p className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{uploadedFile?.name || 'Mathematics Mock Test – Set 1'}</p>
          </div>
          <button
            onClick={handleStartTest}
            className="px-8 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-500 transition-all duration-300"
          >
            Start Test
          </button>
        </div>
      </div>
    );
  }

  // Completed Screen
  if (testState === 'completed') {
    return (
      <div className={`h-full flex items-center justify-center ${theme === 'dark' ? 'bg-zinc-950' : 'bg-gray-50'}`}>
        <div className="text-center max-w-lg px-6">
          <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-6" />
          <h1 className={`text-3xl mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Mock Test Completed — Thank you!
          </h1>
          <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
            Your results are being processed and will appear in the Insights panel.
          </p>
        </div>
      </div>
    );
  }

  // Testing Screen
  return (
    <div className="h-full flex flex-col">
      {/* Top Bar - Only Global Timer */}
      <div className={`border-b ${theme === 'dark' ? 'border-zinc-800 bg-zinc-900' : 'border-gray-200 bg-white'} px-6 py-3 flex items-center justify-between`}>
        <div className="flex items-center gap-2">
          <Clock className={`w-4 h-4 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`} />
          <span className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>Time Remaining:</span>
          <span className={`text-sm tabular-nums ${globalTimeRemaining < 600 ? 'text-red-500' : 'text-emerald-500'}`}>
            {formatGlobalTime(globalTimeRemaining)}
          </span>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-900'}>
            {uploadedFile?.name || 'Mathematics Mock Test – Set 1'}
          </span>
        </div>
      </div>

      {/* Section Tabs */}
      <div className={`border-b ${theme === 'dark' ? 'border-zinc-800 bg-zinc-950' : 'border-gray-200 bg-gray-50'} px-6 flex gap-2`}>
        <button
          onClick={() => handleSectionChange('section-a')}
          className={`px-4 py-3 text-sm transition-all duration-300 border-b-2 flex items-center gap-2 ${
            activeSection === 'section-a'
              ? theme === 'dark'
                ? 'border-emerald-600 text-white'
                : 'border-emerald-600 text-gray-900'
              : theme === 'dark'
              ? 'border-transparent text-zinc-500 hover:text-zinc-300'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Section A – MCQs
        </button>
        <button
          onClick={() => handleSectionChange('section-b')}
          disabled={!unlockedSections.includes('section-b')}
          className={`px-4 py-3 text-sm transition-all duration-300 border-b-2 flex items-center gap-2 ${
            !unlockedSections.includes('section-b')
              ? theme === 'dark'
                ? 'border-transparent text-zinc-700 opacity-50 cursor-not-allowed'
                : 'border-transparent text-gray-400 opacity-50 cursor-not-allowed'
              : activeSection === 'section-b'
              ? theme === 'dark'
                ? 'border-emerald-600 text-white'
                : 'border-emerald-600 text-gray-900'
              : theme === 'dark'
              ? 'border-transparent text-zinc-500 hover:text-zinc-300'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          {!unlockedSections.includes('section-b') && <Lock className="w-3 h-3" />}
          Section B – Short Answer
        </button>
        <button
          onClick={() => handleSectionChange('section-c')}
          disabled={!unlockedSections.includes('section-c')}
          className={`px-4 py-3 text-sm transition-all duration-300 border-b-2 flex items-center gap-2 ${
            !unlockedSections.includes('section-c')
              ? theme === 'dark'
                ? 'border-transparent text-zinc-700 opacity-50 cursor-not-allowed'
                : 'border-transparent text-gray-400 opacity-50 cursor-not-allowed'
              : activeSection === 'section-c'
              ? theme === 'dark'
                ? 'border-emerald-600 text-white'
                : 'border-emerald-600 text-gray-900'
              : theme === 'dark'
              ? 'border-transparent text-zinc-500 hover:text-zinc-300'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          {!unlockedSections.includes('section-c') && <Lock className="w-3 h-3" />}
          Section C – Long Answer
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 p-4 sm:p-6 overflow-auto">
        {/* Left: Question with Timer */}
        <div className={`p-6 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'} border rounded-2xl flex flex-col`}>
          {/* Question */}
          <div className="mb-6">
            <span className={`text-xs uppercase tracking-wider ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
              QUESTION {currentQuestion.id}
            </span>
            <div className="flex items-center gap-2 mt-1 mb-4">
              <span className={`text-xs ${theme === 'dark' ? 'text-zinc-600' : 'text-gray-400'}`}>
                {currentQuestion.marks} marks
              </span>
              <span className={`text-xs ${theme === 'dark' ? 'text-zinc-600' : 'text-gray-400'}`}>•</span>
              <span className={`text-xs ${theme === 'dark' ? 'text-zinc-600' : 'text-gray-400'}`}>
                {currentQuestion.difficulty} difficulty
              </span>
            </div>

            <h3 className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {currentQuestion.text}
            </h3>
          </div>

          {/* Countdown Circle */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="relative w-32 h-32 mb-8">
              <svg className="transform -rotate-90 w-32 h-32">
                <circle
                  cx="64"
                  cy="64"
                  r="45"
                  stroke={theme === 'dark' ? '#27272a' : '#e5e7eb'}
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="45"
                  stroke={getTimerColor()}
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={getTimerStrokeDasharray()}
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                {currentQuestion.locked ? (
                  <span className={`text-sm ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>Locked</span>
                ) : (
                  <span className={`text-2xl tabular-nums ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {Math.floor(questionTimeRemaining / 60)}:{(questionTimeRemaining % 60).toString().padStart(2, '0')}
                  </span>
                )}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePreviousQuestion}
                disabled={currentSectionIndex === 0}
                className={`px-4 py-2 rounded-xl text-sm flex items-center gap-2 transition-all duration-300 ${
                  currentSectionIndex === 0
                    ? theme === 'dark'
                      ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed opacity-50'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-50'
                    : theme === 'dark'
                    ? 'bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-750'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>
              <button
                onClick={handleNextQuestion}
                disabled={currentSectionIndex === sectionQuestions.length - 1}
                className={`px-4 py-2 rounded-xl text-sm flex items-center gap-2 transition-all duration-300 ${
                  currentSectionIndex === sectionQuestions.length - 1
                    ? theme === 'dark'
                      ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed opacity-50'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-50'
                    : theme === 'dark'
                    ? 'bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-750'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right: Answer Area - No Number Grids */}
        <div className={`p-6 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'} border rounded-2xl flex flex-col`}>
          {/* Section A - MCQs - Only 4 Options */}
          {currentQuestion.type === 'mcq' && (
            <>
              <div className="mb-6">
                <h4 className={`mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Select Your Answer</h4>
                <p className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                  Choose one option below
                </p>
              </div>

              <div className="space-y-3 flex-1">
                {currentQuestion.options?.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleMCQSelect(option)}
                    disabled={currentQuestion.locked}
                    className={`w-full p-4 rounded-xl text-left transition-all duration-300 ${
                      currentQuestion.locked
                        ? theme === 'dark'
                          ? 'bg-zinc-800 border border-zinc-700 text-zinc-500 cursor-not-allowed'
                          : 'bg-gray-100 border border-gray-200 text-gray-500 cursor-not-allowed'
                        : answers[currentQuestion.id] === option
                        ? 'bg-emerald-600 text-white'
                        : theme === 'dark'
                        ? 'bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-750'
                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span className="mr-3">{String.fromCharCode(65 + index)}.</span>
                    {option}
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Section B - Short Answer - Small Text Box */}
          {currentQuestion.type === 'short' && (
            <>
              <div className="mb-4">
                <h4 className={`mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Your Answer</h4>
                <p className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                  Provide a concise answer (200-500 characters)
                </p>
              </div>

              <textarea
                value={answers[currentQuestion.id] || ''}
                onChange={(e) => handleAnswerChange(e.target.value)}
                disabled={currentQuestion.locked}
                placeholder="Write your answer here..."
                maxLength={500}
                rows={6}
                className={`px-4 py-3 ${theme === 'dark' ? 'bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-zinc-700' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-gray-300'} border rounded-xl resize-none focus:outline-none transition-all duration-300 ${
                  currentQuestion.locked ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              />

              <div className="flex items-center justify-between mt-2">
                <span className={`text-xs ${theme === 'dark' ? 'text-zinc-600' : 'text-gray-400'}`}>
                  {(answers[currentQuestion.id] || '').length} / 500 characters
                </span>
              </div>
            </>
          )}

          {/* Section C - Long Answer - Large Text Area */}
          {currentQuestion.type === 'long' && (
            <>
              <div className="mb-4">
                <h4 className={`mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Your Answer</h4>
                <p className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                  Provide a detailed response (2000-3000 characters)
                </p>
              </div>

              <textarea
                value={answers[currentQuestion.id] || ''}
                onChange={(e) => handleAnswerChange(e.target.value)}
                disabled={currentQuestion.locked}
                placeholder="Write your detailed answer here..."
                maxLength={3000}
                className={`flex-1 px-4 py-3 ${theme === 'dark' ? 'bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-zinc-700' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-gray-300'} border rounded-xl resize-none focus:outline-none transition-all duration-300 ${
                  currentQuestion.locked ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              />

              <div className="flex items-center justify-between mt-2">
                <span className={`text-xs ${theme === 'dark' ? 'text-zinc-600' : 'text-gray-400'}`}>
                  {(answers[currentQuestion.id] || '').length} / 3000 characters
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Toast for Section Lock/Unlock */}
      {showToast && (
        <div className={`fixed bottom-4 right-4 px-4 py-2 text-white rounded-lg shadow-lg transition-all duration-300 ${toastType === 'success' ? 'bg-emerald-500' : 'bg-red-500'}`}>
          {showToast}
        </div>
      )}
    </div>
  );
}