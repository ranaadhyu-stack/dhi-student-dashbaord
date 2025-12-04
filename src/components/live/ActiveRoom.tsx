import { useState } from 'react';
import { GroupChatPanel } from './GroupChatPanel';
import { Mic, MicOff, Video, VideoOff, LogOut, Link2, User as UserIcon } from 'lucide-react';

interface ActiveRoomProps {
  roomId: string;
  onLeave: () => void;
}

interface Participant {
  id: string;
  name: string;
  isSpeaking: boolean;
  videoEnabled: boolean;
  audioEnabled: boolean;
  isCurrentUser?: boolean;
}

export function ActiveRoom({ roomId, onLeave }: ActiveRoomProps) {
  const [micEnabled, setMicEnabled] = useState(true);
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [chatOpen, setChatOpen] = useState(true);

  const participants: Participant[] = [
    {
      id: '1',
      name: 'Emma Chen',
      isSpeaking: true,
      videoEnabled: true,
      audioEnabled: true,
    },
    {
      id: '2',
      name: 'David Lee',
      isSpeaking: false,
      videoEnabled: true,
      audioEnabled: true,
    },
    {
      id: '3',
      name: 'You',
      isSpeaking: false,
      videoEnabled: cameraEnabled,
      audioEnabled: micEnabled,
      isCurrentUser: true,
    },
  ];

  const activeSpeaker = participants.find((p) => p.isSpeaking);

  return (
    <div className="h-full flex">
      {/* Left Side - Video Tiles */}
      <div className="flex-1 p-6 bg-zinc-950">
        <div className="h-full flex flex-col gap-4">
          {/* Active Speaker - Large Tile */}
          {activeSpeaker && (
            <div className="flex-1 bg-zinc-900 border-2 border-emerald-600/50 rounded-2xl overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-900">
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-zinc-800 flex items-center justify-center mx-auto mb-4">
                    <UserIcon className="w-12 h-12 text-zinc-600" />
                  </div>
                  <p className="text-white mb-1">{activeSpeaker.name}</p>
                  <div className="flex items-center gap-2 justify-center">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs text-emerald-500">Speaking</span>
                  </div>
                </div>
              </div>

              {/* Controls Overlay */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="px-3 py-1.5 bg-black/60 backdrop-blur-sm rounded-lg">
                  <p className="text-sm text-white">{activeSpeaker.name}</p>
                </div>
                <div className="flex gap-2">
                  {activeSpeaker.audioEnabled && (
                    <div className="w-8 h-8 rounded-lg bg-black/60 backdrop-blur-sm flex items-center justify-center">
                      <Mic className="w-4 h-4 text-white" />
                    </div>
                  )}
                  {activeSpeaker.videoEnabled && (
                    <div className="w-8 h-8 rounded-lg bg-black/60 backdrop-blur-sm flex items-center justify-center">
                      <Video className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Other Participants - Small Tiles */}
          <div className="flex gap-4">
            {participants
              .filter((p) => !p.isSpeaking)
              .map((participant) => (
                <div
                  key={participant.id}
                  className={`flex-1 h-40 bg-zinc-900 rounded-2xl overflow-hidden relative ${
                    participant.isCurrentUser ? 'border-2 border-emerald-600/30' : 'border border-zinc-800'
                  }`}
                >
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-900">
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center mx-auto mb-2">
                        <UserIcon className="w-8 h-8 text-zinc-600" />
                      </div>
                      <p className="text-sm text-white">
                        {participant.name}
                        {participant.isCurrentUser && ' (You)'}
                      </p>
                    </div>
                  </div>

                  {/* Mini Controls */}
                  <div className="absolute bottom-2 right-2 flex gap-1">
                    {!participant.audioEnabled && (
                      <div className="w-6 h-6 rounded-lg bg-red-500/80 flex items-center justify-center">
                        <MicOff className="w-3 h-3 text-white" />
                      </div>
                    )}
                    {!participant.videoEnabled && (
                      <div className="w-6 h-6 rounded-lg bg-red-500/80 flex items-center justify-center">
                        <VideoOff className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Bottom Bar Controls */}
        <div className="mt-6 p-4 bg-zinc-900 border border-zinc-800 rounded-2xl">
          <div className="flex items-center justify-between">
            <div className="text-sm text-zinc-400">
              Room: <span className="text-white">Calculus - Integration Techniques</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setMicEnabled(!micEnabled)}
                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  micEnabled
                    ? 'bg-zinc-800 border border-zinc-700 hover:bg-zinc-750'
                    : 'bg-red-500 hover:bg-red-600'
                }`}
              >
                {micEnabled ? (
                  <Mic className="w-5 h-5 text-white" />
                ) : (
                  <MicOff className="w-5 h-5 text-white" />
                )}
              </button>

              <button
                onClick={() => setCameraEnabled(!cameraEnabled)}
                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  cameraEnabled
                    ? 'bg-zinc-800 border border-zinc-700 hover:bg-zinc-750'
                    : 'bg-red-500 hover:bg-red-600'
                }`}
              >
                {cameraEnabled ? (
                  <Video className="w-5 h-5 text-white" />
                ) : (
                  <VideoOff className="w-5 h-5 text-white" />
                )}
              </button>

              <button className="px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-sm text-zinc-300 hover:bg-zinc-750 transition-all duration-300 flex items-center gap-2">
                <Link2 className="w-4 h-4" />
                Invite
              </button>

              <button
                onClick={onLeave}
                className="px-4 py-3 bg-red-500 rounded-xl text-sm text-white hover:bg-red-600 transition-all duration-300 flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Leave Room
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Group Chat */}
      <GroupChatPanel isOpen={chatOpen} onToggle={() => setChatOpen(!chatOpen)} />
    </div>
  );
}
