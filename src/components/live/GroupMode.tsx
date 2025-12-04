import { useState } from 'react';
import { RoomSelector } from './RoomSelector';
import { ActiveRoom } from './ActiveRoom';

export function GroupMode() {
  const [inRoom, setInRoom] = useState(false);
  const [currentRoom, setCurrentRoom] = useState<string | null>(null);

  const handleJoinRoom = (roomId: string) => {
    setCurrentRoom(roomId);
    setInRoom(true);
  };

  const handleLeaveRoom = () => {
    setInRoom(false);
    setCurrentRoom(null);
  };

  return (
    <div className="h-full">
      {inRoom ? (
        <ActiveRoom roomId={currentRoom!} onLeave={handleLeaveRoom} />
      ) : (
        <RoomSelector onJoinRoom={handleJoinRoom} />
      )}
    </div>
  );
}
