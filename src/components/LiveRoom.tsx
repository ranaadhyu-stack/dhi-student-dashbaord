import { useState } from 'react';
import { WelcomeScreen } from './liveroom/WelcomeScreen';
import { SoloRoom } from './liveroom/SoloRoom';
import { PublicRoom } from './liveroom/PublicRoom';
import { FocusMode } from './liveroom/FocusMode';
import { SessionSummary } from './liveroom/SessionSummary';
import { useNotifications } from '../contexts/NotificationContext';

type RoomState = 'welcome' | 'solo' | 'public' | 'focus';

interface LiveRoomProps {
  theme: 'light' | 'dark';
}

export function LiveRoom({ theme }: LiveRoomProps) {
  const [roomState, setRoomState] = useState<RoomState>('welcome');
  const [showSummary, setShowSummary] = useState(false);
  const [sessionData, setSessionData] = useState({
    focusTime: 0,
    xpEarned: 0,
    helpfulGiven: 0,
    helpfulReceived: 0,
  });
  const { addNotification } = useNotifications();

  const handleStartSolo = () => {
    setRoomState('solo');
    addNotification({
      title: 'Solo Session Started',
      message: 'You entered a solo study room. Focus and learn at your own pace!',
      type: 'info',
      tab: 'live',
    });
  };

  const handleEnterPublic = () => {
    setRoomState('public');
    addNotification({
      title: 'Public Room Joined',
      message: 'You joined a public study room. Collaborate with others!',
      type: 'info',
      tab: 'live',
    });
  };

  const handleStartFocus = () => {
    setRoomState('focus');
    addNotification({
      title: 'Focus Mode Activated',
      message: 'Focus mode started. Minimize distractions and stay concentrated!',
      type: 'success',
      tab: 'live',
    });
  };

  const handleToggleRoom = (mode: 'solo' | 'public') => {
    setRoomState(mode);
    addNotification({
      title: `Switched to ${mode === 'solo' ? 'Solo' : 'Public'} Room`,
      message: `You are now in ${mode === 'solo' ? 'a solo' : 'a public'} study room.`,
      type: 'info',
      tab: 'live',
    });
  };

  const handleEndSession = (data: typeof sessionData) => {
    setSessionData(data);
    setShowSummary(true);
    addNotification({
      title: 'Session Completed',
      message: `Great work! You earned ${data.xpEarned} XP in ${data.focusTime} minutes.`,
      type: 'success',
      tab: 'live',
    });
  };

  const handleCloseSummary = () => {
    setShowSummary(false);
    setRoomState('welcome');
  };

  return (
    <div className={`h-full ${theme === 'dark' ? 'bg-zinc-950' : 'bg-gray-50'}`}>
      {roomState === 'welcome' && (
        <WelcomeScreen onStartSolo={handleStartSolo} onEnterPublic={handleEnterPublic} onStartFocus={handleStartFocus} theme={theme} />
      )}

      {roomState === 'solo' && (
        <SoloRoom onToggleRoom={handleToggleRoom} onEndSession={handleEndSession} theme={theme} />
      )}

      {roomState === 'public' && (
        <PublicRoom onToggleRoom={handleToggleRoom} onEndSession={handleEndSession} theme={theme} />
      )}

      {roomState === 'focus' && (
        <FocusMode onEndSession={handleEndSession} theme={theme} />
      )}

      {showSummary && <SessionSummary data={sessionData} onClose={handleCloseSummary} theme={theme} />}
    </div>
  );
}
