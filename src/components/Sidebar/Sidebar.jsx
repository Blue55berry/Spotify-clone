import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  FaMusic,
  FaHome,
  FaSearch,
  FaHeart,
  FaSignOutAlt,
  FaPlusCircle,
  FaList,
} from 'react-icons/fa';
import { useAuthStore } from '../../store/authStore';
import { useMusicStore } from '../../store/musicStore';

export default function Sidebar() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { userPlaylists, createPlaylist } = useMusicStore();
  const [showNewPlaylist, setShowNewPlaylist] = useState(false);
  const [playlistName, setPlaylistName] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleCreatePlaylist = () => {
    if (playlistName.trim()) {
      createPlaylist(playlistName);
      setPlaylistName('');
      setShowNewPlaylist(false);
    }
  };

  return (
    <aside className="w-64 bg-jiosaavn-darker h-screen flex flex-col border-r border-jiosaavn-gray overflow-hidden">
      {/* Logo */}
      <div className="p-6 border-b border-jiosaavn-gray">
        <NavLink to="/" className="flex items-center gap-3 group">
          <div className="bg-jiosaavn-green p-2 rounded-lg group-hover:scale-110 transition-transform">
            <FaMusic size={24} className="text-black" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">JioSaavn</h1>
            <p className="text-xs text-gray-400">Music Streaming</p>
          </div>
        </NavLink>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-auto p-4 space-y-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive
                ? 'bg-jiosaavn-green text-black font-semibold'
                : 'text-gray-400 hover:text-white hover:bg-jiosaavn-card'
            }`
          }
        >
          <FaHome size={20} />
          <span>Home</span>
        </NavLink>

        <NavLink
          to="/search"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive
                ? 'bg-jiosaavn-green text-black font-semibold'
                : 'text-gray-400 hover:text-white hover:bg-jiosaavn-card'
            }`
          }
        >
          <FaSearch size={20} />
          <span>Search</span>
        </NavLink>

        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive
                ? 'bg-jiosaavn-green text-black font-semibold'
                : 'text-gray-400 hover:text-white hover:bg-jiosaavn-card'
            }`
          }
        >
          <FaHeart size={20} />
          <span>Liked Songs</span>
        </NavLink>

        {/* Playlists Section */}
        <div className="pt-4 border-t border-jiosaavn-gray">
          <div className="flex items-center justify-between px-4 mb-2">
            <h3 className="text-xs font-semibold text-gray-400 uppercase">
              Playlists
            </h3>
            <button
              onClick={() => setShowNewPlaylist(!showNewPlaylist)}
              className="text-gray-400 hover:text-jiosaavn-green transition-colors"
              title="Create Playlist"
            >
              <FaPlusCircle size={16} />
            </button>
          </div>

          {showNewPlaylist && (
            <div className="px-4 pb-4">
              <input
                type="text"
                placeholder="Playlist name"
                value={playlistName}
                onChange={(e) => setPlaylistName(e.target.value)}
                className="input-field text-sm mb-2"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleCreatePlaylist}
                  className="flex-1 bg-jiosaavn-green text-black text-sm font-semibold py-2 rounded transition-colors hover:bg-green-500"
                >
                  Create
                </button>
                <button
                  onClick={() => {
                    setShowNewPlaylist(false);
                    setPlaylistName('');
                  }}
                  className="flex-1 bg-jiosaavn-card text-white text-sm font-semibold py-2 rounded transition-colors hover:bg-jiosaavn-gray"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {userPlaylists.length > 0 ? (
            <div className="space-y-1">
              {userPlaylists.map(playlist => (
                                <NavLink
                  key={playlist.id}
                  to={`/playlist/${playlist.id}`}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2 rounded text-sm truncate transition-colors ${
                      isActive
                        ? 'bg-jiosaavn-green text-black font-semibold'
                        : 'text-gray-400 hover:text-white hover:bg-jiosaavn-card'
                    }`
                  }
                >
                  <FaList size={14} />
                  <span className="truncate">{playlist.name}</span>
                </NavLink>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-500 px-4">
              No playlists yet. Create one!
            </p>
          )}
        </div>
      </nav>

      {/* User Profile */}
      {user && (
        <div className="p-4 border-t border-jiosaavn-gray space-y-3">
          <div className="bg-jiosaavn-card rounded-lg p-3">
            <p className="text-sm font-semibold truncate">{user.fullName}</p>
            <p className="text-xs text-gray-400 truncate">{user.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 py-2 px-4 rounded-lg transition-colors font-semibold"
          >
            <FaSignOutAlt size={16} />
            Logout
          </button>
        </div>
      )}
    </aside>
  );
}
