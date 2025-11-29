import React, { useState, useEffect, useCallback } from 'react';
import { FaSearch, FaSpinner } from 'react-icons/fa';
import { searchSongs, searchArtists, searchAlbums } from '../../services/jiosaavnApi';
import { useMusicStore } from '../../store/musicStore';
import SongCard from './SongCard';

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searchType, setSearchType] = useState('songs');
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState(
    JSON.parse(localStorage.getItem('jiosaavn_recent_searches') || '[]')
  );

  const { setIsLoading, addToPlaylist } = useMusicStore();

  const performSearch = useCallback(async () => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    setIsLoading(true);

    try {
      let searchResults = [];

      if (searchType === 'songs') {
        searchResults = await searchSongs(query, 50);
      } else if (searchType === 'artists') {
        searchResults = await searchArtists(query, 50);
      } else if (searchType === 'albums') {
        searchResults = await searchAlbums(query, 50);
      }

      setResults(searchResults || []);

      // Add to recent searches
      if (searchResults && searchResults.length > 0) {
        const updated = [
          query,
          ...recentSearches.filter(s => s !== query),
        ].slice(0, 10);
        setRecentSearches(updated);
        localStorage.setItem(
          'jiosaavn_recent_searches',
          JSON.stringify(updated)
        );
      }
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setLoading(false);
      setIsLoading(false);
    }
  }, [query, searchType, setIsLoading]);

  useEffect(() => {
    const timer = setTimeout(performSearch, 500);
    return () => clearTimeout(timer);
  }, [query, performSearch]);

  const handleRecentSearch = (searchTerm) => {
    setQuery(searchTerm);
  };

  const handleAddToPlaylist = (playlistId, song) => {
    addToPlaylist(playlistId, song);
  };

  return (
    <div className="flex-1 overflow-auto pb-32">
      {/* Search Header */}
      <div className="sticky top-0 bg-jiosaavn-dark/95 backdrop-blur-sm z-20 p-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center bg-jiosaavn-card rounded-full px-4 py-3 border border-jiosaavn-gray focus-within:border-jiosaavn-green transition-colors">
            <FaSearch className="text-gray-400" />
            <input
              type="text"
              placeholder="Search songs, artists, albums..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent ml-4 outline-none"
            />
          </div>

          {/* Search Type Filter */}
          <div className="flex gap-2 mt-4">
            {['songs', 'artists', 'albums'].map(type => (
              <button
                key={type}
                onClick={() => setSearchType(type)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                  searchType === type
                    ? 'bg-jiosaavn-green text-black'
                    : 'bg-jiosaavn-card text-gray-400 hover:text-white border border-jiosaavn-gray'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {loading && (
          <div className="flex flex-col items-center justify-center h-40">
            <FaSpinner className="animate-spin text-jiosaavn-green text-4xl mb-4" />
            <p className="text-gray-400">Searching...</p>
          </div>
        )}

        {!loading && query && results.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">
              {searchType === 'songs' && 'Songs'}
              {searchType === 'artists' && 'Artists'}
              {searchType === 'albums' && 'Albums'}
              {' '}({results.length})
            </h2>

            {searchType === 'songs' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {results.map(song => (
                  <SongCard
                    key={song.id}
                    song={song}
                    onAddToPlaylist={handleAddToPlaylist}
                  />
                ))}
              </div>
            )}

            {searchType === 'artists' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {results.map(artist => (
                  <div key={artist.id} className="card text-center">
                    {artist.image && artist.image.length > 0 && (
                      <img
                        src={artist.image[0].url}
                        alt={artist.name}
                        className="w-full aspect-square object-cover rounded-lg mb-4"
                        loading="lazy"
                      />
                    )}
                    <h3 className="font-semibold text-lg mb-2">
                      {artist.name}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {artist.songs || 0} songs
                    </p>
                  </div>
                ))}
              </div>
            )}

            {searchType === 'albums' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {results.map(album => (
                  <div key={album.id} className="card">
                    {album.image && album.image.length > 0 && (
                      <img
                        src={album.image[0].url}
                        alt={album.name}
                        className="w-full aspect-square object-cover rounded-lg mb-4"
                        loading="lazy"
                      />
                    )}
                    <h3 className="font-semibold truncate">{album.name}</h3>
                    <p className="text-sm text-gray-400 truncate">
                      {album.artist}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {!loading && query && results.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg mb-2">
              No results found for "{query}"
            </p>
            <p className="text-gray-500 text-sm">
              Try searching for a different artist, song, or album
            </p>
          </div>
        )}

        {!query && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Recent Searches</h2>
            {recentSearches.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleRecentSearch(search)}
                    className="px-4 py-2 bg-jiosaavn-card rounded-full hover:bg-jiosaavn-gray transition-colors text-sm"
                  >
                    {search}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No recent searches</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
