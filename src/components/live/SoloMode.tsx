import { useState, useEffect } from 'react';
import { AIBuddyPanel } from './AIBuddyPanel';
import { Play, Pause, SkipForward, Clock, Target } from 'lucide-react';

export function SoloMode() {
  const [buddyOpen, setBuddyOpen] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState('Lofi Hip Hop Radio');
  const [sessionActive, setSessionActive] = useState(false);
  const [timer, setTimer] = useState(0);
  const [goals, setGoals] = useState(['', '', '']);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (sessionActive) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [sessionActive]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  const playlists = [
    { name: 'Lofi Hip Hop Radio', genre: 'Lofi' },
    { name: 'Rain Sounds', genre: 'Nature' },
    { name: 'Piano Focus', genre: 'Classical' },
    { name: 'Coffee Shop Ambience', genre: 'Ambient' },
  ];

  return (
    <div className="h-full flex relative">
      {/* Background with blur */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1673955520987-1ee81e44e1eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWlueSUyMHdpbmRvdyUyMGFlc3RoZXRpY3xlbnwxfHx8fDE3NjQyNDQ5Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080')`,
          filter: 'blur(8px) brightness(0.4)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center p-8">
        <div className="max-w-2xl w-full">
          {/* Welcome Text */}
          <div className="text-center mb-8">
            <h2 className="text-white mb-2">My Focus Space</h2>
            <p className="text-zinc-400">Your personal study sanctuary</p>
          </div>

          {/* Focus Card */}
          <div className="p-8 bg-zinc-900/90 backdrop-blur-sm border border-zinc-800 rounded-2xl mb-6">
            {/* Topic Input */}
            <div className="mb-6">
              <label className="text-sm text-zinc-400 mb-2 block">Today's Topic</label>
              <input
                type="text"
                placeholder="What are you studying today?"
                defaultValue="Advanced Calculus - Integration Techniques"
                className="w-full px-4 py-3 bg-zinc-950/50 border border-zinc-800 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-700 transition-all duration-300"
              />
            </div>

            {/* Timer Display */}
            <div className="mb-6 p-6 bg-zinc-950/50 border border-zinc-800 rounded-xl text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-emerald-500" />
                <span className="text-sm text-zinc-400">Focus Time</span>
              </div>
              <div className="text-4xl text-white tabular-nums mb-4">{formatTime(timer)}</div>
              <div className="flex gap-3 justify-center">
                {!sessionActive ? (
                  <button
                    onClick={() => setSessionActive(true)}
                    className="px-6 py-2.5 bg-emerald-600 rounded-xl text-white hover:bg-emerald-500 transition-all duration-300 flex items-center gap-2"
                  >
                    <Play className="w-4 h-4" />
                    Start Session
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => setSessionActive(false)}
                      className="px-6 py-2.5 bg-zinc-800 border border-zinc-700 rounded-xl text-zinc-300 hover:bg-zinc-700 transition-all duration-300 flex items-center gap-2"
                    >
                      <Pause className="w-4 h-4" />
                      Pause
                    </button>
                    <button
                      onClick={() => {
                        setSessionActive(false);
                        setTimer(0);
                      }}
                      className="px-6 py-2.5 bg-zinc-800 border border-zinc-700 rounded-xl text-zinc-300 hover:bg-zinc-700 transition-all duration-300"
                    >
                      Reset
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Goals */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-4 h-4 text-emerald-500" />
                <label className="text-sm text-zinc-400">Today's Goals</label>
              </div>
              <div className="space-y-2">
                {goals.map((goal, idx) => (
                  <input
                    key={idx}
                    type="text"
                    value={goal}
                    onChange={(e) => {
                      const newGoals = [...goals];
                      newGoals[idx] = e.target.value;
                      setGoals(newGoals);
                    }}
                    placeholder={`Goal ${idx + 1}...`}
                    className="w-full px-4 py-2.5 bg-zinc-950/50 border border-zinc-800 rounded-xl text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-700 transition-all duration-300"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Spotify Mini Player */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-zinc-800 bg-zinc-950/90 backdrop-blur-sm px-6 py-4 z-20">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-600 to-emerald-700 flex items-center justify-center">
              <span className="text-xl">🎵</span>
            </div>
            <div>
              <p className="text-sm text-white">{currentTrack}</p>
              <p className="text-xs text-zinc-500">Focus Music</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-10 h-10 rounded-full bg-emerald-600 hover:bg-emerald-500 flex items-center justify-center transition-all duration-300"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-white" />
              ) : (
                <Play className="w-5 h-5 text-white ml-0.5" />
              )}
            </button>
            <button className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 flex items-center justify-center transition-all duration-300">
              <SkipForward className="w-5 h-5 text-zinc-400" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            {playlists.slice(0, 4).map((playlist, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentTrack(playlist.name)}
                className={`px-4 py-2 rounded-xl text-xs transition-all duration-300 ${
                  currentTrack === playlist.name
                    ? 'bg-emerald-600 text-white'
                    : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:bg-zinc-800'
                }`}
              >
                {playlist.genre}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - AI Buddy */}
      <AIBuddyPanel isOpen={buddyOpen} onToggle={() => setBuddyOpen(!buddyOpen)} />
    </div>
  );
}
