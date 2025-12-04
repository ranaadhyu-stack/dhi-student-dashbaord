import { useState } from 'react';
import { MoreVertical, User as UserIcon, AtSign, Send } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface User {
  id: string;
  name: string;
  avatar?: string;
  status: 'Busy' | 'Studying' | 'Free';
  isCurrentUser?: boolean;
  canInvite: boolean;
}

export function UserGrid() {
  const [hoveredUser, setHoveredUser] = useState<string | null>(null);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const users: User[] = [
    { id: '1', name: 'You', status: 'Studying', isCurrentUser: true, canInvite: false },
    { id: '2', name: 'Emma Chen', status: 'Studying', canInvite: true },
    { id: '3', name: 'James Park', status: 'Free', canInvite: false },
    { id: '4', name: 'Sofia Martinez', status: 'Busy', canInvite: true },
    { id: '5', name: 'Ryan Thompson', status: 'Studying', canInvite: false },
    { id: '6', name: 'Priya Sharma', status: 'Free', canInvite: true },
    { id: '7', name: 'Alex Kim', status: 'Studying', canInvite: false },
    { id: '8', name: 'Maya Johnson', status: 'Free', canInvite: false },
    { id: '9', name: 'David Lee', status: 'Busy', canInvite: true },
    { id: '10', name: 'Zara Ahmed', status: 'Studying', canInvite: false },
    { id: '11', name: 'Lucas Brown', status: 'Free', canInvite: true },
    { id: '12', name: 'Nina Patel', status: 'Studying', canInvite: false },
    { id: '13', name: 'Oliver White', status: 'Free', canInvite: false },
    { id: '14', name: 'Lily Zhang', status: 'Studying', canInvite: true },
    { id: '15', name: 'Marcus Davis', status: 'Busy', canInvite: false },
    { id: '16', name: 'Aisha Khan', status: 'Free', canInvite: true },
  ];

  const getStatusColor = (status: User['status']) => {
    switch (status) {
      case 'Busy':
        return 'bg-red-500';
      case 'Studying':
        return 'bg-emerald-500';
      case 'Free':
        return 'bg-blue-500';
    }
  };

  const handleInvite = (user: User) => {
    if (user.canInvite) {
      console.log(`Invite sent to ${user.name}`);
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h3 className="text-white mb-2">Online Students</h3>
          <p className="text-sm text-zinc-500">
            Interact with someone in public chat to unlock invites
          </p>
        </div>

        {/* 6x6 Grid */}
        <div className="grid grid-cols-6 gap-4">
          {users.map((user) => (
            <div
              key={user.id}
              className={`relative p-4 bg-zinc-900 border rounded-2xl transition-all duration-300 ${
                user.isCurrentUser
                  ? 'border-emerald-600/50 bg-emerald-600/5'
                  : user.canInvite
                  ? 'border-emerald-600/30 hover:border-emerald-600/50'
                  : 'border-zinc-800 hover:border-zinc-700'
              }`}
              onMouseEnter={() => setHoveredUser(user.id)}
              onMouseLeave={() => {
                setHoveredUser(null);
                setActiveMenu(null);
              }}
            >
              {/* Avatar */}
              <div className="relative mb-3">
                <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center mx-auto overflow-hidden">
                  {user.avatar ? (
                    <ImageWithFallback src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <UserIcon className="w-8 h-8 text-zinc-600" />
                  )}
                </div>
                {/* Status Dot */}
                <div
                  className={`absolute bottom-0 right-1/2 translate-x-8 w-4 h-4 rounded-full border-2 border-zinc-900 ${getStatusColor(
                    user.status
                  )}`}
                />
              </div>

              {/* Name */}
              <p className="text-sm text-white text-center mb-1 truncate">
                {user.name}
              </p>
              <p className="text-xs text-zinc-500 text-center mb-3">{user.status}</p>

              {/* Invite Button */}
              {!user.isCurrentUser && (
                <button
                  onClick={() => handleInvite(user)}
                  disabled={!user.canInvite}
                  className={`w-full px-3 py-1.5 rounded-lg text-xs transition-all duration-300 ${
                    user.canInvite
                      ? 'bg-emerald-600 text-white hover:bg-emerald-500'
                      : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                  }`}
                >
                  {user.canInvite ? (
                    <>
                      <Send className="w-3 h-3 inline mr-1" />
                      Invite
                    </>
                  ) : (
                    <>🔒 Locked</>
                  )}
                </button>
              )}

              {/* Hover Menu */}
              {!user.isCurrentUser && hoveredUser === user.id && (
                <>
                  <button
                    onClick={() => setActiveMenu(activeMenu === user.id ? null : user.id)}
                    className="absolute top-2 right-2 w-6 h-6 rounded-lg bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center transition-all duration-300"
                  >
                    <MoreVertical className="w-4 h-4 text-zinc-400" />
                  </button>

                  {activeMenu === user.id && (
                    <div className="absolute top-10 right-2 bg-zinc-800 border border-zinc-700 rounded-xl overflow-hidden shadow-lg z-10 min-w-[140px]">
                      <button className="w-full px-4 py-2 text-left text-sm text-zinc-300 hover:bg-zinc-700 transition-all duration-300 flex items-center gap-2">
                        <UserIcon className="w-4 h-4" />
                        View Profile
                      </button>
                      <button className="w-full px-4 py-2 text-left text-sm text-zinc-300 hover:bg-zinc-700 transition-all duration-300 flex items-center gap-2">
                        <AtSign className="w-4 h-4" />
                        @ Tag in Chat
                      </button>
                      <button
                        disabled={!user.canInvite}
                        className={`w-full px-4 py-2 text-left text-sm transition-all duration-300 flex items-center gap-2 ${
                          user.canInvite
                            ? 'text-emerald-500 hover:bg-zinc-700'
                            : 'text-zinc-600 cursor-not-allowed'
                        }`}
                      >
                        <Send className="w-4 h-4" />
                        Send Invite
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
