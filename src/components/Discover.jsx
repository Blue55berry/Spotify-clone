import React, { useEffect, useState } from 'react';
import musicApi from '../services/musicApi';
import { useMusicStore } from '../store/musicStore';
import TrackCard from './TrackCard';

export default function Discover() {
  const [trendingSongs, setTrendingSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setIsLoading } = useMusicStore();

  useEffect(() => {
    fetchTrendingSongs();
  }, []);

  const fetchTrendingSongs = async () => {
    setIsLoading(true);
    try {
      const songs = await musicApi.getTrendingSongs();
      setTrendingSongs(songs);
    } catch (error) {
      console.error('Error fetching trending songs:', error);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="bg-gradient-to-b from-spotify-green to-spotify-dark">
        <div className="p-6 pb-12">
          <h1 className="text-5xl font-bold">Good to see you!</h1>
        </div>
      </div>

      <div className="p-6 pb-32">
        <h2 className="text-2xl font-bold mb-6">Trending Now</h2>
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-spotify-green"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {trendingSongs.slice(0, 20).map((track) => (
              <TrackCard key={track.id} track={track} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
