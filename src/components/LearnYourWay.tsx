import { useState, useCallback } from 'react';
import { LearnHeader } from './learn/LearnHeader';
import { LessonEmptyState } from './learn/LessonEmptyState';
import { SettingsPanel } from './learn/SettingsPanel';
import { LearnBottomBar } from './learn/LearnBottomBar';
import { GamifiedMode } from './learn/modes/GamifiedMode';
import { RealWorldMode } from './learn/modes/RealWorldMode';
import { StoryMode } from './learn/modes/StoryMode';
import { FlashcardsMode } from './learn/modes/FlashcardsMode';
import { FileSelectionModal } from './learn/FileSelectionModal';
import { LessonLoadingSequence } from './learn/LessonLoadingSequence';
import { AlertCircle } from 'lucide-react';
import { useNotifications } from '../contexts/NotificationContext';

export type LearnMode = 'gamified' | 'real-world' | 'story' | 'flashcards';

interface LearnYourWayProps {
  theme: 'light' | 'dark';
}

export function LearnYourWay({ theme }: LearnYourWayProps) {
  const [currentMode, setCurrentMode] = useState<LearnMode>('gamified');
  const [pendingMode, setPendingMode] = useState<LearnMode | null>(null);
  const [showModeWarning, setShowModeWarning] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(true);
  const [hasActiveSession, setHasActiveSession] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
  const [modeProgress, setModeProgress] = useState({ current: 0, total: 0 });
  const [fileModalOpen, setFileModalOpen] = useState(false);
  const [lessonPickerOpen, setLessonPickerOpen] = useState(false);
  const [isLoadingLesson, setIsLoadingLesson] = useState(false);
  const [lessonReady, setLessonReady] = useState(false);
  const [currentExample, setCurrentExample] = useState<any>(null);
  const [storySessionEnded, setStorySessionEnded] = useState(false);
  const { addNotification } = useNotifications();

  // Flashcards state
  const [flashcardCount, setFlashcardCount] = useState(20);
  const [flashcardDifficulty, setFlashcardDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');
  const [flashcardShuffle, setFlashcardShuffle] = useState(false);
  const [flashcardSessionEnded, setFlashcardSessionEnded] = useState(false);
  const [flashcardRestartKey, setFlashcardRestartKey] = useState(0);
  const [flashcardProgress, setFlashcardProgress] = useState({
    reviewed: 0,
    knowWell: 0,
    needPractice: 0
  });

  // Store navigation handlers from Real World mode
  const [navigationHandlers, setNavigationHandlers] = useState<{
    onPrevious: () => void;
    onNext: () => void;
    canGoPrevious: boolean;
    canGoNext: boolean;
    onEndSession?: () => void;
  } | null>(null);

  // Real World mode session end handler
  const handleRealWorldSessionEnd = useCallback(() => {
    // Call the onEndSession handler from RealWorldMode if available
    if (navigationHandlers?.onEndSession) {
      navigationHandlers.onEndSession();
    }
  }, [navigationHandlers]);

  // Gamified stats with tracking data
  const [gamifiedStats, setGamifiedStats] = useState({
    xpToday: 0,
    currentLevel: 1,
    xpCurrent: 0,
    xpRequired: 500,
    streak: 0,
    skills: {
      memory: 0,
      accuracy: 0,
      speed: 0,
      consistency: 0
    },
    unlockedBadges: 0,
    xpToNextReward: 125,
    tasksToStreak: 3
  });

  // Performance tracking for real calculations
  const [performanceData, setPerformanceData] = useState({
    correctAnswers: 0,
    totalAnswers: 0,
    recallSuccess: 0,
    recallAttempts: 0,
    performanceScores: [] as number[], // Last 5 scores for consistency
    timingData: [] as { expected: number; actual: number }[]
  });

  const handleModeChange = (newMode: LearnMode) => {
    if (hasActiveSession && newMode !== currentMode) {
      setPendingMode(newMode);
      setShowModeWarning(true);
    } else {
      setCurrentMode(newMode);
      const modeNames: Record<string, string> = {
        'socratic': 'Socratic Q&A',
        'notes': 'Notes Making',
        'real-world': 'Real-World Scenarios',
        'story': 'Story Mode',
        'flashcards': 'Flashcards'
      };
      addNotification({
        title: 'Learning Mode Changed',
        message: `Switched to ${modeNames[newMode]}.`,
        type: 'info',
        tab: 'learn',
      });
    }
  };

  const confirmModeChange = () => {
    if (pendingMode) {
      setCurrentMode(pendingMode);
      setHasActiveSession(false);
      setModeProgress({ current: 0, total: 0 });
      addNotification({
        title: 'Learning Session Ended',
        message: 'Previous session progress was discarded.',
        type: 'warning',
        tab: 'learn',
      });
    }
    setShowModeWarning(false);
    setPendingMode(null);
  };

  const cancelModeChange = () => {
    setShowModeWarning(false);
    setPendingMode(null);
  };

  // Calculate skills based on real formulas
  const calculateSkills = useCallback((data: typeof performanceData) => {
    // Accuracy = Correct answers ÷ total answers × 100
    const accuracy = data.totalAnswers > 0
      ? Math.round((data.correctAnswers / data.totalAnswers) * 100)
      : 0;

    // Memory = Recall success ÷ recall attempts × 100
    const memory = data.recallAttempts > 0
      ? Math.round((data.recallSuccess / data.recallAttempts) * 100)
      : 0;

    // Speed = Expected time ÷ actual time × 100 (cap at 100)
    let speed = 0;
    if (data.timingData.length > 0) {
      const avgExpected = data.timingData.reduce((sum, t) => sum + t.expected, 0) / data.timingData.length;
      const avgActual = data.timingData.reduce((sum, t) => sum + t.actual, 0) / data.timingData.length;
      speed = avgActual > 0 ? Math.min(Math.round((avgExpected / avgActual) * 100), 100) : 0;
    }

    // Consistency = 100 − standard deviation of last 5 performance scores
    let consistency = 0;
    if (data.performanceScores.length === 1) {
      consistency = Math.floor(Math.random() * 3); // 0-2%
    } else if (data.performanceScores.length > 1) {
      const scores = data.performanceScores.slice(-5);
      const mean = scores.reduce((sum, score) => sum + score, 0) / scores.length;
      const variance = scores.reduce((sum, score) => sum + Math.pow(score - mean, 2), 0) / scores.length;
      const stdDev = Math.sqrt(variance);
      consistency = Math.max(0, Math.round(100 - stdDev));
    }

    return { accuracy, memory, speed, consistency };
  }, []);

  // Fix: Use useCallback to memoize callbacks and prevent infinite re-renders
  const handleStart = useCallback(() => {
    setHasActiveSession(true);
    // Initialize stats when lesson starts
    if (currentMode === 'gamified') {
      setGamifiedStats({
        xpToday: 0,
        currentLevel: 1,
        xpCurrent: 0,
        xpRequired: 500,
        streak: 0,
        skills: {
          memory: 0,
          accuracy: 0,
          speed: 0,
          consistency: 0
        },
        unlockedBadges: 0,
        xpToNextReward: 125,
        tasksToStreak: 3
      });
      setPerformanceData({
        correctAnswers: 0,
        totalAnswers: 0,
        recallSuccess: 0,
        recallAttempts: 0,
        performanceScores: [],
        timingData: []
      });
    }
  }, [currentMode]);

  const handleProgress = useCallback((progress: { current: number; total: number }) => {
    setModeProgress(progress);
  }, []);

  // New callback for task completion with performance data
  const handleTaskComplete = useCallback((taskData: {
    correct: boolean;
    isRecall?: boolean;
    expectedTime?: number;
    actualTime?: number;
    performanceScore?: number;
  }) => {
    if (currentMode !== 'gamified') return;

    setPerformanceData(prev => {
      const newData = {
        correctAnswers: prev.correctAnswers + (taskData.correct ? 1 : 0),
        totalAnswers: prev.totalAnswers + 1,
        recallSuccess: prev.recallSuccess + (taskData.isRecall && taskData.correct ? 1 : 0),
        recallAttempts: prev.recallAttempts + (taskData.isRecall ? 1 : 0),
        performanceScores: taskData.performanceScore !== undefined
          ? [...prev.performanceScores, taskData.performanceScore]
          : prev.performanceScores,
        timingData: taskData.expectedTime && taskData.actualTime
          ? [...prev.timingData, { expected: taskData.expectedTime, actual: taskData.actualTime }]
          : prev.timingData
      };

      // Calculate real skills
      const skills = calculateSkills(newData);

      // Update gamified stats
      const tasksCompleted = newData.totalAnswers;
      const baseXP = prev.correctAnswers * 25 + (taskData.correct ? 25 : 5);

      setGamifiedStats(prevStats => ({
        ...prevStats,
        xpToday: baseXP,
        xpCurrent: Math.min(baseXP, prevStats.xpRequired - 1),
        currentLevel: Math.floor(baseXP / 500) + 1,
        streak: Math.min(Math.floor(tasksCompleted / 2), 7),
        skills,
        unlockedBadges: tasksCompleted >= 5 ? 2 : tasksCompleted >= 2 ? 1 : 0,
        xpToNextReward: Math.max(125 - baseXP, 0),
        tasksToStreak: Math.max(5 - (tasksCompleted % 5), 1)
      }));

      return newData;
    });
  }, [currentMode, calculateSkills]);

  const handleLessonSelect = (file: any) => {
    setLessonPickerOpen(false);
    setIsLoadingLesson(true);
    setLessonReady(false);
    setSelectedLesson(file.name);
  };

  const handleLoadingComplete = () => {
    setIsLoadingLesson(false);
    setLessonReady(true);
    addNotification({
      title: 'Lesson Ready',
      message: `"${selectedLesson}" is ready for learning.`,
      type: 'success',
      tab: 'learn',
    });
  };

  const handleChangeLesson = () => {
    if (hasActiveSession) {
      // Show warning if there's an active session
      // For now, just reset
      setHasActiveSession(false);
      setModeProgress({ current: 0, total: 0 });
    }
    setSelectedLesson(null);
    setLessonReady(false);
    addNotification({
      title: 'Lesson Reset',
      message: 'Select a new lesson to continue learning.',
      type: 'info',
      tab: 'learn',
    });
  };

  // Flashcard handlers
  const handleFlashcardCountChange = useCallback((count: number) => {
    setFlashcardCount(count);
    // Reset progress when card count changes
    setFlashcardProgress({
      reviewed: 0,
      knowWell: 0,
      needPractice: 0
    });
  }, []);

  const handleFlashcardProgressUpdate = useCallback((progress: {
    reviewed: number;
    knowWell: number;
    needPractice: number;
  }) => {
    setFlashcardProgress(progress);
  }, []);

  const handleFlashcardDifficultyChange = useCallback((difficulty: 'Easy' | 'Medium' | 'Hard') => {
    setFlashcardDifficulty(difficulty);
    // Reset progress when difficulty changes
    setFlashcardProgress({
      reviewed: 0,
      knowWell: 0,
      needPractice: 0
    });
  }, []);

  const handleFlashcardShuffleChange = useCallback((shuffle: boolean) => {
    setFlashcardShuffle(shuffle);
    // Reset progress when shuffle changes
    setFlashcardProgress({
      reviewed: 0,
      knowWell: 0,
      needPractice: 0
    });
  }, []);

  const handleRestartFlashcards = useCallback(() => {
    // Reset all progress and regenerate deck
    setFlashcardProgress({
      reviewed: 0,
      knowWell: 0,
      needPractice: 0
    });
    // Reshuffle if enabled by toggling shuffle state off and on
    if (flashcardShuffle) {
      setFlashcardShuffle(false);
      setTimeout(() => setFlashcardShuffle(true), 0);
    }
    // Increment restart key to force re-render
    setFlashcardRestartKey(prev => prev + 1);
  }, [flashcardShuffle]);

  const handleEndFlashcardSession = useCallback(() => {
    setFlashcardSessionEnded(true);
  }, []);

  const handleResumeFlashcards = useCallback(() => {
    setFlashcardSessionEnded(false);
    // Reset progress when resuming
    setFlashcardProgress({
      reviewed: 0,
      knowWell: 0,
      needPractice: 0
    });
    // Regenerate deck by toggling shuffle if enabled
    if (flashcardShuffle) {
      setFlashcardShuffle(false);
      setTimeout(() => setFlashcardShuffle(true), 0);
    }
    // Increment restart key to force re-render
    setFlashcardRestartKey(prev => prev + 1);
  }, [flashcardShuffle]);

  const renderMode = () => {
    const commonProps = {
      onStart: handleStart,
      onProgress: handleProgress,
      theme,
    };

    switch (currentMode) {
      case 'gamified':
        return <GamifiedMode {...commonProps} onTaskComplete={handleTaskComplete} />;
      case 'real-world':
        return <RealWorldMode {...commonProps} onCurrentExampleChange={setCurrentExample} onNavigationChange={setNavigationHandlers} onSessionEnd={handleRealWorldSessionEnd} />;
      case 'story':
        return <StoryMode {...commonProps} onNavigationChange={setNavigationHandlers} onSessionEnd={() => setStorySessionEnded(true)} onSessionResume={() => setStorySessionEnded(false)} />;
      case 'flashcards':
        return <FlashcardsMode {...commonProps} cardCount={flashcardCount} difficulty={flashcardDifficulty} shuffle={flashcardShuffle} onProgressUpdate={handleFlashcardProgressUpdate} key={flashcardRestartKey} />;
      default:
        return null;
    }
  };

  return (
    <div className={`h-screen flex flex-col ${theme === 'dark' ? 'bg-zinc-950' : 'bg-gray-50'}`}>
      {/* Top Header */}
      <LearnHeader
        currentMode={currentMode}
        onModeChange={handleModeChange}
        onUploadClick={() => setFileModalOpen(true)}
        onChangeLesson={handleChangeLesson}
        selectedLesson={selectedLesson}
        theme={theme}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Center Canvas */}
        <div className="flex-1 overflow-auto">
          {selectedLesson && lessonReady ? (
            currentMode === 'flashcards' && flashcardSessionEnded ? (
              // Flashcards Blank State
              <div className="h-full flex items-center justify-center p-4">
                <div className="text-center">
                  <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                    You ended the flashcard session.
                  </p>
                  <button
                    onClick={handleResumeFlashcards}
                    className="px-6 py-3 bg-emerald-600 rounded-xl text-white hover:bg-emerald-500 transition-all duration-300"
                  >
                    Resume Flashcards
                  </button>
                </div>
              </div>
            ) : (
              renderMode()
            )
          ) : !selectedLesson ? (
            <LessonEmptyState
              onChooseLesson={() => setLessonPickerOpen(true)}
              theme={theme}
            />
          ) : null}
        </div>

        {/* Right Panel: Settings */}
        {currentMode !== 'real-world' && currentMode !== 'story' && (
          <SettingsPanel
            isOpen={settingsOpen}
            onToggle={() => setSettingsOpen(!settingsOpen)}
            currentMode={currentMode}
            theme={theme}
            lessonState={!selectedLesson ? 'none' : !hasActiveSession ? 'loaded' : 'active'}
            gamifiedStats={gamifiedStats}
            currentExample={currentExample}
            flashcardCount={flashcardCount}
            flashcardDifficulty={flashcardDifficulty}
            flashcardShuffle={flashcardShuffle}
            flashcardProgress={flashcardProgress}
            onFlashcardCountChange={handleFlashcardCountChange}
            onFlashcardDifficultyChange={handleFlashcardDifficultyChange}
            onFlashcardShuffleChange={handleFlashcardShuffleChange}
          />
        )}

        {/* Lesson Loading Sequence */}
        <LessonLoadingSequence
          isLoading={isLoadingLesson}
          onComplete={handleLoadingComplete}
          lessonName={selectedLesson || ''}
        />
      </div>

      {/* Bottom Utility Bar */}
      {selectedLesson && lessonReady && !(currentMode === 'story' && storySessionEnded) && !(currentMode === 'flashcards' && flashcardSessionEnded) && (
        <LearnBottomBar
          lessonName={selectedLesson}
          modeProgress={modeProgress}
          currentMode={currentMode}
          theme={theme}
          onPrevious={navigationHandlers?.onPrevious}
          onNext={navigationHandlers?.onNext}
          canGoPrevious={navigationHandlers?.canGoPrevious}
          canGoNext={navigationHandlers?.canGoNext}
          onEndSession={handleRealWorldSessionEnd}
          onRestartFlashcards={handleRestartFlashcards}
          onEndFlashcardSession={handleEndFlashcardSession}
        />
      )}

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
                  Switching mode will reset the current run. Your progress will not be saved. Continue?
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

      {/* File Selection Modal - For Upload */}
      <FileSelectionModal
        isOpen={fileModalOpen}
        onClose={() => setFileModalOpen(false)}
        onFileSelect={(file) => {
          // Handle file selection logic here
          addNotification({
            title: 'File Uploaded',
            message: `"${file.name}" uploaded successfully.`,
            type: 'success',
            tab: 'learn',
          });
          setFileModalOpen(false);
        }}
        theme={theme}
      />

      {/* Lesson Picker Modal - SharePoint Lessons Only */}
      <FileSelectionModal
        isOpen={lessonPickerOpen}
        onClose={() => setLessonPickerOpen(false)}
        onFileSelect={handleLessonSelect}
        theme={theme}
        filterFolder="Lessons"
      />
    </div>
  );
}