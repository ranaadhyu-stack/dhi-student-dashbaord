import { useState, useEffect } from 'react';
import { Youtube, Play, ChevronLeft, ChevronRight, Send, ChevronRight as PanelToggle, Check } from 'lucide-react';

interface RealWorldModeProps {
  onStart: () => void;
  onProgress: (progress: { current: number; total: number }) => void;
  theme: 'light' | 'dark';
  onCurrentExampleChange?: (example: any) => void;
  onNavigationChange?: (handlers: { onPrevious: () => void; onNext: () => void; canGoPrevious: boolean; canGoNext: boolean; onEndSession: () => void }) => void;
  onSessionEnd?: () => void;
}

interface VideoExample {
  type: 'video';
  title: string;
  channel: string;
  thumbnail: string;
  duration: string;
  videoId: string;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

// Move allVideos outside component to prevent recreating on every render
const allVideos: VideoExample[] = [
  {
    type: 'video',
    title: 'How Solar Panels Mimic Photosynthesis',
    channel: 'National Geographic',
    thumbnail: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=450&fit=crop',
    duration: '8:42',
    videoId: 'dQw4w9WgXcQ',
  },
  {
    type: 'video',
    title: 'Biofuels: Plants as Energy Sources',
    channel: 'TED-Ed',
    thumbnail: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=450&fit=crop',
    duration: '5:23',
    videoId: 'dQw4w9WgXcQ',
  },
  {
    type: 'video',
    title: 'The Chemistry of Photosynthesis',
    channel: 'Crash Course',
    thumbnail: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&h=450&fit=crop',
    duration: '12:15',
    videoId: 'dQw4w9WgXcQ',
  },
  {
    type: 'video',
    title: 'Photosynthesis in Extreme Environments',
    channel: 'BBC Earth',
    thumbnail: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=450&fit=crop',
    duration: '6:38',
    videoId: 'dQw4w9WgXcQ',
  },
  {
    type: 'video',
    title: 'Understanding Chloroplasts',
    channel: 'Khan Academy',
    thumbnail: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&h=450&fit=crop',
    duration: '9:51',
    videoId: 'dQw4w9WgXcQ',
  },
  {
    type: 'video',
    title: 'Light Reactions Explained',
    channel: 'Science Simplified',
    thumbnail: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=450&fit=crop',
    duration: '7:14',
    videoId: 'dQw4w9WgXcQ',
  },
  {
    type: 'video',
    title: 'Calvin Cycle Breakdown',
    channel: 'Biology Online',
    thumbnail: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&h=450&fit=crop',
    duration: '10:29',
    videoId: 'dQw4w9WgXcQ',
  },
  {
    type: 'video',
    title: 'C3, C4, and CAM Plants',
    channel: 'Amoeba Sisters',
    thumbnail: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800&h=450&fit=crop',
    duration: '6:45',
    videoId: 'dQw4w9WgXcQ',
  },
  {
    type: 'video',
    title: 'Factors Affecting Photosynthesis',
    channel: 'Biology Hub',
    thumbnail: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&h=450&fit=crop',
    duration: '8:17',
    videoId: 'dQw4w9WgXcQ',
  },
  {
    type: 'video',
    title: 'Artificial Photosynthesis Research',
    channel: 'MIT OpenCourseWare',
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=450&fit=crop',
    duration: '15:33',
    videoId: 'dQw4w9WgXcQ',
  },
  {
    type: 'video',
    title: 'Photosynthesis vs Cellular Respiration',
    channel: 'Khan Academy',
    thumbnail: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=450&fit=crop',
    duration: '11:08',
    videoId: 'dQw4w9WgXcQ',
  },
  {
    type: 'video',
    title: 'The Role of Water in Photosynthesis',
    channel: 'Science Channel',
    thumbnail: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800&h=450&fit=crop',
    duration: '4:56',
    videoId: 'dQw4w9WgXcQ',
  },
  {
    type: 'video',
    title: 'Oxygen Production Through Photosynthesis',
    channel: 'National Geographic',
    thumbnail: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=450&fit=crop',
    duration: '7:22',
    videoId: 'dQw4w9WgXcQ',
  },
  {
    type: 'video',
    title: 'Carbon Dioxide and Plant Growth',
    channel: 'Plant Science Today',
    thumbnail: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=450&fit=crop',
    duration: '9:14',
    videoId: 'dQw4w9WgXcQ',
  },
  {
    type: 'video',
    title: 'Photosynthesis Lab Experiments',
    channel: 'Biology Experiments',
    thumbnail: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&h=450&fit=crop',
    duration: '13:47',
    videoId: 'dQw4w9WgXcQ',
  },
  {
    type: 'video',
    title: 'Evolution of Photosynthesis',
    channel: 'PBS Eons',
    thumbnail: 'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=800&h=450&fit=crop',
    duration: '10:35',
    videoId: 'dQw4w9WgXcQ',
  },
  {
    type: 'video',
    title: 'Photosynthesis in Algae',
    channel: 'Marine Biology Channel',
    thumbnail: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&h=450&fit=crop',
    duration: '6:29',
    videoId: 'dQw4w9WgXcQ',
  },
  {
    type: 'video',
    title: 'Photosynthesis Animation',
    channel: 'Science Explained',
    thumbnail: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&h=450&fit=crop',
    duration: '4:29',
    videoId: 'dQw4w9WgXcQ',
  },
];

export function RealWorldMode({ onStart, onProgress, theme, onCurrentExampleChange, onNavigationChange, onSessionEnd }: RealWorldModeProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewedIndices, setViewedIndices] = useState<Set<number>>(new Set());
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [xpNotification, setXpNotification] = useState<{ type: 'earned' | 'locked'; show: boolean }>({ type: 'earned', show: false });
  const [sessionEnded, setSessionEnded] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [lastVideoChangeTime, setLastVideoChangeTime] = useState(0); // Initialize to 0 so first video always earns XP

  const currentVideo = allVideos[currentIndex];
  const isViewed = viewedIndices.has(currentIndex);

  // Only run onStart once on mount
  useEffect(() => {
    onStart();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Update progress based on currentIndex + 1 (not viewedIndices.size)
  useEffect(() => {
    onProgress({ current: currentIndex + 1, total: allVideos.length });
  }, [currentIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  // Update current example when video state changes
  useEffect(() => {
    if (onCurrentExampleChange) {
      onCurrentExampleChange(isVideoOpen ? currentVideo : null);
    }
  }, [isVideoOpen, currentIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  // Update navigation handlers when currentIndex changes
  useEffect(() => {
    if (onNavigationChange) {
      onNavigationChange({
        onPrevious: handlePrevVideo,
        onNext: handleNextVideo,
        canGoPrevious: currentIndex > 0,
        canGoNext: currentIndex < allVideos.length - 1,
        onEndSession: handleEndSession, // Expose the end session handler
      });
    }
  }, [currentIndex, onNavigationChange]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleOpenVideo = () => {
    const isFirstView = !viewedIndices.has(currentIndex);
    const now = Date.now();
    const timeSinceLastChange = now - lastVideoChangeTime;
    
    if (isFirstView) {
      // Check if switching too fast (less than 3 seconds)
      if (timeSinceLastChange < 3000) {
        setXpNotification({ type: 'locked', show: true });
        setTimeout(() => setXpNotification({ type: 'locked', show: false }), 1500);
      } else {
        setViewedIndices(new Set([...viewedIndices, currentIndex]));
        setXpNotification({ type: 'earned', show: true });
        setTimeout(() => setXpNotification({ type: 'earned', show: false }), 1500);
      }
      setLastVideoChangeTime(now);
    }
    
    setIsVideoOpen(true);
  };

  const handlePrevVideo = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsVideoOpen(false);
    }
  };

  const handleNextVideo = () => {
    if (currentIndex < allVideos.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsVideoOpen(false);
    }
  };

  const handleEndSession = () => {
    setSessionEnded(true);
    // Clear navigation handlers so bottom bar hides Previous/Next buttons
    if (onNavigationChange) {
      onNavigationChange({
        onPrevious: () => {},
        onNext: () => {},
        canGoPrevious: false,
        canGoNext: false,
      });
    }
    if (onSessionEnd) {
      onSessionEnd();
    }
  };

  const handleRestartSession = () => {
    setSessionEnded(false);
    setCurrentIndex(0);
    setViewedIndices(new Set());
    setIsVideoOpen(false);
    setMessages([]);
    setChatInput('');
    setIsPanelOpen(true);
    setLastVideoChangeTime(Date.now());
    // Restore navigation handlers
    if (onNavigationChange) {
      onNavigationChange({
        onPrevious: handlePrevVideo,
        onNext: handleNextVideo,
        canGoPrevious: false,
        canGoNext: allVideos.length > 1,
      });
    }
    onStart();
  };

  const handleSendMessage = () => {
    if (!chatInput.trim() || !isVideoOpen) return;
    
    const newUserMessage: ChatMessage = {
      role: 'user',
      content: chatInput.trim()
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setChatInput('');
    
    // Simulate DHI response
    setTimeout(() => {
      const demoResponse: ChatMessage = {
        role: 'assistant',
        content: `I'm analyzing "${currentVideo.title}" for you. This is a demo response from DHI Assistant.`
      };
      setMessages(prev => [...prev, demoResponse]);
    }, 500);
  };

  // Session ended state - replaces entire Real World interface
  if (sessionEnded) {
    return (
      <div className="h-full flex items-center justify-center bg-zinc-950/50">
        <div className="text-center space-y-6 max-w-md px-6">
          <div className="space-y-3">
            <h2 className="text-3xl text-white" style={{ fontWeight: 700 }}>
              You ended the session.
            </h2>
            <p className="text-base text-zinc-400">
              You may restart any time.
            </p>
          </div>
          <button
            onClick={handleRestartSession}
            className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-white transition-all duration-200 shadow-lg hover:shadow-emerald-500/20"
            style={{ fontWeight: 600 }}
          >
            Restart Session
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
    <div className="h-full flex gap-6 overflow-hidden relative">
      {/* Main Content Area - Left Side */}
      <div className={`flex-1 flex flex-col overflow-auto transition-all duration-300 ${isPanelOpen ? '' : 'mr-0'}`}>
        {/* Single Video Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-lg relative">
          {/* Video Display Area */}
          <div className="relative bg-zinc-800" style={{ aspectRatio: '16/9' }}>
            {/* XP Notification Chip - Inside Video Container */}
            {xpNotification.show && (
              <div
                className={`absolute top-4 left-4 px-3 py-1.5 rounded-full shadow-lg z-20 flex items-center gap-1.5 text-sm animate-in slide-in-from-left duration-300 ${
                  xpNotification.type === 'earned'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-amber-500 text-white'
                }`}
                style={{
                  animation: 'slideInFade 1.5s ease-out forwards',
                }}
              >
                {xpNotification.type === 'earned' ? (
                  <span style={{ fontWeight: 600 }}>+10 XP</span>
                ) : (
                  <span style={{ fontWeight: 600 }}>XP Locked — Switching too fast</span>
                )}
              </div>
            )}

            {isVideoOpen ? (
              // Embedded YouTube Player
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${currentVideo.videoId}?autoplay=1`}
                title={currentVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
              />
            ) : (
              // Thumbnail with Play Overlay
              <>
                <img
                  src={currentVideo.thumbnail}
                  alt={currentVideo.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Viewed Badge */}
                {isViewed && (
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                )}
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <div className="relative">
                    {/* Outer Glow Ring */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 blur-md opacity-60" />
                    
                    {/* Inner Button */}
                    <div 
                      className="relative w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform duration-120"
                      style={{
                        boxShadow: '0 0 20px rgba(16, 185, 129, 0.5), inset 0 2px 4px rgba(255, 255, 255, 0.2)'
                      }}
                      onClick={handleOpenVideo}
                    >
                      <Play className="w-8 h-8 text-white ml-1" fill="white" />
                    </div>
                  </div>
                </div>
                
                {/* YouTube Badge */}
                <div className="absolute top-4 left-4 px-2 py-1 rounded-md bg-[#FF0000] flex items-center gap-1 shadow-md"
                  style={{
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  <Youtube className="w-3.5 h-3.5 text-white" fill="white" />
                  <span className="text-xs text-white">YouTube</span>
                </div>
                
                {/* Duration */}
                <div className="absolute bottom-4 right-4 px-2 py-1 rounded bg-black/70 text-xs text-white"
                  style={{
                    fontFamily: 'monospace',
                    letterSpacing: '0.5px'
                  }}
                >
                  {currentVideo.duration}
                </div>
              </>
            )}
          </div>
          
          {/* Video Info & Actions */}
          <div className="p-6 space-y-4">
            {/* Title and Channel */}
            <div>
              <h3 className="text-white text-xl mb-2 leading-snug" style={{ fontWeight: 600 }}>
                {currentVideo.title}
              </h3>
              <div className="flex items-center gap-2">
                <Youtube className="w-4 h-4 text-red-500" />
                <p className="text-sm text-zinc-400">{currentVideo.channel}</p>
              </div>
            </div>
            
            {/* Open Video Button (only show if not open) */}
            {!isVideoOpen && (
              <button
                onClick={handleOpenVideo}
                className="w-full px-5 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-white transition-all duration-150 ease-in-out flex items-center justify-center gap-2 border border-transparent hover:border-emerald-400/30"
                style={{
                  boxShadow: '0 0 0 rgba(16, 185, 129, 0)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 15px rgba(16, 185, 129, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 0 rgba(16, 185, 129, 0)';
                }}
              >
                <Play className="w-5 h-5" />
                Open Video
              </button>
            )}
            
            {/* Navigation Controls */}
            <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
              <button
                onClick={handlePrevVideo}
                disabled={currentIndex === 0}
                className="w-10 h-10 rounded-xl bg-zinc-800 hover:bg-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center group"
              >
                <ChevronLeft className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
              </button>
              
              <span className="text-sm text-zinc-400">
                Video <span className="text-white" style={{ fontWeight: 600 }}>{currentIndex + 1}</span> of {allVideos.length}
              </span>
              
              <button
                onClick={handleNextVideo}
                disabled={currentIndex === allVideos.length - 1}
                className="w-10 h-10 rounded-xl bg-zinc-800 hover:bg-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center group"
              >
                <ChevronRight className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side Panel - DHI Chat */}
      <div className={`flex-shrink-0 transition-all duration-300 ${isPanelOpen ? 'w-96' : 'w-12'}`}>
        {isPanelOpen ? (
          <div className="h-full bg-zinc-900 border border-zinc-800 rounded-2xl flex flex-col overflow-hidden">
            {/* Panel Header */}
            <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="text-white text-sm mb-1 truncate" style={{ fontWeight: 600 }}>
                  {isVideoOpen ? currentVideo.title : 'No video selected'}
                </h3>
                <p className="text-xs text-zinc-500">DHI Assistant</p>
              </div>
              <button
                onClick={() => setIsPanelOpen(false)}
                className="ml-2 w-8 h-8 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors flex items-center justify-center flex-shrink-0"
              >
                <ChevronRight className="w-4 h-4 text-zinc-400" />
              </button>
            </div>
            
            {/* Chat Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Starter hints (show when no messages) */}
              {messages.length === 0 && (
                <div className="space-y-3">
                  <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-3">
                    <p className="text-xs text-zinc-400">
                      You can ask me to transcribe this video.
                    </p>
                  </div>
                  <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-3">
                    <p className="text-xs text-zinc-400">
                      You can ask any question about the video content.
                    </p>
                  </div>
                </div>
              )}
              
              {/* Actual messages */}
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-xl p-3 text-sm ${
                      msg.role === 'user'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-zinc-800 text-zinc-200 border border-zinc-700'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Chat Input Footer */}
            <div className="p-4 border-t border-zinc-800">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder={isVideoOpen ? "Ask DHI about this video…" : "Open a video first"}
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  disabled={!isVideoOpen}
                  className="flex-1 bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!isVideoOpen || !chatInput.trim()}
                  className="w-10 h-10 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:bg-zinc-800 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
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
    </>
  );
}