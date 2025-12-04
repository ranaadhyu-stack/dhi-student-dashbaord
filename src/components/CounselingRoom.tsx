import React, { useState, useRef, useEffect } from 'react';
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  Phone,
  PhoneOff,
  Headphones,
  StickyNote,
  PenTool,
  Music,
  Play,
  Pause,
  Download,
  Save,
  LayoutGrid,
  Circle,
  User,
  TrendingUp,
  Activity,
  Heart,
  Moon,
  UtensilsCrossed,
  BookOpen,
  AlertCircle,
} from 'lucide-react';
import { useNotifications } from '../contexts/NotificationContext';

interface CounselingRoomProps {
  theme: 'light' | 'dark';
  variant?: 'student' | 'counselor';
}

export const CounselingRoom: React.FC<CounselingRoomProps> = ({ theme, variant = 'student' }) => {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isRecording, setIsRecording] = useState(true);
  const [timerRunning, setTimerRunning] = useState(true);
  const [timerSeconds, setTimerSeconds] = useState(1425); // 23:45
  const [activeTab, setActiveTab] = useState<'notes' | 'whiteboard' | 'music'>('notes');
  const [notes, setNotes] = useState('');
  const [isDrawing, setIsDrawing] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState('calm-focus');
  const { addNotification } = useNotifications();
  
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Timer effect
  useEffect(() => {
    if (!timerRunning) return;
    
    const interval = setInterval(() => {
      setTimerSeconds(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timerRunning]);

  const formatTime = (seconds: number): string => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Whiteboard functions
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'whiteboard-snapshot.png';
    link.href = url;
    link.click();
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.strokeStyle = theme === 'dark' ? '#10b981' : '#059669';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const playlists = [
    { id: 'calm-focus', name: 'Calm Focus', tracks: 12 },
    { id: 'ambient-peace', name: 'Ambient Peace', tracks: 8 },
    { id: 'nature-sounds', name: 'Nature Sounds', tracks: 15 },
    { id: 'meditation', name: 'Guided Meditation', tracks: 6 },
  ];

  const studentData = {
    name: 'Priya Sharma',
    class: '12th Grade - Science',
    dashboardId: 'STU-2024-1234',
    moodTrend: [3, 3, 4, 3, 2, 3, 4, 4, 3, 2, 3, 3, 4, 3],
    moodSummary: 'Mostly stable, mild stress',
    stressLevel: 65, // 0-100
    sleepConsistency: 72,
    dietConsistency: 85,
    studyLoad: 78,
    flags: [
      'Late-night studying 4 days this week',
      'Reported exam stress 3 times last month',
      'Missing breakfast regularly',
    ],
  };

  return (
    <div
      className={`flex flex-col h-screen ${
        theme === 'dark' ? 'bg-zinc-950 text-zinc-100' : 'bg-gray-50 text-gray-900'
      }`}
    >
      {/* Header */}
      <div
        className={`border-b px-6 py-4 ${
          theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Left: Title */}
          <div>
            <h2 className="text-lg">
              {variant === 'student' ? 'Counseling Session' : `DHI Counseling – Student: ${studentData.name}`}
            </h2>
          </div>

          {/* Center: Counselor Details */}
          <div className="flex-1 flex flex-col items-center">
            <div className="flex items-center gap-2">
              <span className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>
                Counselor: Dr. Sharma
              </span>
              <span className={theme === 'dark' ? 'text-zinc-600' : 'text-gray-400'}>·</span>
              <span className={theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}>
                Topic: Exam Stress
              </span>
            </div>
            <div className={`text-xs mt-1 ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
              Email: dr.sharma@example.com · Phone: +91-98XXXXXX
            </div>
          </div>

          {/* Right: Timer and Recording */}
          <div className="flex items-center gap-3">
            {/* Timer */}
            <div className="flex items-center gap-2">
              <div
                className={`px-4 py-2 rounded-full text-sm font-mono ${
                  theme === 'dark' ? 'bg-zinc-800 text-zinc-300' : 'bg-gray-100 text-gray-700'
                }`}
              >
                {formatTime(timerSeconds)}
              </div>
              <button
                onClick={() => setTimerRunning(!timerRunning)}
                className={`px-4 py-2 rounded-full text-xs transition-colors ${
                  theme === 'dark'
                    ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {timerRunning ? 'Stop' : 'Start'}
              </button>
            </div>

            {/* Recording Badge */}
            <button
              onClick={() => setIsRecording(!isRecording)}
              className={`px-3 py-2 rounded-full text-xs flex items-center gap-2 transition-colors ${
                isRecording
                  ? theme === 'dark'
                    ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30'
                    : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                  : theme === 'dark'
                  ? 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Circle className={`w-2 h-2 ${isRecording ? 'fill-current animate-pulse' : ''}`} />
              Recording {isRecording ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left + Center: Video and Tools */}
        <div className="flex-1 flex gap-4 p-6 overflow-hidden">
          {/* Video Area */}
          <div className="flex-[2] flex flex-col gap-4">
            {/* Video Frame */}
            <div
              className={`flex-1 rounded-2xl overflow-hidden relative ${
                theme === 'dark' ? 'bg-zinc-900' : 'bg-gray-100'
              }`}
            >
              {isVideoOn ? (
                <div className="w-full h-full flex items-center justify-center">
                  <div
                    className={`text-center ${theme === 'dark' ? 'text-zinc-600' : 'text-gray-400'}`}
                  >
                    <Video className="w-16 h-16 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Video Feed Placeholder</p>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-32 h-32 rounded-full mb-4 flex items-center justify-center ${
                        theme === 'dark'
                          ? 'bg-gradient-to-br from-teal-500/20 to-emerald-500/20'
                          : 'bg-gradient-to-br from-teal-100 to-emerald-100'
                      }`}
                    >
                      <User
                        className={`w-16 h-16 ${
                          theme === 'dark' ? 'text-teal-400' : 'text-teal-600'
                        }`}
                      />
                    </div>
                    <p className={theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}>
                      Dr. Sharma
                    </p>
                    <p className={`text-sm ${theme === 'dark' ? 'text-zinc-600' : 'text-gray-400'}`}>
                      Audio Only Mode
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Call Controls */}
            <div
              className={`flex items-center justify-center gap-3 p-4 rounded-xl ${
                theme === 'dark' ? 'bg-zinc-900' : 'bg-white border border-gray-200'
              }`}
            >
              {/* Mute/Unmute */}
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                  isMuted
                    ? theme === 'dark'
                      ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                      : 'bg-red-50 text-red-600 hover:bg-red-100'
                    : theme === 'dark'
                    ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>

              {/* Video On/Off */}
              <button
                onClick={() => setIsVideoOn(!isVideoOn)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                  !isVideoOn
                    ? theme === 'dark'
                      ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                      : 'bg-red-50 text-red-600 hover:bg-red-100'
                    : theme === 'dark'
                    ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
              </button>

              {/* Audio Mode */}
              <button
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                  theme === 'dark'
                    ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Headphones className="w-5 h-5" />
              </button>

              {/* Switch Layout */}
              <button
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                  theme === 'dark'
                    ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <LayoutGrid className="w-5 h-5" />
              </button>

              {/* End Call */}
              <button
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                  theme === 'dark'
                    ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                    : 'bg-red-50 text-red-600 hover:bg-red-100'
                }`}
              >
                <PhoneOff className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Tools Panel */}
          <div
            className={`w-96 rounded-2xl overflow-hidden ${
              theme === 'dark' ? 'bg-zinc-900 border border-zinc-800' : 'bg-white border border-gray-200'
            }`}
          >
            {/* Tabs */}
            <div
              className={`flex border-b ${
                theme === 'dark' ? 'border-zinc-800' : 'border-gray-200'
              }`}
            >
              <button
                onClick={() => setActiveTab('notes')}
                className={`flex-1 px-4 py-3 text-sm flex items-center justify-center gap-2 transition-colors ${
                  activeTab === 'notes'
                    ? theme === 'dark'
                      ? 'bg-teal-500/10 text-teal-400 border-b-2 border-teal-400'
                      : 'bg-teal-50 text-teal-600 border-b-2 border-teal-600'
                    : theme === 'dark'
                    ? 'text-zinc-400 hover:text-zinc-300'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <StickyNote className="w-4 h-4" />
                Notes
              </button>
              <button
                onClick={() => setActiveTab('whiteboard')}
                className={`flex-1 px-4 py-3 text-sm flex items-center justify-center gap-2 transition-colors ${
                  activeTab === 'whiteboard'
                    ? theme === 'dark'
                      ? 'bg-teal-500/10 text-teal-400 border-b-2 border-teal-400'
                      : 'bg-teal-50 text-teal-600 border-b-2 border-teal-600'
                    : theme === 'dark'
                    ? 'text-zinc-400 hover:text-zinc-300'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <PenTool className="w-4 h-4" />
                Whiteboard
              </button>
              <button
                onClick={() => setActiveTab('music')}
                className={`flex-1 px-4 py-3 text-sm flex items-center justify-center gap-2 transition-colors ${
                  activeTab === 'music'
                    ? theme === 'dark'
                      ? 'bg-teal-500/10 text-teal-400 border-b-2 border-teal-400'
                      : 'bg-teal-50 text-teal-600 border-b-2 border-teal-600'
                    : theme === 'dark'
                    ? 'text-zinc-400 hover:text-zinc-300'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Music className="w-4 h-4" />
                Music
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-4 h-[calc(100%-57px)] overflow-auto">
              {activeTab === 'notes' && (
                <div className="h-full flex flex-col">
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Shared session notes..."
                    className={`flex-1 w-full p-3 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 ${
                      theme === 'dark'
                        ? 'bg-zinc-800 text-zinc-100 placeholder-zinc-500 focus:ring-teal-500/50'
                        : 'bg-gray-50 text-gray-900 placeholder-gray-400 focus:ring-teal-500'
                    }`}
                  />
                  <button
                    onClick={() => {
                      addNotification({
                        title: 'Session Notes Saved',
                        message: 'Your counseling session notes have been saved securely.',
                        type: 'success',
                        tab: 'counseling',
                      });
                    }}
                    className={`mt-3 w-full py-2.5 rounded-lg text-sm flex items-center justify-center gap-2 transition-colors ${
                      theme === 'dark'
                        ? 'bg-teal-600 text-white hover:bg-teal-500'
                        : 'bg-teal-600 text-white hover:bg-teal-700'
                    }`}
                  >
                    <Save className="w-4 h-4" />
                    Save Notes
                  </button>
                </div>
              )}

              {activeTab === 'whiteboard' && (
                <div className="h-full flex flex-col">
                  <canvas
                    ref={canvasRef}
                    width={352}
                    height={400}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    className={`flex-1 rounded-lg cursor-crosshair ${
                      theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-50'
                    }`}
                  />
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={clearCanvas}
                      className={`flex-1 py-2 rounded-lg text-sm transition-colors ${
                        theme === 'dark'
                          ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Clear
                    </button>
                    <button
                      onClick={downloadCanvas}
                      className={`flex-1 py-2 rounded-lg text-sm flex items-center justify-center gap-2 transition-colors ${
                        theme === 'dark'
                          ? 'bg-teal-600 text-white hover:bg-teal-500'
                          : 'bg-teal-600 text-white hover:bg-teal-700'
                      }`}
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'music' && (
                <div className="space-y-4">
                  {/* Playlist Selector */}
                  <div>
                    <label className={`text-xs mb-2 block ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                      Select Playlist
                    </label>
                    <select
                      value={selectedPlaylist}
                      onChange={(e) => setSelectedPlaylist(e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 ${
                        theme === 'dark'
                          ? 'bg-zinc-800 text-zinc-100 focus:ring-teal-500/50'
                          : 'bg-gray-50 text-gray-900 focus:ring-teal-500'
                      }`}
                    >
                      {playlists.map((playlist) => (
                        <option key={playlist.id} value={playlist.id}>
                          {playlist.name} ({playlist.tracks} tracks)
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Player */}
                  <div
                    className={`p-4 rounded-lg ${
                      theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className={`text-sm ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}>
                          {playlists.find((p) => p.id === selectedPlaylist)?.name}
                        </p>
                        <p className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                          Track 1 of {playlists.find((p) => p.id === selectedPlaylist)?.tracks}
                        </p>
                      </div>
                      <button
                        onClick={() => setIsMusicPlaying(!isMusicPlaying)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                          theme === 'dark'
                            ? 'bg-teal-600 text-white hover:bg-teal-500'
                            : 'bg-teal-600 text-white hover:bg-teal-700'
                        }`}
                      >
                        {isMusicPlaying ? (
                          <Pause className="w-5 h-5" />
                        ) : (
                          <Play className="w-5 h-5 ml-0.5" />
                        )}
                      </button>
                    </div>
                    {/* Progress Bar */}
                    <div
                      className={`h-1 rounded-full overflow-hidden ${
                        theme === 'dark' ? 'bg-zinc-700' : 'bg-gray-200'
                      }`}
                    >
                      <div
                        className={`h-full ${
                          theme === 'dark' ? 'bg-teal-500' : 'bg-teal-600'
                        }`}
                        style={{ width: isMusicPlaying ? '35%' : '0%' }}
                      />
                    </div>
                  </div>

                  {/* Info */}
                  <p className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                    Ambient music to create a calm and comfortable environment during the session.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Analytics Panel */}
        <div
          className={`w-80 p-6 space-y-4 overflow-auto border-l ${
            theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'
          }`}
        >
          <h3 className="text-lg mb-4">Student Snapshot</h3>

          {/* Card 1: Basic Info */}
          <div
            className={`p-4 rounded-xl ${
              theme === 'dark' ? 'bg-zinc-800 border border-zinc-700' : 'bg-gray-50 border border-gray-200'
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  theme === 'dark'
                    ? 'bg-gradient-to-br from-teal-500/20 to-emerald-500/20'
                    : 'bg-gradient-to-br from-teal-100 to-emerald-100'
                }`}
              >
                <User className={`w-6 h-6 ${theme === 'dark' ? 'text-teal-400' : 'text-teal-600'}`} />
              </div>
              <div className="flex-1">
                <p className={theme === 'dark' ? 'text-zinc-100' : 'text-gray-900'}>
                  {studentData.name}
                </p>
                <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                  {studentData.class}
                </p>
                <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                  ID: {studentData.dashboardId}
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: Mood Trend */}
          <div
            className={`p-4 rounded-xl ${
              theme === 'dark' ? 'bg-zinc-800 border border-zinc-700' : 'bg-gray-50 border border-gray-200'
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className={`w-4 h-4 ${theme === 'dark' ? 'text-teal-400' : 'text-teal-600'}`} />
              <h4 className="text-sm">Mood Trend (Last 30 days)</h4>
            </div>
            {/* Mini Line Graph */}
            <div className="h-16 flex items-end gap-1 mb-2">
              {studentData.moodTrend.map((value, index) => (
                <div
                  key={index}
                  className={`flex-1 rounded-t transition-all ${
                    theme === 'dark' ? 'bg-teal-500/30' : 'bg-teal-200'
                  }`}
                  style={{ height: `${(value / 4) * 100}%` }}
                />
              ))}
            </div>
            <p className={`text-xs ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
              😊 {studentData.moodSummary}
            </p>
          </div>

          {/* Card 3: Stress Indicator */}
          <div
            className={`p-4 rounded-xl ${
              theme === 'dark' ? 'bg-zinc-800 border border-zinc-700' : 'bg-gray-50 border border-gray-200'
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <Activity className={`w-4 h-4 ${theme === 'dark' ? 'text-teal-400' : 'text-teal-600'}`} />
              <h4 className="text-sm">Stress Indicator</h4>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className={theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}>Low</span>
                <span className={theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}>High</span>
              </div>
              <div
                className={`h-2 rounded-full overflow-hidden ${
                  theme === 'dark' ? 'bg-zinc-700' : 'bg-gray-200'
                }`}
              >
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 via-yellow-500 to-red-500"
                  style={{ width: `${studentData.stressLevel}%` }}
                />
              </div>
              <p className={`text-xs text-center ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                Current: {studentData.stressLevel}% (Moderate)
              </p>
            </div>
          </div>

          {/* Card 4: Wellness Overview */}
          <div
            className={`p-4 rounded-xl ${
              theme === 'dark' ? 'bg-zinc-800 border border-zinc-700' : 'bg-gray-50 border border-gray-200'
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <Heart className={`w-4 h-4 ${theme === 'dark' ? 'text-teal-400' : 'text-teal-600'}`} />
              <h4 className="text-sm">Wellness Overview</h4>
            </div>
            <div className="space-y-3">
              {/* Sleep */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <div className="flex items-center gap-1.5">
                    <Moon className={`w-3.5 h-3.5 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`} />
                    <span className={theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}>Sleep</span>
                  </div>
                  <span className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>
                    {studentData.sleepConsistency}%
                  </span>
                </div>
                <div
                  className={`h-1.5 rounded-full overflow-hidden ${
                    theme === 'dark' ? 'bg-zinc-700' : 'bg-gray-200'
                  }`}
                >
                  <div
                    className={`h-full ${theme === 'dark' ? 'bg-teal-500' : 'bg-teal-600'}`}
                    style={{ width: `${studentData.sleepConsistency}%` }}
                  />
                </div>
              </div>

              {/* Diet */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <div className="flex items-center gap-1.5">
                    <UtensilsCrossed className={`w-3.5 h-3.5 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`} />
                    <span className={theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}>Diet</span>
                  </div>
                  <span className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>
                    {studentData.dietConsistency}%
                  </span>
                </div>
                <div
                  className={`h-1.5 rounded-full overflow-hidden ${
                    theme === 'dark' ? 'bg-zinc-700' : 'bg-gray-200'
                  }`}
                >
                  <div
                    className={`h-full ${theme === 'dark' ? 'bg-teal-500' : 'bg-teal-600'}`}
                    style={{ width: `${studentData.dietConsistency}%` }}
                  />
                </div>
              </div>

              {/* Study Load */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <div className="flex items-center gap-1.5">
                    <BookOpen className={`w-3.5 h-3.5 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`} />
                    <span className={theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}>Study Load</span>
                  </div>
                  <span className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>
                    {studentData.studyLoad}%
                  </span>
                </div>
                <div
                  className={`h-1.5 rounded-full overflow-hidden ${
                    theme === 'dark' ? 'bg-zinc-700' : 'bg-gray-200'
                  }`}
                >
                  <div
                    className={`h-full ${theme === 'dark' ? 'bg-teal-500' : 'bg-teal-600'}`}
                    style={{ width: `${studentData.studyLoad}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Card 5: Important Flags */}
          <div
            className={`p-4 rounded-xl ${
              theme === 'dark' ? 'bg-zinc-800 border border-zinc-700' : 'bg-gray-50 border border-gray-200'
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className={`w-4 h-4 ${theme === 'dark' ? 'text-amber-400' : 'text-amber-600'}`} />
              <h4 className="text-sm">Important Flags</h4>
            </div>
            <ul className="space-y-2">
              {studentData.flags.map((flag, index) => (
                <li
                  key={index}
                  className={`text-xs flex items-start gap-2 ${
                    theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
                  }`}
                >
                  <span className={`mt-1 ${theme === 'dark' ? 'text-amber-400' : 'text-amber-600'}`}>
                    •
                  </span>
                  <span>{flag}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
