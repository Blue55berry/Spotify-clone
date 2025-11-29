import React, { useEffect, useState } from 'react';
import { FaSpinner, FaFire, FaMusic, FaCompactDisc } from 'react-icons/fa';
import jiosaavnApi from '../../services/jiosaavnApi';
import { useMusicStore } from '../../store/musicStore';
import SongCard from './SongCard';


export default function Discover() {
  const [trendingSongs, setTrendingSongs] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [charts, setCharts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { setIsLoading, addToPlaylist } = useMusicStore();

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    setLoading(true);
    setIsLoading(true);
    setError('');

    try {
      const [trending, releases, chartData] = await Promise.all([
        jiosaavnApi.getTrendingSongs(20),
        jiosaavnApi.getNewReleases(20),
        jiosaavnApi.getCharts('songs', 20),
      ]);

      setTrendingSongs(trending || []);
      setNewReleases(releases || []);
      setCharts(chartData || []);
    } catch (err) {
      console.error('Error loading content:', err);
      setError('Failed to load content. Please try again.');
    } finally {
      setLoading(false);
      setIsLoading(false);
    }
  };

  const handleAddToPlaylist = (playlistId, song) => {
    addToPlaylist(playlistId, song);
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center pb-32">
        <div className="text-center">
          <FaSpinner className="animate-spin text-jiosaavn-green text-5xl mb-4 mx-auto" />
          <p className="text-gray-400">Loading your music...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto pb-32">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-jiosaavn-green via-jiosaavn-lightgreen to-jiosaavn-green h-64 p-8 mb-8">
        <div className="max-w-7xl mx-auto h-full flex items-end">
          <div>
            <p className="text-sm font-semibold text-white/80 mb-2">
              Welcome back!
            </p>
            <h1 className="text-5xl font-bold text-white">
              Discover Your Next Favorite Song
            </h1>
          </div>
        </div>
      </div>

      {error && (
        <div className="max-w-7xl mx-auto px-6 mb-6">
          <div className="bg-red-500/20 border border-red-500 text-red-400 p-4 rounded-lg">
            {error}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6">
        {/* Trending Songs */}
        {trendingSongs.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <FaFire className="text-jiosaavn-green text-2xl" />
              <h2 className="text-3xl font-bold">Trending Now</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {trendingSongs.map(song => (
                <SongCard
                  key={song.id}
                  song={song}
                  onAddToPlaylist={handleAddToPlaylist}
                />
              ))}
            </div>
          </section>
        )}

        {/* New Releases */}
        {newReleases.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <FaCompactDisc className="text-jiosaavn-green text-2xl" />
              <h2 className="text-3xl font-bold">New Releases</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {newReleases.map(release => (
                <div key={release.id} className="card">
                  {release.image && release.image.length > 0 && (
                    <img
                      src={release.image[0].url}
                      alt={release.name}
                      className="w-full aspect-square object-cover rounded-lg mb-4"
                      loading="lazy"
                    />
                  )}
                  <h3 className="font-semibold truncate">{release.name}</h3>
                  <p className="text-sm text-gray-400 truncate">
                    {release.artist || 'Various Artists'}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Charts */}
        {charts.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <FaMusic className="text-jiosaavn-green text-2xl" />
              <h2 className="text-3xl font-bold">Top Charts</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {charts.map((song, index) => (
                <div key={song.id} className="relative">
                  <SongCard
                    song={song}
                    onAddToPlaylist={handleAddToPlaylist}
                  />
                  <div className="absolute top-2 right-2 bg-jiosaavn-green text-black rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
