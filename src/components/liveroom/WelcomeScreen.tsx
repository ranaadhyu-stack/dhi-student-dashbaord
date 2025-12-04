import { useState } from 'react';
import { Video, Mic, X, Sparkles } from 'lucide-react';

interface WelcomeScreenProps {
  onStartSolo: () => void;
  onEnterPublic: () => void;
  onStartFocus: () => void;
  theme: 'light' | 'dark';
}

export function WelcomeScreen({ onStartSolo, onEnterPublic, onStartFocus, theme }: WelcomeScreenProps) {
  const [showDeviceSelector, setShowDeviceSelector] = useState(false);
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [micEnabled, setMicEnabled] = useState(true);

  const userName = 'Student';

  return (
    <div className="h-full flex items-center justify-center p-4 sm:p-8">
      <div className="max-w-md w-full text-center">
        <h1 className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-3`}>Welcome, {userName}!</h1>
        <p className={`${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'} mb-8`}>
          Start your focus session or join the public room.
        </p>

        <div className="space-y-3">
          <button
            onClick={() => setShowDeviceSelector(true)}
            className={`w-full px-6 py-3.5 ${theme === 'dark' ? 'bg-white text-zinc-950 hover:bg-zinc-100' : 'bg-gray-900 text-white hover:bg-gray-800'} rounded-xl transition-all duration-200`}
          >
            Start Live Session
          </button>

          <button
            onClick={onEnterPublic}
            className={`w-full px-6 py-3.5 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800 text-white hover:bg-zinc-800' : 'bg-white border-gray-300 text-gray-900 hover:bg-gray-50'} border rounded-xl transition-all duration-200`}
          >
            Enter Public Room
          </button>

          <button
            onClick={onStartFocus}
            className={`w-full px-6 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30`}
          >
            <Sparkles className="w-5 h-5" />
            Enter Focus Mode
          </button>
        </div>
      </div>

      {/* Device Selector Popup */}
      {showDeviceSelector && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className={`${theme === 'dark' ? 'bg-zinc-900' : 'bg-white'} rounded-2xl w-full max-w-md overflow-hidden`}>
            <div className={`p-6 border-b ${theme === 'dark' ? 'border-zinc-800' : 'border-zinc-200'}`}>
              <div className="flex items-center justify-between">
                <h3 className={theme === 'dark' ? 'text-white' : 'text-zinc-950'}>Setup Your Session</h3>
                <button
                  onClick={() => setShowDeviceSelector(false)}
                  className={`w-8 h-8 rounded-lg ${theme === 'dark' ? 'hover:bg-zinc-800' : 'hover:bg-zinc-100'} flex items-center justify-center transition-all duration-200`}
                >
                  <X className={`w-5 h-5 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Camera Toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl ${theme === 'dark' ? 'bg-zinc-800' : 'bg-zinc-100'} flex items-center justify-center`}>
                    <Video className={`w-5 h-5 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-700'}`} />
                  </div>
                  <div>
                    <p className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-zinc-950'}`}>Camera</p>
                    <p className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'}`}>
                      {cameraEnabled ? 'Enabled' : 'Disabled'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setCameraEnabled(!cameraEnabled)}
                  className={`w-12 h-7 rounded-full transition-all duration-200 relative ${
                    cameraEnabled ? (theme === 'dark' ? 'bg-white' : 'bg-zinc-950') : 'bg-zinc-300'
                  }`}
                >
                  <div
                    className={`absolute w-5 h-5 ${cameraEnabled ? (theme === 'dark' ? 'bg-zinc-950' : 'bg-white') : 'bg-white'} rounded-full top-1 transition-all duration-200 ${
                      cameraEnabled ? 'right-1' : 'left-1'
                    }`}
                  />
                </button>
              </div>

              {/* Microphone Toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl ${theme === 'dark' ? 'bg-zinc-800' : 'bg-zinc-100'} flex items-center justify-center`}>
                    <Mic className={`w-5 h-5 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-700'}`} />
                  </div>
                  <div>
                    <p className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-zinc-950'}`}>Microphone</p>
                    <p className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'}`}>
                      {micEnabled ? 'Enabled' : 'Disabled'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setMicEnabled(!micEnabled)}
                  className={`w-12 h-7 rounded-full transition-all duration-200 relative ${
                    micEnabled ? (theme === 'dark' ? 'bg-white' : 'bg-zinc-950') : 'bg-zinc-300'
                  }`}
                >
                  <div
                    className={`absolute w-5 h-5 ${micEnabled ? (theme === 'dark' ? 'bg-zinc-950' : 'bg-white') : 'bg-white'} rounded-full top-1 transition-all duration-200 ${
                      micEnabled ? 'right-1' : 'left-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className={`p-6 border-t ${theme === 'dark' ? 'border-zinc-800' : 'border-zinc-200'}`}>
              <button
                onClick={() => {
                  setShowDeviceSelector(false);
                  onStartSolo();
                }}
                className={`w-full px-6 py-3 ${theme === 'dark' ? 'bg-white text-zinc-950 hover:bg-zinc-100' : 'bg-zinc-950 text-white hover:bg-zinc-800'} rounded-xl transition-all duration-200`}
              >
                Start Solo Room
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
