import { useState } from 'react';
import { ExamHeader } from './exam/ExamHeader';
import { ExamLibraryPanel } from './exam/ExamLibraryPanel';
import { InsightsPanel, MCQSessionMetrics, AnswerWritingMetrics } from './exam/InsightsPanel';
import { ExamBottomBar } from './exam/ExamBottomBar';
import { PastPapersMode } from './exam/modes/PastPapersMode';
import { MCQMode } from './exam/modes/MCQMode';
import { MockTestMode, MockTestMetrics } from './exam/modes/MockTestMode';
import { AnswerWritingMode } from './exam/modes/AnswerWritingMode';

import { FileSelectionModal } from './learn/FileSelectionModal';
import { AlertCircle } from 'lucide-react';
import { useNotifications } from '../contexts/NotificationContext';

export type ExamMode = 'past-papers' | 'mcq' | 'mock-test' | 'answer-writing';

interface ExamPrepProps {
  theme: 'light' | 'dark';
}

export function ExamPrep({ theme }: ExamPrepProps) {
  const [currentMode, setCurrentMode] = useState<ExamMode>('past-papers');
  const [pendingMode, setPendingMode] = useState<ExamMode | null>(null);
  const [showModeWarning, setShowModeWarning] = useState(false);
  const [libraryOpen, setLibraryOpen] = useState(true);
  const [insightsOpen, setInsightsOpen] = useState(true);
  const [hasActiveAttempt, setHasActiveAttempt] = useState(false);
  const [timerActive, setTimerActive] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [fileModalOpen, setFileModalOpen] = useState(false);
  const [uploadedExamFile, setUploadedExamFile] = useState<any>(null);
  const [usedMCQFiles, setUsedMCQFiles] = useState<string[]>([]);
  const [showFileReuseWarning, setShowFileReuseWarning] = useState(false);
  const [pendingFile, setPendingFile] = useState<any>(null);
  const [mcqSessionState, setMcqSessionState] = useState<'idle' | 'file-selected' | 'practicing'>('idle');
  const [mcqMetrics, setMcqMetrics] = useState<MCQSessionMetrics>({
    accuracy: 0,
    topicPerformance: [],
    avgTime: 0,
    fastestTime: 0,
    slowestTime: 0,
    questionsAnswered: 0,
  });
  const [mockTestMetrics, setMockTestMetrics] = useState<MockTestMetrics>({
    sectionA: { attempted: 0, total: 20 },
    sectionB: { attempted: 0, total: 10 },
    sectionC: { attempted: 0, total: 5 },
    totalAttempted: 0,
    totalQuestions: 35,
    remaining: 35,
    markedForReview: 0,
  });
  const [answerWritingMetrics, setAnswerWritingMetrics] = useState<AnswerWritingMetrics>({
    hasAnalyzed: false,
    structureScore: 0,
    clarityScore: 0,
    relevanceScore: 0,
    missingPoints: [],
    strengths: [],
  });
  const [showEndSessionModal, setShowEndSessionModal] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const { addNotification } = useNotifications();

  const handleModeChange = (newMode: ExamMode) => {
    if (hasActiveAttempt && newMode !== currentMode) {
      setPendingMode(newMode);
      setShowModeWarning(true);
    } else {
      setCurrentMode(newMode);
      const modeNames = {
        'past-papers': 'Past Papers',
        'mcq': 'MCQ Practice',
        'mock-test': 'Mock Test',
        'answer-writing': 'Answer Writing'
      };
      addNotification({
        title: 'Exam Mode Changed',
        message: `Switched to ${modeNames[newMode]} mode.`,
        type: 'info',
        tab: 'exam',
      });
    }
  };

  const confirmModeChange = () => {
    if (pendingMode) {
      setCurrentMode(pendingMode);
      setHasActiveAttempt(false);
      setTimerActive(false);
      setTimeElapsed(0);
      addNotification({
        title: 'Exam Session Ended',
        message: 'Previous attempt was discarded and mode changed.',
        type: 'warning',
        tab: 'exam',
      });
    }
    setShowModeWarning(false);
    setPendingMode(null);
  };

  const cancelModeChange = () => {
    setShowModeWarning(false);
    setPendingMode(null);
  };

  const handleUploadClick = () => {
    if (currentMode === 'past-papers') {
      // Don't open modal for past-papers mode
      return;
    }
    setFileModalOpen(true);
  };

  const handleFileSelect = (file: any) => {
    if (currentMode === 'mcq' && usedMCQFiles.includes(file.name)) {
      setPendingFile(file);
      setShowFileReuseWarning(true);
      return;
    }
    setUploadedExamFile(file);
    setFileModalOpen(false);
    
    const modeNames = {
      'past-papers': 'Past Papers',
      'mcq': 'MCQ Practice',
      'mock-test': 'Mock Test',
      'answer-writing': 'Answer Writing'
    };
    
    addNotification({
      title: 'File Uploaded Successfully',
      message: `"${file.name}" has been added to ${modeNames[currentMode]}.`,
      type: 'success',
      tab: 'exam',
    });
  };

  const confirmFileReuse = () => {
    if (pendingFile) {
      setUploadedExamFile(pendingFile);
      setFileModalOpen(false);
      setUsedMCQFiles([...usedMCQFiles, pendingFile.name]);
      
      const modeNames = {
        'past-papers': 'Past Papers',
        'mcq': 'MCQ Practice',
        'mock-test': 'Mock Test',
        'answer-writing': 'Answer Writing',
        'institutional': 'Institutional Exam'
      };
      
      addNotification({
        title: 'File Uploaded Successfully',
        message: `"${pendingFile.name}" has been added to ${modeNames[currentMode]}.`,
        type: 'success',
        tab: 'exam',
      });
    }
    setShowFileReuseWarning(false);
    setPendingFile(null);
  };

  const cancelFileReuse = () => {
    setShowFileReuseWarning(false);
    setPendingFile(null);
  };

  const handleEndSession = () => {
    setShowEndSessionModal(true);
  };

  const confirmEndSession = () => {
    setShowEndSessionModal(false);
    
    if (currentMode === 'mock-test') {
      // Mock Test specific reset: Stop timers, discard progress, reset to upload screen
      setUploadedExamFile(null);
      setHasActiveAttempt(false);
      setTimerActive(false);
      setTimeElapsed(0);
      
      // Reset insights to zero
      setMockTestMetrics({
        sectionA: { attempted: 0, total: 20 },
        sectionB: { attempted: 0, total: 10 },
        sectionC: { attempted: 0, total: 5 },
        totalAttempted: 0,
        totalQuestions: 35,
        remaining: 35,
        markedForReview: 0,
      });
      
      addNotification({
        title: 'Session Ended',
        message: 'Mock test session ended. No summary generated.',
        type: 'info',
        tab: 'exam',
      });
    } else if (currentMode === 'answer-writing') {
      // Answer Writing specific reset: Clear file, reset to upload screen
      setUploadedExamFile(null);
      setHasActiveAttempt(false);
      setTimerActive(false);
      setTimeElapsed(0);
      
      // Reset insights to zero
      setAnswerWritingMetrics({
        hasAnalyzed: false,
        structureScore: 0,
        clarityScore: 0,
        relevanceScore: 0,
        missingPoints: [],
        strengths: [],
      });
      
      addNotification({
        title: 'Session Ended',
        message: 'Answer writing session ended.',
        type: 'info',
        tab: 'exam',
      });
    } else {
      // Other modes behavior
      setHasActiveAttempt(false);
      setTimerActive(false);
      setTimeElapsed(0);
      
      addNotification({
        title: 'Session Ended',
        message: 'Your active session has been terminated.',
        type: 'info',
        tab: 'exam',
      });
    }
  };

  const cancelEndSession = () => {
    setShowEndSessionModal(false);
  };

  const handleSubmitTest = () => {
    setShowSubmitModal(true);
  };

  const confirmSubmitTest = () => {
    setShowSubmitModal(false);
    
    // Reset Mock Test to start screen
    setUploadedExamFile(null);
    setHasActiveAttempt(false);
    setTimerActive(false);
    setTimeElapsed(0);
    
    // Reset insights to zero
    setMockTestMetrics({
      sectionA: { attempted: 0, total: 20 },
      sectionB: { attempted: 0, total: 10 },
      sectionC: { attempted: 0, total: 5 },
      totalAttempted: 0,
      totalQuestions: 35,
      remaining: 35,
      markedForReview: 0,
    });
    
    // Notification about AI evaluation and SharePoint save
    const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    const fileName = `MockTest_${uploadedExamFile?.name || 'Mathematics'}_${today}`;
    
    addNotification({
      title: 'Test Submitted Successfully',
      message: `Your exam has been submitted. Summary saved as "${fileName}" in SharePoint.`,
      type: 'success',
      tab: 'exam',
    });
  };

  const cancelSubmitTest = () => {
    setShowSubmitModal(false);
  };

  const getModeLabel = (mode: ExamMode): string => {
    const labels: Record<ExamMode, string> = {
      'past-papers': 'Past Papers',
      'mcq': 'MCQ Practice',
      'mock-test': 'Mock Test',
      'answer-writing': 'Answer Writing',
    };
    return labels[mode];
  };

  const renderMode = () => {
    switch (currentMode) {
      case 'past-papers':
        return <PastPapersMode onStartAttempt={() => setHasActiveAttempt(true)} theme={theme} />;
      case 'mcq':
        return (
          <MCQMode 
            onStartAttempt={() => setHasActiveAttempt(true)} 
            onSessionStateChange={setMcqSessionState}
            onMetricsUpdate={setMcqMetrics}
            uploadedFile={uploadedExamFile} 
            theme={theme} 
          />
        );
      case 'mock-test':
        return (
          <MockTestMode 
            onStartAttempt={() => setHasActiveAttempt(true)} 
            onStartTimer={() => setTimerActive(true)} 
            onUploadPaper={handleUploadClick}
            uploadedFile={uploadedExamFile}
            onMockTestMetricsUpdate={setMockTestMetrics}
            theme={theme} 
          />
        );
      case 'answer-writing':
        return (
          <AnswerWritingMode 
            onStartAttempt={() => setHasActiveAttempt(true)} 
            onAnswerWritingMetricsUpdate={setAnswerWritingMetrics}
            onUploadClick={handleUploadClick}
            uploadedFile={uploadedExamFile}
            theme={theme} 
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={`h-screen flex flex-col ${theme === 'dark' ? 'bg-zinc-950' : 'bg-gray-50'}`}>
      {/* Top Header */}
      <ExamHeader
        currentMode={currentMode}
        onModeChange={handleModeChange}
        onUploadClick={handleUploadClick}
        theme={theme}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Panel: Exam Library */}
        <ExamLibraryPanel isOpen={libraryOpen} onToggle={() => setLibraryOpen(!libraryOpen)} theme={theme} />

        {/* Center Canvas */}
        <div className="flex-1 overflow-auto">
          {renderMode()}
        </div>

        {/* Right Panel: Insights */}
        <InsightsPanel
          isOpen={insightsOpen}
          onToggle={() => setInsightsOpen(!insightsOpen)}
          currentMode={currentMode}
          mcqSessionState={mcqSessionState}
          mcqMetrics={mcqMetrics}
          mockTestMetrics={mockTestMetrics}
          answerWritingMetrics={answerWritingMetrics}
          theme={theme}
        />
      </div>

      {/* Bottom Utility Bar */}
      <ExamBottomBar
        hasActiveAttempt={hasActiveAttempt}
        timerActive={timerActive}
        timeElapsed={timeElapsed}
        currentMode={currentMode}
        onEndMCQSession={handleEndSession}
        onSubmitTest={handleSubmitTest}
        theme={theme}
      />

      {/* Mode Switch Warning Modal */}
      {showModeWarning && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
          <div className={`${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'} border rounded-2xl p-6 max-w-md w-full`}>
            <div className="flex items-start gap-4 mb-6">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <h3 className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-2`}>Switch Mode?</h3>
                <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                  If you leave this mode, your current attempt will be expired and you'll lose your progress. Do you want to continue?
                </p>
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <button
                onClick={cancelModeChange}
                className={`px-4 py-2 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-750' : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200'} border rounded-xl text-sm transition-all duration-300`}
              >
                Cancel
              </button>
              <button
                onClick={confirmModeChange}
                className="px-4 py-2 bg-emerald-600 rounded-xl text-sm text-white hover:bg-emerald-500 transition-all duration-300"
              >
                Yes, Switch Mode
              </button>
            </div>
          </div>
        </div>
      )}

      {/* File Reuse Warning Modal */}
      {showFileReuseWarning && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
          <div className={`${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'} border rounded-2xl p-6 max-w-md w-full`}>
            <div className="flex items-start gap-4 mb-6">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <h3 className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-2`}>You've practised with this file before</h3>
                <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                  You already used this file for MCQ practice. Continuing will start a new practice session and may use additional credits. Do you still want to continue?
                </p>
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <button
                onClick={cancelFileReuse}
                className={`px-4 py-2 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-750' : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200'} border rounded-xl text-sm transition-all duration-300`}
              >
                Choose Another File
              </button>
              <button
                onClick={confirmFileReuse}
                className="px-4 py-2 bg-emerald-600 rounded-xl text-sm text-white hover:bg-emerald-500 transition-all duration-300"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* End MCQ Session Modal */}
      {showEndSessionModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
          <div className={`${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'} border rounded-2xl p-6 max-w-md w-full`}>
            <div className="flex items-start gap-4 mb-6">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <h3 className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-2`}>
                  {currentMode === 'mock-test' ? 'End Mock Test?' : 'End Session?'}
                </h3>
                <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                  {currentMode === 'mock-test'
                    ? 'Are you sure you want to end the exam intentionally?'
                    : 'Ending this session will discard your active progress and return you to the starting screen for this mode. Are you sure?'}
                </p>
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <button
                onClick={cancelEndSession}
                className={`px-4 py-2 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-750' : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200'} border rounded-xl text-sm transition-all duration-300`}
              >
                No
              </button>
              <button
                onClick={confirmEndSession}
                className="px-4 py-2 bg-emerald-600 rounded-xl text-sm text-white hover:bg-emerald-500 transition-all duration-300"
              >
                Yes, End Exam
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Submit Test Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
          <div className={`${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'} border rounded-2xl p-6 max-w-md w-full`}>
            <div className="flex items-start gap-4 mb-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-5 h-5 text-emerald-500" />
              </div>
              <div>
                <h3 className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-2`}>Submit Exam</h3>
                <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                  Your exam has been submitted. AI evaluation will be available shortly in SharePoint.
                </p>
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <button
                onClick={confirmSubmitTest}
                className="px-6 py-2 bg-emerald-600 rounded-xl text-sm text-white hover:bg-emerald-500 transition-all duration-300"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* File Selection Modal */}
      <FileSelectionModal
        isOpen={fileModalOpen}
        onClose={() => setFileModalOpen(false)}
        onFileSelect={handleFileSelect}
        theme={theme}
      />
    </div>
  );
}