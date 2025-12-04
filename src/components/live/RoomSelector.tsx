import { Users, Plus, User as UserIcon } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface RoomSelectorProps {
  onJoinRoom: (roomId: string) => void;
}

interface Room {
  id: string;
  subject: string;
  topic: string;
  members: { name: string; avatar?: string }[];
  maxMembers: number;
}

export function RoomSelector({ onJoinRoom }: RoomSelectorProps) {
  const rooms: Room[] = [
    {
      id: '1',
      subject: 'Mathematics',
      topic: 'Calculus - Integration Techniques',
      members: [
        { name: 'Emma Chen' },
        { name: 'David Lee' },
      ],
      maxMembers: 4,
    },
    {
      id: '2',
      subject: 'Chemistry',
      topic: 'Organic Chemistry - Reactions',
      members: [
        { name: 'Sofia Martinez' },
        { name: 'Ryan Thompson' },
        { name: 'Priya Sharma' },
      ],
      maxMembers: 4,
    },
    {
      id: '3',
      subject: 'Physics',
      topic: 'Quantum Mechanics Basics',
      members: [{ name: 'Alex Kim' }],
      maxMembers: 4,
    },
    {
      id: '4',
      subject: 'Biology',
      topic: 'Cell Structure and Functions',
      members: [
        { name: 'Maya Johnson' },
        { name: 'Lucas Brown' },
        { name: 'Nina Patel' },
      ],
      maxMembers: 4,
    },
    {
      id: '5',
      subject: 'History',
      topic: 'World War II - European Theater',
      members: [
        { name: 'Oliver White' },
        { name: 'Lily Zhang' },
      ],
      maxMembers: 4,
    },
  ];

  return (
    <div className="h-full overflow-auto p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-white mb-2">Study Rooms</h2>
            <p className="text-sm text-zinc-500">Join a group study session or create your own</p>
          </div>
          <button className="px-5 py-2.5 bg-emerald-600 rounded-xl text-white hover:bg-emerald-500 transition-all duration-300 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Create Room
          </button>
        </div>

        {/* Room List */}
        <div className="grid gap-5">
          {rooms.map((room) => {
            const isFull = room.members.length >= room.maxMembers;
            return (
              <div
                key={room.id}
                className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl hover:border-zinc-700 transition-all duration-300"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 bg-emerald-600/10 border border-emerald-600/20 rounded-lg text-xs text-emerald-500">
                        {room.subject}
                      </span>
                      <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                        <Users className="w-4 h-4" />
                        <span>
                          {room.members.length} / {room.maxMembers}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-white mb-4">{room.topic}</h3>

                    {/* Members */}
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-zinc-500">Members:</span>
                      <div className="flex -space-x-2">
                        {room.members.map((member, idx) => (
                          <div
                            key={idx}
                            className="w-8 h-8 rounded-full bg-zinc-800 border-2 border-zinc-900 flex items-center justify-center"
                            title={member.name}
                          >
                            {member.avatar ? (
                              <ImageWithFallback
                                src={member.avatar}
                                alt={member.name}
                                className="w-full h-full rounded-full object-cover"
                              />
                            ) : (
                              <UserIcon className="w-4 h-4 text-zinc-600" />
                            )}
                          </div>
                        ))}
                        {room.members.length < room.maxMembers && (
                          <div className="w-8 h-8 rounded-full bg-zinc-800/50 border-2 border-zinc-900 border-dashed flex items-center justify-center">
                            <Plus className="w-4 h-4 text-zinc-600" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Join Button */}
                  <button
                    onClick={() => onJoinRoom(room.id)}
                    disabled={isFull}
                    className={`px-6 py-2.5 rounded-xl text-sm transition-all duration-300 ${
                      isFull
                        ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                        : 'bg-emerald-600 text-white hover:bg-emerald-500'
                    }`}
                  >
                    {isFull ? 'Room Full' : 'Join Room'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
