import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';

// Auth Components
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';

// Layout Components
import Sidebar from './components/Sidebar/Sidebar';
import Player from './components/Player/Player';
import Queue from './components/Music/Queue';

// Music Components
import Discover from './components/Music/Discover';
import Search from './components/Music/Search';
import Favorites from './components/Music/Favorites';
import PlaylistDetail from './components/Music/PlaylistDeatil';

// Protected Route
function ProtectedRoute({ children }) {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  const checkAuth = useAuthStore(state => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  // Auth pages layout
  if (!isAuthenticated) {
    return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    );
  }

  // Main app layout
  return (
    <Router>
      <div className="flex h-screen bg-jiosaavn-dark text-white">
        <Sidebar />

        <div className="flex-1 flex flex-col">
          <div className="flex-1 flex overflow-hidden">
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Discover />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/search"
                element={
                  <ProtectedRoute>
                    <Search />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/favorites"
                element={
                  <ProtectedRoute>
                    <Favorites />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/playlist/:id"
                element={
                  <ProtectedRoute>
                    <PlaylistDetail />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>

            <Queue />
          </div>

          <Player />
        </div>
      </div>
    </Router>
  );
}

export default App;
