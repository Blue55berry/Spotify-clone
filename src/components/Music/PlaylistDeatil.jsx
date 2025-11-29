import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaTrash, FaPlay, FaPlus } from 'react-icons/fa';
import { useMusicStore } from '../../store/musicStore';

export default function PlaylistDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    userPlaylists,
    setQueue,
    setCurrentTrack,
    removeFromPlaylist,
    deletePlaylist,
  } = useMusicStore();

  const playlist = userPlaylists.find(p => p.id === id);

  if (!playlist) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 text-lg mb-4">Playlist not found</p>
          <button
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const handlePlayPlaylist = () => {
    if (playlist.tracks.length > 0) {
      setQueue(playlist.tracks);
      setCurrentTrack(playlist.tracks[0]);
    }
  };

  const handleDeletePlaylist = () => {
    if (confirm(`Delete "${playlist.name}"? This action cannot be undone.`)) {
      deletePlaylist(playlist.id);
      navigate('/');
    }
  };

  return (
    <div className="flex-1 overflow-auto pb-32">
      {/* Header */}
      <div className="bg-gradient-to-b from-jiosaavn-green to-jiosaavn-darker p-8 mb-8">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white hover:text-jiosaavn-green transition-colors mb-6"
          >
            <FaArrowLeft />
            Back
          </button>

          <div className="flex items-end gap-6">
            <div className="bg-jiosaavn-green p-12 rounded-lg">
              <FaPlus size={48} className="text-black" />
            </div>
            <div className="flex-1 text-white mb-4">
              <p className="text-sm font-semibold mb-2">PLAYLIST</p>
              <h1 className="text-5xl font-bold mb-2">{playlist.name}</h1>
              <p className="text-lg">
                {playlist.tracks.length} song
                {playlist.tracks.length !== 1 ? 's' : ''}
              </p>
              <p className="text-sm text-white/70 mt-2">
                {playlist.description}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={handlePlayPlaylist}
              disabled={playlist.tracks.length === 0}
              className="btn-primary flex items-center gap-2"
            >
              <FaPlay size={16} />
              Play
            </button>
            <button
              onClick={handleDeletePlaylist}
              className="bg-red-500/20 text-red-400 hover:bg-red-500/30 py-3 px-6 rounded-full font-semibold transition-colors flex items-center gap-2"
            >
              <FaTrash size={16} />
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Songs */}
      <div className="max-w-7xl mx-auto px-6">
        {playlist.tracks.length > 0 ? (
          <div className="space-y-2">
            {playlist.tracks.map((track, index) => (
              <div
                key={track.id}
                className="flex items-center gap-4 p-4 hover:bg-jiosaavn-card rounded-lg transition-colors group"
              >
                <span className="text-gray-400 font-semibold min-w-fit w-8">
                  {index + 1}
                </span>

                {track.image?.[0]?.url && (
                  <img
                    src={track.image[0].url}
                    alt={track.name}
                    className="w-12 h-12 rounded object-cover"
                  />
                )}

                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate">{track.name}</p>
                  <p className="text-sm text-gray-400 truncate">
                    {track.artist}
                  </p>
                </div>

                <button
                  onClick={() => removeFromPlaylist(playlist.id, track.id)}
                  className="text-gray-400 opacity-0 group-hover:opacity-100 hover:text-red-500 transition-all"
                >
                  <FaTrash size={16} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg mb-2">No songs in this playlist</p>
            <p className="text-gray-500">
              Search and add songs to get started
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
