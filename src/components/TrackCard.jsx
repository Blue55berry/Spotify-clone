import React from 'react';
import { FaPlay, FaPlus } from 'react-icons/fa';
import { useMusicStore } from '../store/musicStore';

export default function TrackCard({ track }) {
  const { setCurrentTrack, addToQueue, setQueue, queue } = useMusicStore();

  const handlePlayTrack = () => {
    setQueue([track, ...queue]);
    setCurrentTrack(track);
  };

  const handleAddToQueue = () => {
    addToQueue(track);
  };

  return (
    <div className="bg-spotify-gray rounded-lg p-4 hover:bg-gray-700 transition-colors group">
      <div className="relative mb-4">
        {track.image?.[0]?.url && (
          <img
            src={track.image[0].url}
            alt={track.name}
            className="w-full aspect-square object-cover rounded-lg"
          />
        )}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-3">
          <button
            onClick={handlePlayTrack}
            className="bg-spotify-green text-black rounded-full p-3 hover:bg-green-500 transition-colors"
            title="Play"
          >
            <FaPlay size={18} />
          </button>
          <button
            onClick={handleAddToQueue}
            className="bg-gray-700 text-white rounded-full p-3 hover:bg-gray-600 transition-colors"
            title="Add to Queue"
          >
            <FaPlus size={18} />
          </button>
        </div>
      </div>
      <h3 className="font-semibold text-sm truncate">{track.name}</h3>
      <p className="text-xs text-gray-400 truncate">
        {track.artists?.[0]?.name || 'Unknown Artist'}
      </p>
    </div>
  );
}
