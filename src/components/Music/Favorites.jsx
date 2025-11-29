import React from 'react';
import { FaHeart } from 'react-icons/fa';
import { useMusicStore } from '../../store/musicStore';
import SongCard from './SongCard';

export default function Favorites() {
  const { favorites, addToPlaylist } = useMusicStore();

  const handleAddToPlaylist = (playlistId, song) => {
    addToPlaylist(playlistId, song);
  };

  return (
    <div className="flex-1 overflow-auto pb-32">
      {/* Header */}
      <div className="bg-gradient-to-b from-jiosaavn-green to-jiosaavn-darker p-8 mb-8">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <div className="bg-jiosaavn-green p-8 rounded-lg">
            <FaHeart size={48} className="text-black" />
          </div>
          <div>
            <h1 className="text-5xl font-bold mb-2">Liked Songs</h1>
            <p className="text-xl text-white/80">{favorites ? favorites.length : 0} songs</p>
          </div>
        </div>
      </div>

      {/* Songs Grid */}
      <div className="max-w-7xl mx-auto px-6">
        {favorites && favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {favorites.map(song => (
              <SongCard
                key={song.id}
                song={song}
                onAddToPlaylist={handleAddToPlaylist}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <FaHeart size={64} className="text-gray-400 mx-auto mb-4 opacity-50" />
            <p className="text-gray-400 text-xl mb-2">No liked songs yet</p>
            <p className="text-gray-500">
              Start liking songs to build your collection
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
