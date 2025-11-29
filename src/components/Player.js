import React, { useEffect, useRef } from 'react';
import { useMusicStore } from '../store/musicStore';
import {
  FaPlay,
  FaPause,
  FaStepBackward,
  FaStepForward,
  FaRandom,
  FaRedoAlt,
  FaVolumeUp,
} from 'react-icons/fa';

export default function Player() {
  const audioRef = useRef(new Audio());
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    queue,
    currentIndex,
    shuffle,
    repeat,
    setIsPlaying,
    setCurrentTime,
    setDuration,
    setVolume,
    playNext,
    playPrevious,
    shuffleQueue,
    toggleRepeat,
  } = useMusicStore();

  useEffect(() => {
    const audio = audioRef.current;

    if (currentTrack?.downloadUrl?.[4]?.url) {
      audio.src = currentTrack.downloadUrl[4].url;
      
      if (isPlaying) {
        audio.play().catch(e => console.error('Playback error:', e));
      }
    }

    return () => {
      audio.pause();
    };
  }, [currentTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.play().catch(e => console.error('Playback error:', e));
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = volume / 100;
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      if (repeat === 'one') {
        audio.currentTime = 0;
        audio.play();
      } else {
        playNext();
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [repeat, playNext, setCurrentTime, setDuration]);

  const handleProgressChange = (e) => {
    const audio = audioRef.current;
    audio.currentTime = parseFloat(e.target.value);
    setCurrentTime(audio.currentTime);
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!currentTrack) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-spotify-gray border-t border-gray-700 p-4">
        <div className="text-center text-gray-400">
          Select a song to start playing
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-spotify-gray border-t border-gray-700">
      {/* Progress Bar */}
      <div className="w-full px-4 pt-2">
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={handleProgressChange}
          className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-spotify-green"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Player Controls */}
      <div className="flex items-center justify-between p-4">
        {/* Track Info */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          {currentTrack.image?.[0]?.url && (
            <img
              src={currentTrack.image[0].url}
              alt={currentTrack.name}
              className="w-14 h-14 rounded object-cover"
            />
          )}
          <div className="min-w-0">
            <p className="text-sm font-semibold truncate">
              {currentTrack.name}
            </p>
            <p className="text-xs text-gray-400 truncate">
              {currentTrack.artists?.[0]?.name || 'Unknown Artist'}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-6 flex-1 justify-center">
          <button
            onClick={shuffleQueue}
            className={`transition-colors ${
              shuffle ? 'text-spotify-green' : 'text-gray-400 hover:text-white'
            }`}
            title="Shuffle"
          >
            <FaRandom size={16} />
          </button>

          <button
            onClick={playPrevious}
            className="text-gray-400 hover:text-white transition-colors"
            title="Previous"
          >
            <FaStepBackward size={18} />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="bg-spotify-green text-black rounded-full p-3 hover:bg-green-500 transition-colors"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
          </button>

          <button
            onClick={playNext}
            className="text-gray-400 hover:text-white transition-colors"
            title="Next"
          >
            <FaStepForward size={18} />
          </button>

          <button
            onClick={toggleRepeat}
            className={`transition-colors ${
              repeat !== 'off' ? 'text-spotify-green' : 'text-gray-400 hover:text-white'
            }`}
            title="Repeat"
          >
            <FaRedoAlt size={16} />
            {repeat === 'one' && (
              <span className="text-xs ml-1">1</span>
            )}
          </button>
        </div>

        {/* Volume */}
        <div className="flex items-center gap-2 flex-1 justify-end">
          <FaVolumeUp size={16} className="text-gray-400" />
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(parseInt(e.target.value))}
            className="w-24 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-spotify-green"
          />
          <span className="text-xs text-gray-400 w-8">{volume}%</span>
        </div>
      </div>
    </div>
  );
}
