import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaSpotify, FaHome, FaSearch, FaMusic, FaHeart } from 'react-icons/fa';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-spotify-darker h-screen overflow-auto border-r border-gray-700">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <FaSpotify size={32} className="text-spotify-green" />
          <span className="text-2xl font-bold">Spotify</span>
        </div>

        <nav className="space-y-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-spotify-green text-black'
                  : 'text-gray-400 hover:text-white'
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
                  ? 'bg-spotify-green text-black'
                  : 'text-gray-400 hover:text-white'
              }`
            }
          >
            <FaSearch size={20} />
            <span>Search</span>
          </NavLink>

          <NavLink
            to="/library"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-spotify-green text-black'
                  : 'text-gray-400 hover:text-white'
              }`
            }
          >
            <FaMusic size={20} />
            <span>Your Library</span>
          </NavLink>

          <NavLink
            to="/liked"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-spotify-green text-black'
                  : 'text-gray-400 hover:text-white'
              }`
            }
          >
            <FaHeart size={20} />
            <span>Liked Songs</span>
          </NavLink>
        </nav>
      </div>
    </aside>
  );
}
