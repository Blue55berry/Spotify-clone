import React, { useState } from 'react';
import { FaPlay, FaPlus, FaHeart, FaRegHeart, FaEllipsisV } from 'react-icons/fa';
import { useMusicStore } from '../../store/musicStore';

export default function SongCard({ song, onAddToPlaylist }) {
  const [showMenu, setShowMenu] = useState(false);
  const {
    setCurrentTrack,
    addToQueue,
    setQueue,
    queue,
    addToFavorites,
    removeFromFavorites,
    isFavorited,
    userPlaylists,
  } = useMusicStore();

  const handlePlaySong = () => {
    setQueue([song, ...queue.filter(t => t.id !== song.id)]);
    setCurrentTrack(song);
  };

  const handleAddToQueue = () => {
    addToQueue(song);
  };

  const toggleFavorite = () => {
    if (isFavorited(song.id)) {
      removeFromFavorites(song.id);
    } else {
      addToFavorites(song);
    }
  };

  const isFavorite = isFavorited(song.id);

  return (
    <div className="card group">
      <div className="relative mb-4 overflow-hidden rounded-lg bg-jiosaavn-gray">
        {song.image && song.image.length > 0 && song.image[0].url ? (
          <img
            src={song.image[0].url}
            alt={song.name || 'Unknown'}
            className="w-full aspect-square object-cover group-hover:scale-110 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full aspect-square bg-gradient-to-br from-jiosaavn-green to-jiosaavn-lightgreen flex items-center justify-center">
            <FaMusic size={40} className="text-black opacity-50" />
          </div>
        )}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-3">
          <button
            onClick={handlePlaySong}
            className="bg-jiosaavn-green text-black rounded-full p-3 hover:bg-green-500 transition-colors transform hover:scale-110"
            title="Play"
          >
            <FaPlay size={18} />
          </button>
          <button
            onClick={handleAddToQueue}
            className="bg-jiosaavn-gray text-white rounded-full p-3 hover:bg-gray-600 transition-colors transform hover:scale-110"
            title="Add to Queue"
          >
            <FaPlus size={18} />
          </button>
        </div>
      </div>

      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-sm truncate hover:text-jiosaavn-green transition-colors cursor-pointer">
            {song.name || 'Unknown Song'}
          </h3>
          <p className="text-xs text-gray-400 truncate">
            {song.artist || song.artists?.[0]?.name || 'Unknown Artist'}
          </p>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="text-gray-400 hover:text-white p-1 rounded hover:bg-jiosaavn-gray transition-colors"
          >
            <FaEllipsisV size={14} />
          </button>

          {showMenu && (
            <div className="absolute right-0 top-8 bg-jiosaavn-card rounded-lg shadow-xl border border-jiosaavn-gray z-20 min-w-max">
              <button
                onClick={() => {
                  toggleFavorite();
                  setShowMenu(false);
                }}
                className="flex items-center gap-2 px-4 py-2 hover:bg-jiosaavn-gray w-full text-left text-sm transition-colors"
              >
                {isFavorite ? (
                  <>
                    <FaHeart size={14} className="text-jiosaavn-green" />
                    Remove from Favorites
                  </>
                ) : (
                  <>
                    <FaRegHeart size={14} />
                    Add to Favorites
                  </>
                )}
              </button>

              {userPlaylists && userPlaylists.length > 0 && (
                <div className="border-t border-jiosaavn-gray">
                  {userPlaylists.map(playlist => (
                    <button
                      key={playlist.id}
                      onClick={() => {
                        if (onAddToPlaylist) {
                          onAddToPlaylist(playlist.id, song);
                        }
                        setShowMenu(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-jiosaavn-gray text-sm transition-colors"
                    >
                      Add to {playlist.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
