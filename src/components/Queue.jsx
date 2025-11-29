import React from 'react';
import { FaTrash, FaPlay } from 'react-icons/fa';
import { useMusicStore } from '../store/musicStore';

export default function Queue() {
  const {
    queue,
    currentIndex,
    removeFromQueue,
    setCurrentTrack,
    clearQueue,
  } = useMusicStore();

  const handlePlayTrack = (index) => {
    setCurrentTrack(queue[index]);
  };

  const handleRemoveTrack = (index) => {
    removeFromQueue(index);
  };

  return (
    <div className="bg-spotify-dark border-l border-gray-700 w-80 h-screen overflow-auto flex flex-col">
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Queue</h2>
          {queue.length > 0 && (
            <button
              onClick={clearQueue}
              className="text-xs text-gray-400 hover:text-white transition-colors"
            >
              Clear
            </button>
          )}
        </div>
        <p className="text-sm text-gray-400">{queue.length} songs</p>
      </div>

      {queue.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-gray-400">
          <p>Queue is empty</p>
        </div>
      ) : (
        <div className="flex-1 overflow-auto">
          {queue.map((track, index) => (
            <div
              key={index}
              className={`flex items-center gap-3 p-4 hover:bg-gray-800 transition-colors border-b border-gray-800 group cursor-pointer ${
                index === currentIndex ? 'bg-spotify-green/20' : ''
              }`}
              onClick={() => handlePlayTrack(index)}
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">{track.name}</p>
                <p className="text-xs text-gray-400 truncate">
                  {track.artists?.[0]?.name || 'Unknown'}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveTrack(index);
                }}
                className="text-gray-400 opacity-0 group-hover:opacity-100 hover:text-red-500 transition-all"
              >
                <FaTrash size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
