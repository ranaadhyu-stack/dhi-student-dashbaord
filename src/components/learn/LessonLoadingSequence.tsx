import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Network, Layers, BarChart3, CheckCircle2 } from 'lucide-react';

interface LessonLoadingSequenceProps {
  isLoading: boolean;
  onComplete: () => void;
  lessonName: string;
}

export function LessonLoadingSequence({ isLoading, onComplete, lessonName }: LessonLoadingSequenceProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isLoading) {
      setCurrentStep(0);
      setProgress(0);
      return;
    }

    // Step 1: Reading chapter (1.5s)
    const timer1 = setTimeout(() => setCurrentStep(1), 1500);
    
    // Step 2: Identifying concepts (1.5s)
    const timer2 = setTimeout(() => setCurrentStep(2), 3000);
    
    // Step 3: Preparing modes (1.5s)
    const timer3 = setTimeout(() => setCurrentStep(3), 4500);
    
    // Step 4: Generating deck with progress animation
    const timer4 = setTimeout(() => {
      setCurrentStep(4);
      // Animate progress from 0% to 100%
      setProgress(0);
      let currentProgress = 0;
      const progressInterval = setInterval(() => {
        currentProgress += 5;
        setProgress(currentProgress);
        if (currentProgress >= 100) {
          clearInterval(progressInterval);
        }
      }, 30);
    }, 6000);

    // Step 5: Success message (show for 0.8s then fade out)
    const timer5 = setTimeout(() => {
      setCurrentStep(5);
    }, 7500);

    // Complete and close
    const timer6 = setTimeout(() => {
      onComplete();
    }, 8800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
      clearTimeout(timer6);
    };
  }, [isLoading, onComplete]);

  const steps = [
    {
      title: 'Reading your chapter…',
      subtitle: 'DHI is scanning your lesson.',
      icon: BookOpen,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      title: 'Identifying key concepts…',
      subtitle: 'Analyzing important topics and connections.',
      icon: Network,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
    {
      title: 'Preparing learning modes…',
      subtitle: 'Setting up personalized learning experiences.',
      icon: Layers,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10',
    },
    {
      title: 'Generating your learning deck…',
      subtitle: 'Creating interactive content just for you.',
      icon: BarChart3,
      color: 'text-amber-500',
      bgColor: 'bg-amber-500/10',
    },
  ];

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ backdropFilter: 'blur(8px)', backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 max-w-lg w-full shadow-2xl"
          >
            <AnimatePresence mode="wait">
              {currentStep < 3 && (
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="text-center"
                >
                  {/* Icon */}
                  <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl ${steps[currentStep].bgColor} flex items-center justify-center relative overflow-hidden`}>
                    {currentStep === 0 ? (
                      // Shimmering book animation
                      <motion.div
                        animate={{
                          scale: [1, 1.1, 1],
                          opacity: [0.8, 1, 0.8],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      >
                        <BookOpen className={`w-10 h-10 ${steps[currentStep].color}`} />
                      </motion.div>
                    ) : currentStep === 1 ? (
                      // Neural network pulse
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      >
                        <Network className={`w-10 h-10 ${steps[currentStep].color}`} />
                        <motion.div
                          className={`absolute inset-0 rounded-2xl ${steps[currentStep].bgColor}`}
                          animate={{
                            opacity: [0.5, 0, 0.5],
                            scale: [1, 1.5, 1],
                          }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: 'easeOut',
                          }}
                        />
                      </motion.div>
                    ) : (
                      <Layers className={`w-10 h-10 ${steps[currentStep].color}`} />
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl text-white mb-2">{steps[currentStep].title}</h3>
                  
                  {/* Subtitle */}
                  <p className="text-sm text-zinc-400">{steps[currentStep].subtitle}</p>

                  {/* Mode icons for step 3 */}
                  {currentStep === 2 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="flex items-center justify-center gap-3 mt-6"
                    >
                      {[
                        { icon: '🎮', label: 'Gamified' },
                        { icon: '📖', label: 'Story' },
                        { icon: '🧠', label: 'Mind Map' },
                        { icon: '🎴', label: 'Flashcards' },
                      ].map((mode, idx) => (
                        <motion.div
                          key={mode.label}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 0.6, scale: 1 }}
                          transition={{ delay: 0.4 + idx * 0.1 }}
                          className="flex flex-col items-center gap-1"
                        >
                          <div className="w-10 h-10 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-lg">
                            {mode.icon}
                          </div>
                          <span className="text-xs text-zinc-500">{mode.label}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* Step 4: Progress bar */}
              {currentStep === 3 && (
                <motion.div
                  key="progress"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="text-center"
                >
                  {/* Icon */}
                  <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-amber-500/10 flex items-center justify-center">
                    <BarChart3 className="w-10 h-10 text-amber-500" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl text-white mb-2">Generating your learning deck…</h3>
                  
                  {/* Subtitle */}
                  <p className="text-sm text-zinc-400 mb-6">Creating interactive content just for you.</p>

                  {/* Progress Bar */}
                  <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                      initial={{ width: '0%' }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    />
                  </div>
                  <p className="text-xs text-zinc-500 mt-2">{progress}% complete</p>
                </motion.div>
              )}

              {/* Step 5: Success */}
              {currentStep === 4 && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                  className="text-center"
                >
                  {/* Success Icon */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', duration: 0.6 }}
                    className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-emerald-500/10 flex items-center justify-center"
                  >
                    <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                  </motion.div>

                  {/* Success Message */}
                  <h3 className="text-xl text-white mb-2">Your lesson is ready!</h3>
                  <p className="text-sm text-zinc-400">Starting your learning journey now…</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Loading spinner for first 3 steps */}
            {currentStep < 3 && (
              <div className="flex justify-center mt-6">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                  className="w-6 h-6 border-2 border-zinc-700 border-t-emerald-500 rounded-full"
                />
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
