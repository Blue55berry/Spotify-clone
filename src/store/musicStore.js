import { create } from 'zustand';

export const useMusicStore = create((set, get) => ({
  // Player state
  currentTrack: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 70,

  // Playlist state
  queue: [],
  currentIndex: 0,
  shuffle: false,
  repeat: 'off', // 'off', 'one', 'all'

  // Favorites
  favorites: JSON.parse(localStorage.getItem('jiosaavn_favorites') || '[]'),

  // Playlists
  userPlaylists: JSON.parse(localStorage.getItem('jiosaavn_playlists') || '[]'),

  // UI state
  isLoading: false,
  error: null,
  searchResults: [],

  // Actions
  setCurrentTrack: (track) => set({ currentTrack: track }),
  setIsPlaying: (playing) => set({ isPlaying: playing }),
  setCurrentTime: (time) => set({ currentTime: time }),
  setDuration: (duration) => set({ duration: duration }),
  setVolume: (volume) => set({ volume: Math.max(0, Math.min(100, volume)) }),

  // Queue actions
  addToQueue: (track) =>
    set((state) => ({
      queue: [...state.queue, track],
    })),

  setQueue: (queue) =>
    set({
      queue,
      currentIndex: 0,
      currentTrack: queue[0] || null,
    }),

  clearQueue: () =>
    set({
      queue: [],
      currentIndex: 0,
      currentTrack: null,
    }),

  playNext: () =>
    set((state) => {
      const nextIndex = state.currentIndex + 1;
      if (nextIndex < state.queue.length) {
        return {
          currentIndex: nextIndex,
          currentTrack: state.queue[nextIndex],
          currentTime: 0,
          isPlaying: true,
        };
      }
      return state;
    }),

  playPrevious: () =>
    set((state) => {
      if (state.currentTime > 3) {
        return { currentTime: 0 };
      }
      const prevIndex = state.currentIndex - 1;
      if (prevIndex >= 0) {
        return {
          currentIndex: prevIndex,
          currentTrack: state.queue[prevIndex],
          currentTime: 0,
          isPlaying: true,
        };
      }
      return state;
    }),

  removeFromQueue: (index) =>
    set((state) => ({
      queue: state.queue.filter((_, i) => i !== index),
    })),

  shuffleQueue: () =>
    set((state) => {
      const shuffled = [...state.queue].sort(() => Math.random() - 0.5);
      return {
        queue: shuffled,
        shuffle: !state.shuffle,
      };
    }),

  toggleRepeat: () =>
    set((state) => {
      const modes = ['off', 'all', 'one'];
      const currentIdx = modes.indexOf(state.repeat);
      const nextMode = modes[(currentIdx + 1) % modes.length];
      return { repeat: nextMode };
    }),

  // Favorites
  addToFavorites: (track) =>
    set((state) => {
      const updated = [
        ...state.favorites.filter(t => t.id !== track.id),
        track,
      ];
      localStorage.setItem('jiosaavn_favorites', JSON.stringify(updated));
      return { favorites: updated };
    }),

  removeFromFavorites: (trackId) =>
    set((state) => {
      const updated = state.favorites.filter(t => t.id !== trackId);
      localStorage.setItem('jiosaavn_favorites', JSON.stringify(updated));
      return { favorites: updated };
    }),

  isFavorited: (trackId) => {
    const { favorites } = get();
    return favorites.some(t => t.id === trackId);
  },

  // Playlists
  createPlaylist: (name, description = '') =>
    set((state) => {
      const newPlaylist = {
        id: Date.now().toString(),
        name,
        description,
        tracks: [],
        createdAt: new Date(),
      };
      const updated = [...state.userPlaylists, newPlaylist];
      localStorage.setItem('jiosaavn_playlists', JSON.stringify(updated));
      return { userPlaylists: updated };
    }),

  addToPlaylist: (playlistId, track) =>
    set((state) => {
      const updated = state.userPlaylists.map(p => {
        if (p.id === playlistId) {
          return {
            ...p,
            tracks: [...p.tracks.filter(t => t.id !== track.id), track],
          };
        }
        return p;
      });
      localStorage.setItem('jiosaavn_playlists', JSON.stringify(updated));
      return { userPlaylists: updated };
    }),

  removeFromPlaylist: (playlistId, trackId) =>
    set((state) => {
      const updated = state.userPlaylists.map(p => {
        if (p.id === playlistId) {
          return {
            ...p,
            tracks: p.tracks.filter(t => t.id !== trackId),
          };
        }
        return p;
      });
      localStorage.setItem('jiosaavn_playlists', JSON.stringify(updated));
      return { userPlaylists: updated };
    }),

  deletePlaylist: (playlistId) =>
    set((state) => {
      const updated = state.userPlaylists.filter(p => p.id !== playlistId);
      localStorage.setItem('jiosaavn_playlists', JSON.stringify(updated));
      return { userPlaylists: updated };
    }),

  // Search & UI
  setSearchResults: (results) => set({ searchResults: results }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
}));
