import { useState, useEffect } from 'react';
import { LiveRoomHeader } from './LiveRoomHeader';
import { RightPanel } from './RightPanel';
import { FocusMode } from './FocusMode';
import { User as UserIcon, X } from 'lucide-react';

interface SoloRoomProps {
  onToggleRoom: (mode: 'solo' | 'public') => void;
  onEndSession: (data: any) => void;
  theme: 'light' | 'dark';
}

interface InvitedUser {
  id: string;
  name: string;
  avatar?: string;
}

export function SoloRoom({ onToggleRoom, onEndSession, theme }: SoloRoomProps) {
  const [panelOpen, setPanelOpen] = useState(true);
  const [focusMode, setFocusMode] = useState(false);
  const [timer, setTimer] = useState(0);
  const [invitedUsers, setInvitedUsers] = useState<InvitedUser[]>([]);

  // Session stats
  const [sessionStats] = useState({
    xp: 145,
    gifts: 3,
    subject: 'Advanced Mathematics',
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

  const handleEndSession = () => {
    onEndSession({
      focusTime: timer,
      xpEarned: 25,
      helpfulGiven: 12,
      helpfulReceived: 8,
    });
  };

  const handleRemoveUser = (userId: string) => {
    setInvitedUsers(invitedUsers.filter((u) => u.id !== userId));
  };

  if (focusMode) {
    return (
      <>
        <LiveRoomHeader
          mode="solo"
          onToggleMode={onToggleRoom}
          xp={sessionStats.xp}
          gifts={sessionStats.gifts}
          subject={sessionStats.subject}
          timer={formatTimer(timer)}
          helpfulPercentage={sessionStats.helpfulPercentage}
          notifications={sessionStats.notifications}
          theme={theme}
        />
        <FocusMode
          onExitFocus={() => setFocusMode(false)}
          timer={formatTimer(timer)}
          onEndSession={handleEndSession}
          theme={theme}
        />
      </>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <LiveRoomHeader
        mode="solo"
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
        {/* Main Video Area */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 transition-all duration-300 flex flex-col gap-4 sm:gap-6">
          {/* Video Grid - Responsive: 1 col mobile, 2 cols tablet/desktop */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-7xl mx-auto w-full">
            {/* Host Box - Top Left with colored border */}
            <div className={`relative rounded-xl border-2 border-emerald-500 overflow-hidden flex items-center justify-center ${
              theme === 'dark' ? 'bg-zinc-900' : 'bg-white shadow-lg'
            }`}>
              <div className="text-center">
                <div className={`w-24 h-24 rounded-full ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-gray-100 border-gray-300'} border flex items-center justify-center mx-auto mb-4`}>
                  <UserIcon className={`w-12 h-12 ${theme === 'dark' ? 'text-zinc-600' : 'text-gray-400'}`} />
                </div>
                <p className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>You (Host)</p>
              </div>
              <div className="absolute top-4 left-4 px-3 py-1.5 bg-emerald-500 text-white text-xs rounded-lg">
                Host
              </div>
            </div>

            {/* Invite Slot 1 */}
            <div className={`relative rounded-xl border overflow-hidden flex items-center justify-center ${
              theme === 'dark'
                ? 'bg-zinc-900/50 border-zinc-800'
                : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="text-center">
                <div className={`w-20 h-20 rounded-full ${theme === 'dark' ? 'bg-zinc-800/50 border-zinc-700/50' : 'bg-gray-100/50 border-gray-300/50'} border flex items-center justify-center mx-auto mb-3`}>
                  <X className={`w-10 h-10 ${theme === 'dark' ? 'text-zinc-700' : 'text-gray-400'}`} />
                </div>
                <p className={`text-sm ${theme === 'dark' ? 'text-zinc-600' : 'text-gray-400'}`}>Invite</p>
              </div>
            </div>

            {/* Invite Slot 2 */}
            <div className={`relative rounded-xl border overflow-hidden flex items-center justify-center ${
              theme === 'dark'
                ? 'bg-zinc-900/50 border-zinc-800'
                : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="text-center">
                <div className={`w-20 h-20 rounded-full ${theme === 'dark' ? 'bg-zinc-800/50 border-zinc-700/50' : 'bg-gray-100/50 border-gray-300/50'} border flex items-center justify-center mx-auto mb-3`}>
                  <X className={`w-10 h-10 ${theme === 'dark' ? 'text-zinc-700' : 'text-gray-400'}`} />
                </div>
                <p className={`text-sm ${theme === 'dark' ? 'text-zinc-600' : 'text-gray-400'}`}>Invite</p>
              </div>
            </div>

            {/* Invite Slot 3 */}
            <div className={`relative rounded-xl border overflow-hidden flex items-center justify-center ${
              theme === 'dark'
                ? 'bg-zinc-900/50 border-zinc-800'
                : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="text-center">
                <div className={`w-20 h-20 rounded-full ${theme === 'dark' ? 'bg-zinc-800/50 border-zinc-700/50' : 'bg-gray-100/50 border-gray-300/50'} border flex items-center justify-center mx-auto mb-3`}>
                  <X className={`w-10 h-10 ${theme === 'dark' ? 'text-zinc-700' : 'text-gray-400'}`} />
                </div>
                <p className={`text-sm ${theme === 'dark' ? 'text-zinc-600' : 'text-gray-400'}`}>Invite</p>
              </div>
            </div>
          </div>

          {/* Control Bar Below Grid */}
          <div className="flex items-center justify-end max-w-7xl mx-auto w-full">
            <button
              onClick={handleEndSession}
              className={`px-6 py-2.5 rounded-xl transition-all duration-200 ${
                theme === 'dark'
                  ? 'bg-red-600/10 border-red-600/20 text-red-400 hover:bg-red-600/20'
                  : 'bg-red-600 border-red-600 text-white hover:bg-red-700'
              } border`}
            >
              End Session
            </button>
          </div>

          {/* Invited Users Chips */}
          {invitedUsers.length > 0 && (
            <div className="flex gap-3 max-w-7xl mx-auto w-full">
              {invitedUsers.map((user) => (
                <div
                  key={user.id}
                  className={`w-48 h-36 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'} border rounded-xl overflow-hidden relative group`}
                >
                  <div className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br ${theme === 'dark' ? 'from-zinc-900 to-zinc-950' : 'from-gray-50 to-gray-100'}`}>
                    <div className="text-center">
                      <div className={`w-16 h-16 rounded-full ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-gray-100 border-gray-300'} border flex items-center justify-center mx-auto mb-2`}>
                        <UserIcon className={`w-8 h-8 ${theme === 'dark' ? 'text-zinc-600' : 'text-gray-400'}`} />
                      </div>
                      <p className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{user.name}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveUser(user.id)}
                    className={`absolute top-2 right-2 w-7 h-7 ${theme === 'dark' ? 'bg-zinc-950/80 border-zinc-700' : 'bg-white/80 border-gray-300'} backdrop-blur-sm border rounded-lg opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-200`}
                  >
                    <X className={`w-4 h-4 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Panel */}
        <RightPanel
          isOpen={panelOpen}
          onToggle={() => setPanelOpen(!panelOpen)}
          onEnterFocus={() => setFocusMode(true)}
          mode="solo"
          theme={theme}
        />
      </div>
    </div>
  );
}
