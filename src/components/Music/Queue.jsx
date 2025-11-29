import React from 'react';
import { FaTrash, FaPlay, FaTimes } from 'react-icons/fa';
import { useMusicStore } from '../../store/musicStore';

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

  return (
    <div className="w-80 h-screen bg-jiosaavn-card border-l border-jiosaavn-gray flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-jiosaavn-gray">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <FaPlay className="text-jiosaavn-green" />
            Queue
          </h2>
          {queue.length > 0 && (
            <button
              onClick={clearQueue}
              className="text-xs text-gray-400 hover:text-white transition-colors"
              title="Clear Queue"
            >
              <FaTimes size={16} />
            </button>
          )}
        </div>
        <p className="text-sm text-gray-400">{queue.length} songs</p>
      </div>

      {/* Queue List */}
      {queue.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-gray-400">
          <p>Queue is empty</p>
        </div>
      ) : (
        <div className="flex-1 overflow-auto">
          {queue.map((track, index) => (
            <div
              key={`${track.id}-${index}`}
              className={`flex items-center gap-3 p-3 hover:bg-jiosaavn-gray transition-colors border-b border-jiosaavn-gray group cursor-pointer ${
                index === currentIndex ? 'bg-jiosaavn-green/20 border-l-4 border-l-jiosaavn-green' : ''
              }`}
              onClick={() => handlePlayTrack(index)}
            >
              <div className="text-xs font-semibold text-gray-400 min-w-fit">
                {index + 1}
              </div>

              {track.image?.[0]?.url && (
                <img
                  src={track.image[0].url}
                  alt={track.name}
                  className="w-10 h-10 rounded object-cover"
                />
              )}

              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">
                  {track.name}
                </p>
                <p className="text-xs text-gray-400 truncate">
                  {track.artist || 'Unknown'}
                </p>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromQueue(index);
                }}
                className="text-gray-400 opacity-0 group-hover:opacity-100 hover:text-red-500 transition-all p-1"
              >
                <FaTrash size={12} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
