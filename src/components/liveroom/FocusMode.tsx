import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Music, Settings, Home, Maximize2, X, Send, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface FocusModeProps {
  onEndSession: (data: any) => void;
  theme: 'light' | 'dark';
}

export function FocusMode({ onEndSession, theme }: FocusModeProps) {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [spotifyConnected, setSpotifyConnected] = useState(false);
  const [showChatWidget, setShowChatWidget] = useState(true);
  const [chatExpanded, setChatExpanded] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'ai', text: 'Hi! I\'m here to help you stay focused. Need any study tips?' }
  ]);
  const [chatInput, setChatInput] = useState('');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      // Timer complete notification
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setTimeLeft(25 * 60);
    setIsRunning(false);
  };

  const handleSendMessage = () => {
    if (chatInput.trim()) {
      setChatMessages([...chatMessages, { sender: 'user', text: chatInput }]);
      setChatInput('');
      
      // Simulate AI response
      setTimeout(() => {
        const responses = [
          'Great question! Let me help you with that.',
          'Remember to take breaks every 25 minutes for optimal focus.',
          'You\'re doing amazing! Keep up the great work.',
          'Try the Feynman technique - explain concepts in simple terms.',
          'Active recall is more effective than passive reading. Try to test yourself!'
        ];
        setChatMessages(prev => [...prev, { 
          sender: 'ai', 
          text: responses[Math.floor(Math.random() * responses.length)] 
        }]);
      }, 1000);
    }
  };

  const handleEndSession = () => {
    const focusTime = (25 * 60 - timeLeft) / 60; // minutes focused
    onEndSession({
      focusTime: Math.round(focusTime),
      xpEarned: Math.round(focusTime * 10),
      helpfulGiven: 0,
      helpfulReceived: 0,
    });
  };

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Beautiful Background */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1611704126461-019c9dfe76b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZWFjZWZ1bCUyMGZvcmVzdCUyMG5hdHVyZSUyMHBhdGh8ZW58MXx8fHwxNzY0MjYzMDg1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Focus background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Top Bar */}
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-white"
            >
              <h1 className="text-2xl font-bold">flocus</h1>
              <p className="text-xs text-white/60">by Student Portal</p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-3"
          >
            <button
              onClick={handleEndSession}
              className="p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 text-white"
            >
              <Home className="w-5 h-5" />
            </button>
            <button className="p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 text-white">
              <Settings className="w-5 h-5" />
            </button>
            <button className="p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 text-white">
              <Maximize2 className="w-5 h-5" />
            </button>
          </motion.div>
        </div>

        {/* Center Content - Timer */}
        <div className="flex-1 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <p className="text-white/80 mb-4 text-lg">Focus</p>
            <motion.div
              animate={{ scale: isRunning ? [1, 1.02, 1] : 1 }}
              transition={{ repeat: isRunning ? Infinity : 0, duration: 2 }}
              className="text-9xl font-bold text-white mb-8 tracking-tight"
            >
              {formatTime(timeLeft)}
            </motion.div>

            {/* Timer Controls */}
            <div className="flex items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTimer}
                className="px-12 py-4 bg-purple-600 hover:bg-purple-500 text-white rounded-2xl transition-all duration-300 flex items-center gap-3 shadow-2xl shadow-purple-500/50"
              >
                {isRunning ? (
                  <>
                    <Pause className="w-5 h-5" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    Start
                  </>
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetTimer}
                className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 text-white"
              >
                <RotateCcw className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section - Spotify */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6"
        >
          {!spotifyConnected ? (
            <div className="max-w-sm">
              <p className="text-white/80 text-sm mb-3">
                Log in to Spotify web player, then refresh to enjoy our playlists in full!
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setSpotifyConnected(true)}
                  className="px-6 py-3 bg-[#1DB954] hover:bg-[#1ed760] text-white rounded-xl transition-all duration-300 flex items-center gap-2 shadow-lg"
                >
                  <Music className="w-4 h-4" />
                  Connect Spotify
                </button>
                <button className="px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white rounded-xl transition-all duration-300 text-sm">
                  Skip for now
                </button>
              </div>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Music className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium mb-1">Deep Focus Playlist</p>
                  <p className="text-white/60 text-sm">Ambient and instrumental tracks</p>
                </div>
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg"
                  >
                    <Play className="w-5 h-5 text-black ml-0.5" />
                  </motion.button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Floating AI Chat Widget */}
      <AnimatePresence>
        {showChatWidget && !chatExpanded && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              y: [0, -10, 0]
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ 
              scale: { delay: 0.5 },
              y: { repeat: Infinity, duration: 2, ease: "easeInOut" }
            }}
            onClick={() => setChatExpanded(true)}
            className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 shadow-2xl shadow-emerald-500/50 flex items-center justify-center z-50 hover:scale-110 transition-transform duration-300"
          >
            <Sparkles className="w-7 h-7 text-white" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Expanded Chat Panel */}
      <AnimatePresence>
        {chatExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 100 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: 100 }}
            className="fixed bottom-8 right-8 w-96 h-[500px] bg-zinc-900/95 backdrop-blur-xl border border-zinc-700/50 rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Chat Header */}
            <div className="p-5 border-b border-zinc-800 flex items-center justify-between bg-gradient-to-br from-emerald-500/10 to-teal-600/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-medium">Focus AI</h3>
                  <p className="text-xs text-zinc-400">Always here to help</p>
                </div>
              </div>
              <button
                onClick={() => setChatExpanded(false)}
                className="w-8 h-8 rounded-lg hover:bg-zinc-800 flex items-center justify-center transition-colors text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {chatMessages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-emerald-600 text-white rounded-br-sm'
                        : 'bg-zinc-800 text-zinc-100 rounded-bl-sm'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-zinc-800 bg-zinc-900/50">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask me anything..."
                  className="flex-1 px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors text-sm"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!chatInput.trim()}
                  className="w-12 h-12 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:bg-zinc-800 disabled:opacity-50 flex items-center justify-center transition-colors"
                >
                  <Send className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
