import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import musicApi from '../services/musicApi';
import { useMusicStore } from '../store/musicStore';
import TrackCard from './TrackCard';

export default function Search() {
  const [query, setQuery] = useState('');
  const { searchResults, setSearchResults, setIsLoading, isLoading } = useMusicStore();
  const [activeTab, setActiveTab] = useState('songs');

  useEffect(() => {
    if (query.trim()) {
      handleSearch();
    } else {
      setSearchResults([]);
    }
  }, [query]);

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const results = await musicApi.searchSongs(query, 50);
      setSearchResults(results);
    } catch (error) {
      console.error('Search error:', error);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="sticky top-0 bg-spotify-dark/95 backdrop-blur-sm z-10 p-6">
        <div className="flex items-center bg-spotify-gray rounded-full px-4 py-3">
          <FaSearch className="text-gray-400" />
          <input
            type="text"
            placeholder="Search songs, artists, albums..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent ml-4 outline-none"
          />
        </div>
      </div>

      <div className="p-6 pb-32">
        {isLoading && (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-spotify-green"></div>
          </div>
        )}

        {!isLoading && searchResults.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Search Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {searchResults.map((track) => (
                <TrackCard key={track.id} track={track} />
              ))}
            </div>
          </div>
        )}

        {!isLoading && query && searchResults.length === 0 && (
          <div className="text-center text-gray-400 py-12">
            <p>No results found for "{query}"</p>
          </div>
        )}

        {!query && (
          <div className="text-center text-gray-400 py-12">
            <p className="text-lg">Start searching for your favorite songs</p>
          </div>
        )}
      </div>
    </div>
  );
}
