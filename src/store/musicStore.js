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
  addToQueue: (track) => set((state) => ({
    queue: [...state.queue, track]
  })),
  
  addMultipleToQueue: (tracks) => set((state) => ({
    queue: [...state.queue, ...tracks]
  })),
  
  removeFromQueue: (index) => set((state) => ({
    queue: state.queue.filter((_, i) => i !== index)
  })),
  
  setQueue: (queue) => set({ queue, currentIndex: 0 }),
  
  clearQueue: () => set({ queue: [], currentIndex: 0, currentTrack: null }),
  
  playNext: () => set((state) => {
    const nextIndex = state.currentIndex + 1;
    if (nextIndex < state.queue.length) {
      return {
        currentIndex: nextIndex,
        currentTrack: state.queue[nextIndex],
        currentTime: 0,
        isPlaying: true
      };
    }
    return state;
  }),
  
  playPrevious: () => set((state) => {
    const prevIndex = state.currentIndex - 1;
    if (prevIndex >= 0) {
      return {
        currentIndex: prevIndex,
        currentTrack: state.queue[prevIndex],
        currentTime: 0,
        isPlaying: true
      };
    }
    return state;
  }),
  
  shuffleQueue: () => set((state) => {
    const shuffled = [...state.queue].sort(() => Math.random() - 0.5);
    return {
      queue: shuffled,
      shuffle: !state.shuffle
    };
  }),
  
  toggleRepeat: () => set((state) => {
    const repeatModes = ['off', 'all', 'one'];
    const currentMode = repeatModes.indexOf(state.repeat);
    const nextMode = repeatModes[(currentMode + 1) % repeatModes.length];
    return { repeat: nextMode };
  }),
  
  // Search and API actions
  setSearchResults: (results) => set({ searchResults: results }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
}));
