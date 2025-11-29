import { create } from 'zustand';
import Cookies from 'js-cookie';

export const useAuthStore = create((set, get) => ({
  // User state
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  token: localStorage.getItem('jiosaavn_token') || null,

  // Actions
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  setToken: (token) => {
    if (token) {
      localStorage.setItem('jiosaavn_token', token);
      Cookies.set('jiosaavn_token', token, { expires: 30 });
    } else {
      localStorage.removeItem('jiosaavn_token');
      Cookies.remove('jiosaavn_token');
    }
    set({ token });
  },

  // Register user
  register: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate registration (In production, connect to your backend)
      const user = {
        id: Date.now().toString(),
        ...userData,
        createdAt: new Date(),
      };

      // Store in localStorage (simulated backend)
      const users = JSON.parse(localStorage.getItem('jiosaavn_users') || '[]');
      
      // Check if user already exists
      if (users.find(u => u.email === userData.email)) {
        throw new Error('User already exists');
      }

      users.push(user);
      localStorage.setItem('jiosaavn_users', JSON.stringify(users));

      // Auto login after registration
      const token = `token_${user.id}_${Date.now()}`;
      get().setToken(token);
      set({ user, isAuthenticated: true, isLoading: false });

      return { success: true, user };
    } catch (error) {
      set({
        error: error.message || 'Registration failed',
        isLoading: false,
      });
      throw error;
    }
  },

  // Login user
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const users = JSON.parse(localStorage.getItem('jiosaavn_users') || '[]');
      const user = users.find(u => u.email === email && u.password === password);

      if (!user) {
        throw new Error('Invalid email or password');
      }

      const token = `token_${user.id}_${Date.now()}`;
      get().setToken(token);
      set({ user, isAuthenticated: true, isLoading: false });

      return { success: true, user };
    } catch (error) {
      set({
        error: error.message || 'Login failed',
        isLoading: false,
      });
      throw error;
    }
  },

  // Logout user
  logout: () => {
    get().setToken(null);
    set({ user: null, isAuthenticated: false });
  },

  // Check auth status
  checkAuth: () => {
    const token = localStorage.getItem('jiosaavn_token');
    if (token) {
      // In production, verify token with backend
      const users = JSON.parse(localStorage.getItem('jiosaavn_users') || '[]');
      const userId = token.split('_')[1];
      const user = users.find(u => u.id === userId);
      if (user) {
        set({ user, isAuthenticated: true, token });
      }
    }
  },

  // Update user profile
  updateProfile: (userData) => set((state) => ({
    user: { ...state.user, ...userData }
  })),
}));
