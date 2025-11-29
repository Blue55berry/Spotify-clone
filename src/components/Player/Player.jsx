import React, { useEffect, useRef, useState } from 'react';
import { useMusicStore } from '../../store/musicStore';
import {
  FaPlay,
  FaPause,
  FaStepBackward,
  FaStepForward,
  FaRandom,
  FaRedoAlt,
  FaVolumeUp,
  FaHeart,
  FaRegHeart,
} from 'react-icons/fa';

export default function Player() {
  const audioRef = useRef(new Audio());
  const [isBuffering, setIsBuffering] = useState(false);

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
    addToFavorites,
    removeFromFavorites,
    isFavorited,
  } = useMusicStore();

  useEffect(() => {
    const audio = audioRef.current;

    if (currentTrack?.url) {
      audio.src = currentTrack.url;

      if (isPlaying) {
        audio.play().catch(e => {
          console.error('Playback error:', e);
          setIsBuffering(false);
        });
      }
    }

    return () => {
      audio.pause();
    };
  }, [currentTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    if (isPlaying && currentTrack?.url) {
      audio.play().catch(e => {
        console.error('Playback error:', e);
        setIsPlaying(false);
      });
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
      setIsBuffering(false);
    };

    const handleEnded = () => {
      if (repeat === 'one') {
        audio.currentTime = 0;
        audio.play();
      } else {
        playNext();
      }
    };

    const handleBuffering = () => {
      setIsBuffering(true);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('waiting', handleBuffering);
    audio.addEventListener('playing', () => setIsBuffering(false));

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('waiting', handleBuffering);
      audio.removeEventListener('playing', () => setIsBuffering(false));
    };
  }, [repeat, playNext, setCurrentTime, setDuration, setIsPlaying]);

  const handleProgressChange = (e) => {
    const audio = audioRef.current;
    const newTime = parseFloat(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleToggleFavorite = () => {
    if (currentTrack) {
      if (isFavorited(currentTrack.id)) {
        removeFromFavorites(currentTrack.id);
      } else {
        addToFavorites(currentTrack);
      }
    }
  };

  if (!currentTrack) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-jiosaavn-card border-t border-jiosaavn-gray p-4">
        <div className="text-center text-gray-400">
          Select a song to start playing
        </div>
      </div>
    );
  }

  const isFavorite = currentTrack && isFavorited(currentTrack.id);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-jiosaavn-darker to-jiosaavn-card border-t border-jiosaavn-gray z-40">
      {/* Progress Bar */}
      <div className="w-full px-4 pt-3">
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={handleProgressChange}
          className="w-full h-1 bg-jiosaavn-gray rounded-lg appearance-none cursor-pointer accent-jiosaavn-green hover:accent-green-500 transition-all"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Player Controls */}
      <div className="flex items-center justify-between p-4 gap-4">
        {/* Track Info */}
        <div className="flex items-center gap-3 min-w-0 flex-1 max-w-xs">
          {currentTrack.image?.[0]?.url && (
            <img
              src={currentTrack.image[0].url}
              alt={currentTrack.name}
              className="w-14 h-14 rounded object-cover shadow-lg"
            />
          )}
          <div className="min-w-0">
            <p className="text-sm font-semibold truncate">
              {currentTrack.name}
            </p>
            <p className="text-xs text-gray-400 truncate">
              {currentTrack.artist || 'Unknown Artist'}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4 flex-1 justify-center">
          <button
            onClick={shuffleQueue}
            className={`transition-colors ${
              shuffle ? 'text-jiosaavn-green' : 'text-gray-400 hover:text-white'
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
            disabled={isBuffering}
            className="bg-jiosaavn-green text-black rounded-full p-3 hover:bg-green-500 transition-colors disabled:opacity-50"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isBuffering ? (
              <div className="animate-spin w-5 h-5 border-2 border-black border-t-transparent rounded-full" />
            ) : isPlaying ? (
              <FaPause size={20} />
            ) : (
              <FaPlay size={20} />
            )}
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
            className={`transition-colors relative ${
              repeat !== 'off' ? 'text-jiosaavn-green' : 'text-gray-400 hover:text-white'
            }`}
            title="Repeat"
          >
            <FaRedoAlt size={16} />
            {repeat === 'one' && (
              <span className="absolute -bottom-1 -right-1 text-xs bg-jiosaavn-green text-black rounded-full w-4 h-4 flex items-center justify-center">
                1
              </span>
            )}
          </button>
        </div>

        {/* Volume & Favorite */}
        <div className="flex items-center gap-4 flex-1 justify-end">
          <button
            onClick={handleToggleFavorite}
            className={`transition-colors ${
              isFavorite ? 'text-jiosaavn-green' : 'text-gray-400 hover:text-white'
            }`}
            title="Add to Favorites"
          >
            {isFavorite ? <FaHeart size={18} /> : <FaRegHeart size={18} />}
          </button>

          <div className="flex items-center gap-2">
            <FaVolumeUp size={14} className="text-gray-400" />
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(parseInt(e.target.value))}
              className="w-20 h-1 bg-jiosaavn-gray rounded-lg appearance-none cursor-pointer accent-jiosaavn-green"
            />
            <span className="text-xs text-gray-400 w-8">{volume}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
