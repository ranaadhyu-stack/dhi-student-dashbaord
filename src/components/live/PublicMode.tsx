import { useState } from 'react';
import { UserGrid } from './UserGrid';
import { PublicChatPanel } from './PublicChatPanel';

export function PublicMode() {
  const [chatOpen, setChatOpen] = useState(true);

  return (
    <div className="h-full flex">
      {/* Center Canvas - User Grid */}
      <div className="flex-1 overflow-auto">
        <UserGrid />
      </div>

      {/* Right Panel - Public Chat */}
      <PublicChatPanel isOpen={chatOpen} onToggle={() => setChatOpen(!chatOpen)} />
    </div>
  );
}
