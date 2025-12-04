import { useState, useEffect } from 'react';
import { LiveRoomHeader } from './LiveRoomHeader';
import { RightPanel } from './RightPanel';
import { GiftingWidget } from './GiftingWidget';
import { User as UserIcon, UserPlus, Eye, X, Gift, TrendingUp, Award, Flame, Sparkles } from 'lucide-react';

interface PublicRoomProps {
  onToggleRoom: (mode: 'solo' | 'public') => void;
  onEndSession: (data: any) => void;
  theme: 'light' | 'dark';
}

interface PublicUser {
  id: string;
  name: string;
  status: 'Studying' | 'Free';
  xpLevel: number;
  canInvite: boolean;
  avatar?: string;
  currentSubject?: string;
  bio?: string;
  totalXP?: number;
  rank?: number;
  streak?: number;
  giftsReceived?: number;
  giftXP?: number;
  todaysThought?: string;
}

export function PublicRoom({ onToggleRoom, onEndSession, theme }: PublicRoomProps) {
  const [panelOpen, setPanelOpen] = useState(true);
  const [timer, setTimer] = useState(0);
  const [hoveredUser, setHoveredUser] = useState<string | null>(null);
  const [interactedUsers, setInteractedUsers] = useState<Set<string>>(new Set());
  const [selectedProfile, setSelectedProfile] = useState<PublicUser | null>(null);
  const [showGiftingWidget, setShowGiftingWidget] = useState(false);
  const [userCredits] = useState(128); // User's current credits balance
  const [selectedGift, setSelectedGift] = useState<any>(null);
  const [floatingEmojis, setFloatingEmojis] = useState<Array<{id: number, emoji: string, x: number, y: number}>>([]);
  const [showThoughtOverlay, setShowThoughtOverlay] = useState(false);

  const [sessionStats] = useState({
    xp: 145,
    gifts: 3,
    subject: 'Public Study Room',
    helpfulPercentage: 78,
    notifications: 2,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTimer = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  const users: PublicUser[] = [
    { 
      id: '1', 
      name: 'Emma Chen', 
      status: 'Studying', 
      xpLevel: 245, 
      canInvite: true,
      currentSubject: 'Advanced Algorithms',
      bio: 'Passionate computer science student focusing on algorithmic problem solving and data structures. Love collaborative learning!',
      totalXP: 24580,
      rank: 12,
      streak: 45,
      giftsReceived: 23,
      giftXP: 1150,
      todaysThought: 'Today, I learned about the efficiency of quicksort in sorting large datasets.'
    },
    { 
      id: '2', 
      name: 'David Lee', 
      status: 'Free', 
      xpLevel: 189, 
      canInvite: false,
      currentSubject: 'Quantum Mechanics',
      bio: 'Physics enthusiast exploring the fascinating world of quantum theory and its applications in modern technology.',
      totalXP: 18920,
      rank: 28,
      streak: 21,
      giftsReceived: 15,
      giftXP: 750,
      todaysThought: 'Quantum entanglement is a mind-blowing concept that challenges our understanding of reality.'
    },
    { 
      id: '3', 
      name: 'Sofia Martinez', 
      status: 'Studying', 
      xpLevel: 312, 
      canInvite: true,
      currentSubject: 'Neuroscience Fundamentals',
      bio: 'Pre-med student with a deep interest in how the brain works. Always excited to discuss neuroscience topics!',
      totalXP: 31240,
      rank: 5,
      streak: 67,
      giftsReceived: 41,
      giftXP: 2050,
      todaysThought: 'The human brain is a complex network of neurons that shape our thoughts and behaviors.'
    },
    { 
      id: '4', 
      name: 'Ryan Thompson', 
      status: 'Free', 
      xpLevel: 156, 
      canInvite: false,
      currentSubject: 'Business Analytics',
      bio: 'MBA candidate learning data-driven decision making. Interested in connecting business strategy with analytics.',
      totalXP: 15640,
      rank: 42,
      streak: 14,
      giftsReceived: 9,
      giftXP: 450,
      todaysThought: 'Data analytics can provide valuable insights to improve business operations.'
    },
    { 
      id: '5', 
      name: 'Priya Sharma', 
      status: 'Studying', 
      xpLevel: 278, 
      canInvite: true,
      currentSubject: 'Machine Learning',
      bio: 'AI researcher working on natural language processing. Enjoy sharing knowledge and learning from peers.',
      totalXP: 27890,
      rank: 8,
      streak: 52,
      giftsReceived: 34,
      giftXP: 1700,
      todaysThought: 'Machine learning algorithms can be trained to recognize patterns in data.'
    },
    { 
      id: '6', 
      name: 'Alex Kim', 
      status: 'Studying', 
      xpLevel: 203, 
      canInvite: false,
      currentSubject: 'Organic Chemistry',
      bio: 'Chemistry major fascinated by molecular structures and synthesis. Always up for study group discussions!',
      totalXP: 20380,
      rank: 21,
      streak: 33,
      giftsReceived: 18,
      giftXP: 900,
      todaysThought: 'Organic compounds play a crucial role in many biological processes.'
    },
  ];

  const handleUserInteraction = (userId: string) => {
    setInteractedUsers((prev) => new Set(prev).add(userId));
  };

  const gifts = [
    { id: 1, emoji: '☕', name: 'Coffee', credits: 5, xp: 50 },
    { id: 2, emoji: '🍕', name: 'Pizza', credits: 10, xp: 100 },
    { id: 3, emoji: '📚', name: 'Books', credits: 15, xp: 150 },
    { id: 4, emoji: '🎮', name: 'Game', credits: 20, xp: 200 },
    { id: 5, emoji: '🏆', name: 'Trophy', credits: 30, xp: 300 },
    { id: 6, emoji: '💎', name: 'Diamond', credits: 50, xp: 500 },
  ];

  const handleSendGift = () => {
    if (!selectedGift) return;
    
    // Add floating emoji animation
    const randomX = Math.random() * 300 - 150; // -150 to 150
    const randomY = Math.random() * 200 - 100; // -100 to 100
    const newEmoji = {
      id: Date.now(),
      emoji: selectedGift.emoji,
      x: randomX,
      y: randomY
    };
    
    setFloatingEmojis(prev => [...prev, newEmoji]);
    
    // Remove emoji after animation
    setTimeout(() => {
      setFloatingEmojis(prev => prev.filter(e => e.id !== newEmoji.id));
    }, 2000);
    
    // Close popover and reset
    setShowGiftingWidget(false);
    setSelectedGift(null);
  };

  return (
    <div className="h-full flex flex-col">
      <LiveRoomHeader
        mode="public"
        onToggleMode={onToggleRoom}
        xp={sessionStats.xp}
        gifts={sessionStats.gifts}
        subject={sessionStats.subject}
        timer={formatTimer(timer)}
        helpfulPercentage={sessionStats.helpfulPercentage}
        notifications={sessionStats.notifications}
        theme={theme}
      />

      <div className="flex-1 flex overflow-hidden">
        {/* Main Area - User Grid */}
        <div className={`flex-1 p-4 sm:p-6 lg:p-8 transition-all duration-300 ${panelOpen ? '' : 'pr-0'} overflow-y-auto`}>
          <div className="max-w-6xl mx-auto">
            <h3 className={`mb-4 sm:mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Students Online</h3>

            {/* Responsive Grid: 1 col mobile, 2 col tablet, 3 col desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pb-8">
              {users.map((user) => {
                const canInviteNow = interactedUsers.has(user.id) || user.canInvite;

                return (
                  <div
                    key={user.id}
                    className={`aspect-[4/3] rounded-2xl overflow-hidden relative group transition-all duration-300 hover:scale-[1.02] border ${
                      theme === 'dark'
                        ? 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'
                        : 'bg-white border-gray-200 hover:border-gray-300 shadow-sm'
                    }`}
                    onMouseEnter={() => setHoveredUser(user.id)}
                    onMouseLeave={() => setHoveredUser(null)}
                  >
                    {/* User Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                      <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 border ${
                        theme === 'dark'
                          ? 'bg-zinc-800 border-zinc-700'
                          : 'bg-gray-100 border-gray-300'
                      }`}>
                        <UserIcon className={`w-10 h-10 ${theme === 'dark' ? 'text-zinc-600' : 'text-gray-400'}`} />
                      </div>
                      <h4 className={`mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{user.name}</h4>
                      <div className="flex items-center gap-2 mb-3">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            user.status === 'Studying' ? 'bg-emerald-500' : 'bg-blue-500'
                          }`}
                        />
                        <span className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>{user.status}</span>
                      </div>
                      <div className={`px-3 py-1 rounded-lg border ${
                        theme === 'dark'
                          ? 'bg-zinc-800 border-zinc-700'
                          : 'bg-gray-100 border-gray-200'
                      }`}>
                        <span className={`text-xs ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>Level {user.xpLevel}</span>
                      </div>
                    </div>

                    {/* Hover Actions */}
                    {hoveredUser === user.id && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6">
                        <div className="space-y-2">
                          <button 
                            onClick={() => setSelectedProfile(user)}
                            className="w-full px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-sm text-white hover:bg-white/20 transition-all duration-200 flex items-center justify-center gap-2"
                          >
                            <Eye className="w-4 h-4" />
                            View Profile
                          </button>

                          <button
                            onClick={() => handleUserInteraction(user.id)}
                            disabled={!canInviteNow}
                            className={`w-full px-4 py-2 rounded-xl text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                              canInviteNow
                                ? 'bg-white text-zinc-950 hover:bg-zinc-100'
                                : 'bg-white/5 text-zinc-600 cursor-not-allowed'
                            }`}
                          >
                            <UserPlus className="w-4 h-4" />
                            {canInviteNow ? 'Send Invite' : 'Locked'}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <RightPanel
          isOpen={panelOpen}
          onToggle={() => setPanelOpen(!panelOpen)}
          mode="public"
          theme={theme}
        />
      </div>

      {/* Fullscreen Student Video View */}
      {selectedProfile && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col">
          {/* Top Header Bar with Student Info */}
          <div className="absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-black/80 to-transparent">
            <div className="flex items-center justify-between">
              {/* Left side - Student info chips */}
              <div className="flex items-center gap-2 flex-wrap">
                {/* Name */}
                <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                  <span className="text-white text-sm">{selectedProfile.name}</span>
                </div>

                {/* Status */}
                <div className={`px-3 py-2 rounded-full backdrop-blur-md border flex items-center gap-2 ${
                  selectedProfile.status === 'Studying'
                    ? 'bg-emerald-500/20 border-emerald-500/40'
                    : 'bg-blue-500/20 border-blue-500/40'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${
                    selectedProfile.status === 'Studying' ? 'bg-emerald-400' : 'bg-blue-400'
                  }`} />
                  <span className="text-white text-xs">{selectedProfile.status}</span>
                </div>

                {/* Subject */}
                <div className="px-3 py-2 bg-purple-500/20 backdrop-blur-md rounded-full border border-purple-500/40 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-purple-300" />
                  <span className="text-white text-xs">{selectedProfile.currentSubject}</span>
                </div>

                {/* Level */}
                <div className="px-3 py-2 bg-emerald-500/20 backdrop-blur-md rounded-full border border-emerald-500/40 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-300" />
                  <span className="text-white text-xs">Level {selectedProfile.xpLevel}</span>
                </div>

                {/* Rank */}
                <div className="px-3 py-2 bg-amber-500/20 backdrop-blur-md rounded-full border border-amber-500/40 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-amber-300" />
                  <span className="text-white text-xs">#{selectedProfile.rank}</span>
                </div>

                {/* Streak */}
                <div className="px-3 py-2 bg-orange-500/20 backdrop-blur-md rounded-full border border-orange-500/40 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-orange-300" />
                  <span className="text-white text-xs">{selectedProfile.streak}d</span>
                </div>

                {/* Gifts */}
                <div className="px-3 py-2 bg-pink-500/20 backdrop-blur-md rounded-full border border-pink-500/40 flex items-center gap-1.5">
                  <Gift className="w-3.5 h-3.5 text-pink-300" />
                  <span className="text-white text-xs">{selectedProfile.giftsReceived} gifts</span>
                </div>

                {/* Quote Icon - Today's Thought */}
                {selectedProfile.todaysThought && (
                  <button
                    onMouseEnter={() => setShowThoughtOverlay(true)}
                    onMouseLeave={() => setShowThoughtOverlay(false)}
                    className="px-3 py-2 bg-blue-500/20 backdrop-blur-md rounded-full border border-blue-500/40 flex items-center gap-1.5 hover:bg-blue-500/30 transition-all duration-200"
                  >
                    <span className="text-blue-200 text-base leading-none">❝</span>
                  </button>
                )}
              </div>

              {/* Right side - Close button */}
              <button
                onClick={() => setSelectedProfile(null)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-200"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Floating Thought Overlay */}
          {showThoughtOverlay && selectedProfile.todaysThought && (
            <div className="absolute top-24 left-1/2 -translate-x-1/2 z-20 max-w-2xl px-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="px-6 py-4 bg-white/20 backdrop-blur-xl rounded-full border border-white/30 shadow-2xl">
                <p className="text-white text-center">
                  {selectedProfile.todaysThought}
                </p>
              </div>
            </div>
          )}

          {/* Main Video Area */}
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="w-full max-w-6xl aspect-video bg-zinc-900 rounded-2xl border-2 border-zinc-800 flex items-center justify-center relative overflow-hidden">
              {/* Simulated Video Feed */}
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 via-zinc-900 to-black" />
              <div className="relative z-10 flex flex-col items-center justify-center">
                <div className="w-48 h-48 rounded-full bg-zinc-800 border-4 border-zinc-700 flex items-center justify-center mb-4">
                  <UserIcon className="w-24 h-24 text-zinc-600" />
                </div>
                <div className="text-white text-lg mb-2">{selectedProfile.name}</div>
                <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                  <span className="text-zinc-400 text-sm">Live Video Feed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Animated Lotto Gift Button - Bottom Right Corner */}
          <button
            onClick={() => setShowGiftingWidget(true)}
            className="fixed bottom-8 right-8 group cursor-pointer z-20"
          >
            {/* Animated Gift Container */}
            <div className="relative">
              {/* Pulsing Ring Animation */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 opacity-75 animate-ping" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 opacity-50 animate-pulse" />
              
              {/* Main Gift Button */}
              <div className="relative bg-gradient-to-br from-pink-500 via-purple-500 to-pink-600 rounded-2xl p-6 shadow-2xl border-2 border-white/30 backdrop-blur-md transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 animate-bounce">
                {/* Sparkle Effects */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-300 rounded-full animate-ping" />
                <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white rounded-full animate-pulse" />
                
                {/* Gift Icon */}
                <Gift className="w-10 h-10 text-white drop-shadow-lg animate-pulse" />
                
                {/* Gift Count Badge */}
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-3 py-1 rounded-full shadow-lg border-2 border-white animate-bounce">
                  {selectedProfile.giftsReceived}
                </div>
              </div>

              {/* Floating Label */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="bg-black/90 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full border border-white/20">
                  Send Gift 🎁
                </div>
              </div>
            </div>
          </button>

          {/* Floating Emoji Animations */}
          {floatingEmojis.map((emoji) => (
            <div
              key={emoji.id}
              className="fixed z-30 pointer-events-none animate-float-up"
              style={{
                left: `calc(50% + ${emoji.x}px)`,
                top: `calc(50% + ${emoji.y}px)`,
                fontSize: '4rem',
                animation: 'float-up 2s ease-out forwards'
              }}
            >
              {emoji.emoji}
            </div>
          ))}
        </div>
      )}

      {/* Compact Gifting Popover */}
      {showGiftingWidget && selectedProfile && (
        <div className="fixed bottom-32 right-8 z-50 w-72 animate-in zoom-in-95 duration-200">
          <div className="bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 rounded-2xl border-2 border-zinc-700/50 shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-b border-zinc-700/50">
              <div className="flex items-center justify-between">
                <h4 className="text-white flex items-center gap-2">
                  <Gift className="w-4 h-4 text-pink-400" />
                  Send Gift
                </h4>
                <button 
                  onClick={() => {
                    setShowGiftingWidget(false);
                    setSelectedGift(null);
                  }}
                  className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            {/* Gift Grid */}
            <div className="p-3">
              <div className="grid grid-cols-3 gap-2">
                {gifts.map((gift) => (
                  <button
                    key={gift.id}
                    onClick={() => setSelectedGift(gift)}
                    className={`p-3 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${
                      selectedGift?.id === gift.id
                        ? 'border-purple-500 bg-purple-500/20 shadow-lg shadow-purple-500/30'
                        : 'border-zinc-700 bg-zinc-800/50 hover:border-zinc-600'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-2xl">{gift.emoji}</span>
                      <div className="text-center">
                        <div className="text-xs text-emerald-400">{gift.credits}💳</div>
                        <div className="text-[10px] text-zinc-500">+{gift.xp} XP</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Summary & Send */}
            <div className="p-3 border-t border-zinc-700/50 bg-black/20">
              {/* Summary Row */}
              <div className="flex items-center justify-between mb-3 text-xs">
                <span className="text-zinc-400">Your Credits:</span>
                <span className="text-white px-2 py-1 bg-zinc-800 rounded-lg">{userCredits} 💳</span>
              </div>

              {selectedGift && (
                <div className="flex items-center justify-between mb-3 text-xs p-2 bg-purple-500/10 rounded-lg border border-purple-500/30">
                  <span className="text-zinc-300">Selected:</span>
                  <span className="text-white">
                    {selectedGift.emoji} {selectedGift.name} ({selectedGift.credits}💳)
                  </span>
                </div>
              )}

              {/* Send Button */}
              <button
                onClick={handleSendGift}
                disabled={!selectedGift || userCredits < (selectedGift?.credits || 0)}
                className={`w-full py-2.5 rounded-xl text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                  selectedGift && userCredits >= selectedGift.credits
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg shadow-purple-500/30'
                    : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                }`}
              >
                <Gift className="w-4 h-4" />
                {selectedGift ? `Send ${selectedGift.emoji}` : 'Select a Gift'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}