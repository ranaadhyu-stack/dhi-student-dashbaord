import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Trophy, Flag } from 'lucide-react';

interface GamifiedModeProps {
  onStart: () => void;
  onProgress: (progress: { current: number; total: number }) => void;
  onTaskComplete?: (taskData: {
    correct: boolean;
    isRecall?: boolean;
    expectedTime?: number;
    actualTime?: number;
    performanceScore?: number;
  }) => void;
  theme: 'light' | 'dark';
}

export function GamifiedMode({ onStart, onProgress, onTaskComplete, theme }: GamifiedModeProps) {
  const [currentTask, setCurrentTask] = useState(1);
  const [answer, setAnswer] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [xpGained, setXpGained] = useState(0);
  const [startTime, setStartTime] = useState<number>(Date.now());

  const totalTasks = 20;

  useEffect(() => {
    onStart();
  }, []); // Only call onStart once on mount

  useEffect(() => {
    onProgress({ current: currentTask - 1, total: totalTasks });
  }, [currentTask]); // Only update when currentTask changes

  const tasks = [
    {
      type: 'fill-blank',
      question: 'Photosynthesis occurs in the _______ of plant cells.',
      correctAnswer: 'chloroplasts',
      xp: 25,
      expectedTime: 30, // 30 seconds expected
      isRecall: false
    },
    {
      type: 'choose',
      question: 'Which gas do plants absorb during photosynthesis?',
      options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Hydrogen'],
      correctAnswer: 'Carbon Dioxide',
      xp: 20,
      expectedTime: 20,
      isRecall: false
    },
  ];

  const currentTaskData = tasks[0]; // Simplified for demo

  const handleSubmit = () => {
    if (!hasSubmitted) {
      const isCorrect = answer.toLowerCase().trim() === currentTaskData.correctAnswer.toLowerCase();
      const actualTime = (Date.now() - startTime) / 1000; // in seconds
      
      setHasSubmitted(true);
      if (isCorrect) {
        setFeedback('Correct! Great job!');
        setXpGained(currentTaskData.xp);
      } else {
        setFeedback(`Not quite. The correct answer is: ${currentTaskData.correctAnswer}`);
        setXpGained(5); // Partial credit
      }

      // Calculate performance score (0-100 based on correctness and speed)
      let performanceScore = isCorrect ? 100 : 20;
      if (isCorrect && currentTaskData.expectedTime) {
        const speedFactor = Math.min(currentTaskData.expectedTime / actualTime, 1.5);
        performanceScore = Math.min(Math.round(100 * speedFactor), 100);
      }

      // Report task completion
      if (onTaskComplete) {
        onTaskComplete({
          correct: isCorrect,
          isRecall: currentTaskData.isRecall,
          expectedTime: currentTaskData.expectedTime,
          actualTime,
          performanceScore
        });
      }
    }
  };

  const handleNext = () => {
    setCurrentTask(currentTask + 1);
    setAnswer('');
    setHasSubmitted(false);
    setFeedback('');
    setXpGained(0);
    setStartTime(Date.now()); // Reset timer for next task
  };

  return (
    <div className="h-full flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-3xl w-full">
        {/* Milestone Progress Tracker */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className={`text-sm ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>Task {currentTask} of {totalTasks}</span>
            <span className="text-sm text-emerald-500">{Math.round((currentTask / totalTasks) * 100)}% Complete</span>
          </div>
          
          {/* Milestone Tracker Row */}
          <div className="flex items-center justify-between gap-1">
            {Array.from({ length: totalTasks }).map((_, index) => {
              const taskNumber = index + 1;
              const isMilestone = taskNumber % 5 === 0;
              const isCompleted = taskNumber < currentTask;
              const isCurrent = taskNumber === currentTask;
              
              if (isMilestone) {
                // Milestone Flag
                return (
                  <div
                    key={taskNumber}
                    className="relative flex items-center justify-center"
                  >
                    <motion.div
                      animate={isCompleted ? {
                        boxShadow: [
                          '0 0 0px rgba(16, 185, 129, 0)',
                          '0 0 12px rgba(16, 185, 129, 0.4)',
                          '0 0 0px rgba(16, 185, 129, 0)'
                        ]
                      } : {}}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut'
                      }}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                        isCompleted
                          ? 'bg-emerald-600 text-white'
                          : isCurrent
                          ? `${theme === 'dark' ? 'bg-zinc-800 border-2 border-emerald-500' : 'bg-white border-2 border-emerald-500'} ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-400'}`
                          : `${theme === 'dark' ? 'bg-zinc-900 border border-zinc-800' : 'bg-gray-100 border border-gray-200'} ${theme === 'dark' ? 'text-zinc-600' : 'text-gray-400'}`
                      }`}
                      style={isCurrent ? {
                        boxShadow: '0 0 16px rgba(16, 185, 129, 0.5)'
                      } : {}}
                    >
                      <Flag className="w-4 h-4" />
                    </motion.div>
                  </div>
                );
              } else {
                // Dot Marker
                return (
                  <div
                    key={taskNumber}
                    className="relative flex items-center justify-center"
                  >
                    <motion.div
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        isCompleted
                          ? 'bg-emerald-600'
                          : isCurrent
                          ? 'bg-emerald-500 ring-4 ring-emerald-500/30'
                          : `${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-300'}`
                      }`}
                      style={isCurrent ? {
                        boxShadow: '0 0 12px rgba(16, 185, 129, 0.6)'
                      } : {}}
                    />
                  </div>
                );
              }
            })}
          </div>
        </div>

        {/* Task Card - Modern Game Tile */}
        <div className={`p-6 sm:p-8 ${theme === 'dark' ? 'bg-gradient-to-b from-zinc-900 to-zinc-900/80 border-zinc-800' : 'bg-gradient-to-b from-white to-gray-50 border-gray-200'} border rounded-[20px] sm:rounded-[24px] mb-4 sm:mb-6 shadow-xl`}>
          {/* Header Row */}
          <div className="flex items-center gap-3 mb-8">
            {/* Icon */}
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center flex-shrink-0 text-white shadow-lg shadow-emerald-500/20">
              <Sparkles className="w-6 h-6" />
            </div>
            
            {/* Label */}
            <span className={`text-xs uppercase tracking-widest flex-1 ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>Fill in the Blank</span>
            
            {/* XP Tag */}
            <div className="px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-amber-600/20 border border-amber-500/30 shadow-lg shadow-amber-500/10">
              <span className="text-xs text-amber-500">+{currentTaskData.xp} XP</span>
            </div>
          </div>

          {/* Question Text - Hero Style */}
          <h3 className={`text-xl sm:text-2xl mb-8 leading-relaxed ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {currentTaskData.question}
          </h3>

          {/* Answer Input - Pill Shape */}
          <div className="space-y-4">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type your answer here..."
              disabled={hasSubmitted}
              className={`w-full px-6 py-4 ${theme === 'dark' ? 'bg-zinc-950/50 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-emerald-600/50 focus:ring-2 focus:ring-emerald-600/20' : 'bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20'} border rounded-full focus:outline-none transition-all duration-300 disabled:opacity-50 shadow-inner`}
              style={{
                boxShadow: theme === 'dark' ? 'inset 0 2px 4px 0 rgb(0 0 0 / 0.3)' : 'inset 0 2px 4px 0 rgb(0 0 0 / 0.06)'
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !hasSubmitted) {
                  handleSubmit();
                }
              }}
            />

            {/* Feedback */}
            {hasSubmitted && (
              <>
                {xpGained >= currentTaskData.xp ? (
                  // Correct Answer - Green Success Banner
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="p-4 rounded-xl border bg-emerald-600/10 border-emerald-600/20 relative"
                    style={{
                      boxShadow: '0 0 20px 0 rgba(16, 185, 129, 0.15)'
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <Trophy className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          Correct! You earned <span className="text-emerald-500">+{xpGained} XP</span>
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  // Wrong Answer - Orange/Brown Warning Banner
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ 
                      opacity: 1, 
                      x: [0, -4, 4, -4, 4, 0],
                    }}
                    transition={{ 
                      opacity: { duration: 0.2 },
                      x: { duration: 0.5, times: [0, 0.2, 0.4, 0.6, 0.8, 1] }
                    }}
                    className="p-4 rounded-xl border bg-orange-500/10 border-orange-500/20"
                  >
                    <div className="flex items-start gap-3">
                      <Sparkles className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className={`text-sm mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          Not quite. The correct answer is: <span className={`${theme === 'dark' ? 'text-orange-400' : 'text-orange-600'}`}>{currentTaskData.correctAnswer}</span>
                        </p>
                        <p className="text-sm text-red-500">
                          You lost −{currentTaskData.xp - xpGained} XP
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className={`text-sm ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
            {hasSubmitted ? 'Task complete!' : 'Submit your answer to continue'}
          </div>
          {!hasSubmitted ? (
            <button
              onClick={handleSubmit}
              disabled={!answer.trim()}
              className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-[20px] text-white hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:shadow-none"
            >
              Submit
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-[20px] text-white hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300"
            >
              Next Task
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
