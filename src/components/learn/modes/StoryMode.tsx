import { useState, useEffect } from 'react';
import { Play, Pause, Volume2, ChevronRight, ChevronLeft, BookOpen } from 'lucide-react';

interface StoryModeProps {
  onStart: () => void;
  onProgress: (progress: { current: number; total: number }) => void;
  theme: 'light' | 'dark';
  onNavigationChange?: (handlers: { onPrevious: () => void; onNext: () => void; canGoPrevious: boolean; canGoNext: boolean; onEndSession: () => void }) => void;
  onSessionEnd?: () => void;
  onSessionResume?: () => void;
}

export function StoryMode({ onStart, onProgress, theme, onNavigationChange, onSessionEnd, onSessionResume }: StoryModeProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [showTranscript, setShowTranscript] = useState(true);
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [currentParagraph, setCurrentParagraph] = useState(0);
  const [sessionEnded, setSessionEnded] = useState(false);

  // State preservation for resume
  const [savedState, setSavedState] = useState({
    isPlaying: false,
    currentTime: 0,
    showTranscript: true,
    isPanelOpen: true,
    currentParagraph: 0,
  });

  const totalDuration = 180; // 3 minutes in seconds
  
  // Split transcript into paragraphs
  const transcriptText = `In the quiet world beneath the surface of every leaf, an ancient story unfolds—a story billions of years in the making.

Long ago, when Earth was young and its atmosphere harsh, tiny organisms discovered a secret: how to capture light and transform it into life itself.

This is the story of photosynthesis—the most important chemical reaction on our planet.

Imagine you're a photon of light, racing through space at incredible speed. You've traveled 93 million miles from the Sun, and now you're about to enter a leaf. As you pass through the transparent outer layers, you're guided toward special structures called chloroplasts—the green factories of the plant cell.

Inside these chloroplasts, you encounter chlorophyll molecules, arranged in precise patterns like solar panels. When you strike one of these molecules, something magical happens: your energy is captured and begins a chain reaction that will create the food that feeds nearly all life on Earth.`;

  const paragraphs = transcriptText.split('\n\n');
  const totalParagraphs = paragraphs.length;

  // Calculate active paragraph based on audio progress
  const getActiveParagraph = () => {
    const progress = currentTime / totalDuration;
    return Math.floor(progress * totalParagraphs);
  };

  const activeParagraphIndex = getActiveParagraph();

  useEffect(() => {
    onStart();
  }, [onStart]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && currentTime < totalDuration && !sessionEnded) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          const newTime = Math.min(prev + 1, totalDuration);
          onProgress({ current: newTime, total: totalDuration });
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTime, sessionEnded]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePrevious = () => {
    if (currentParagraph > 0) {
      setCurrentParagraph(currentParagraph - 1);
    }
  };

  const handleNext = () => {
    if (currentParagraph < totalParagraphs - 1) {
      setCurrentParagraph(currentParagraph + 1);
    } else {
      handleEndSession();
    }
  };

  const handleEndSession = () => {
    // Save current state before ending
    setSavedState({
      isPlaying,
      currentTime,
      showTranscript,
      isPanelOpen,
      currentParagraph,
    });
    
    // Pause playback and end session
    setIsPlaying(false);
    setSessionEnded(true);
    
    // Call onSessionEnd if provided
    if (onSessionEnd) {
      onSessionEnd();
    }
  };

  const handleResumeSession = () => {
    // Restore saved state
    setIsPlaying(savedState.isPlaying);
    setCurrentTime(savedState.currentTime);
    setShowTranscript(savedState.showTranscript);
    setIsPanelOpen(savedState.isPanelOpen);
    setCurrentParagraph(savedState.currentParagraph);
    
    // Resume session
    setSessionEnded(false);
    
    // Call onSessionResume if provided
    if (onSessionResume) {
      onSessionResume();
    }
  };

  useEffect(() => {
    if (onNavigationChange) {
      onNavigationChange({
        onPrevious: handlePrevious,
        onNext: handleNext,
        canGoPrevious: currentParagraph > 0,
        canGoNext: currentParagraph < totalParagraphs - 1,
        onEndSession: handleEndSession,
      });
    }
  }, [currentParagraph, onNavigationChange, totalParagraphs]);

  // Show Session Ended Screen
  if (sessionEnded) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md px-6">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-2xl bg-emerald-600/10 border border-emerald-600/20 flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-emerald-600" />
            </div>
          </div>

          {/* Text */}
          <div className="space-y-2">
            <h2 className="text-white text-2xl" style={{ fontWeight: 700 }}>
              You ended the story.
            </h2>
            <p className="text-zinc-400 text-base">
              You can resume whenever you're ready.
            </p>
          </div>

          {/* Resume Button */}
          <button
            onClick={handleResumeSession}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-white transition-all duration-300"
            style={{ fontWeight: 600 }}
          >
            Resume Story
          </button>
        </div>
      </div>
    );
  }

  // Normal Story Mode Interface
  return (
    <div className="h-full flex gap-6 overflow-hidden relative">
      {/* Ambient Background with Vignette */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle radial gradient for depth */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.03) 0%, transparent 50%)',
          }}
        />
        {/* Vignette overlay */}
        <div 
          className="absolute inset-0 opacity-60"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0, 0, 0, 0.4) 100%)',
          }}
        />
        {/* Gentle top-to-bottom gradient */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 0%, transparent 40%, transparent 60%, rgba(0, 0, 0, 0.3) 100%)',
          }}
        />
      </div>

      {/* Main Story Area - Left Side */}
      <div className={`flex-1 flex flex-col overflow-auto transition-all duration-300 ${isPanelOpen ? '' : 'mr-0'} relative z-10`}>
        <div className="max-w-4xl w-full mx-auto p-6 space-y-6">
          {/* Story Title Header - replaced lesson-style header */}
          <div className="space-y-1">
            <h1 className="text-white text-2xl" style={{ fontWeight: 700 }}>
              Photosynthesis: The Light Journey
            </h1>
            <p className="text-sm text-zinc-500">
              From: <span className="text-zinc-400">Newton Laws of Motion.pdf</span> (Lesson Source)
            </p>
          </div>

          {/* Audio Controls - moved closer to transcript with tight spacing */}
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <div className="relative flex-shrink-0">
                {/* Pulsing Glow Rings - Only when playing */}
                {isPlaying && (
                  <>
                    {/* Outer ring - slower, larger pulse */}
                    <div 
                      className="absolute inset-0 rounded-full bg-emerald-600/20 blur-xl"
                      style={{
                        animation: 'pulse-slow 2s ease-in-out infinite',
                        transform: 'scale(1.4)',
                      }}
                    />
                    {/* Middle ring - medium pulse */}
                    <div 
                      className="absolute inset-0 rounded-full bg-emerald-600/30 blur-lg"
                      style={{
                        animation: 'pulse-medium 1.5s ease-in-out infinite',
                        transform: 'scale(1.2)',
                      }}
                    />
                    {/* Inner ring - faster, subtle pulse */}
                    <div 
                      className="absolute inset-0 rounded-full bg-emerald-600/40 blur-md"
                      style={{
                        animation: 'pulse-fast 1s ease-in-out infinite',
                        transform: 'scale(1.1)',
                      }}
                    />
                  </>
                )}
                
                {/* Play/Pause Button */}
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 flex items-center justify-center transition-all duration-300 relative z-10"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 text-white" />
                  ) : (
                    <Play className="w-6 h-6 text-white ml-1" />
                  )}
                </button>
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between text-sm text-zinc-500 mb-2">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(totalDuration)}</span>
                </div>
                <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-600 rounded-full transition-all duration-300"
                    style={{ width: `${(currentTime / totalDuration) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Progress Text - more compact */}
            <div className="flex items-center justify-center gap-2 text-xs text-zinc-500">
              <div className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>{isPlaying ? 'Playing...' : 'Paused'}</span>
            </div>
          </div>

          {/* Transcript Toggle - closer to audio controls */}
          <div>
            <button
              onClick={() => setShowTranscript(!showTranscript)}
              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-sm text-zinc-300 transition-all duration-200"
            >
              {showTranscript ? 'Hide Transcript' : 'Show Transcript'}
            </button>
          </div>

          {/* Transcript - Unified Scrollable Area - tight spacing from above */}
          {showTranscript && (
            <div className="bg-zinc-900/60 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-8 space-y-6 mt-3 shadow-2xl shadow-black/40">
              {paragraphs.map((paragraph, index) => {
                const isActive = index === activeParagraphIndex && isPlaying;
                const isPast = index < activeParagraphIndex && isPlaying;
                
                return (
                  <p 
                    key={index} 
                    className={`text-lg leading-[1.8] transition-all duration-700 ease-out ${
                      isActive 
                        ? 'text-white scale-[1.02] px-4 py-3 bg-emerald-600/10 rounded-2xl border-l-4 border-emerald-600/60 shadow-lg shadow-emerald-600/10' 
                        : isPast
                        ? 'text-zinc-400 opacity-60'
                        : 'text-zinc-200 opacity-80'
                    }`}
                    style={{ 
                      fontFamily: 'Inter, system-ui, sans-serif',
                      letterSpacing: '0.01em',
                      textRendering: 'optimizeLegibility',
                    }}
                  >
                    {paragraph}
                  </p>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Right Side Panel - Insights & Tools */}
      <div className={`flex-shrink-0 transition-all duration-300 ${isPanelOpen ? 'w-80' : 'w-12'}`}>
        {isPanelOpen ? (
          <div className="h-full bg-zinc-900 border border-zinc-800 rounded-2xl flex flex-col overflow-hidden">
            {/* Panel Header */}
            <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
              <h3 className="text-white text-sm" style={{ fontWeight: 600 }}>
                Insights & Tools
              </h3>
              <button
                onClick={() => setIsPanelOpen(false)}
                className="w-8 h-8 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors flex items-center justify-center"
              >
                <ChevronRight className="w-4 h-4 text-zinc-400" />
              </button>
            </div>

            {/* Panel Content - NO transcript controls here */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {/* Playback Speed */}
              <div className="space-y-2">
                <label className="text-xs text-zinc-400">Playback Speed</label>
                <select className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500/50">
                  <option>0.5x</option>
                  <option>0.75x</option>
                  <option selected>1.0x (Normal)</option>
                  <option>1.25x</option>
                  <option>1.5x</option>
                  <option>2.0x</option>
                </select>
              </div>

              {/* Language */}
              <div className="space-y-2">
                <label className="text-xs text-zinc-400">Language</label>
                <select className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500/50">
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                </select>
              </div>

              {/* Voice Style */}
              <div className="space-y-2">
                <label className="text-xs text-zinc-400">Voice Style</label>
                <select className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500/50">
                  <option>Narrative</option>
                  <option>Educational</option>
                  <option>Conversational</option>
                  <option>Documentary</option>
                </select>
              </div>
            </div>
          </div>
        ) : (
          // Collapsed tab
          <button
            onClick={() => setIsPanelOpen(true)}
            className="h-full w-12 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center hover:bg-zinc-800 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-zinc-400" />
          </button>
        )}
      </div>
    </div>
  );
}