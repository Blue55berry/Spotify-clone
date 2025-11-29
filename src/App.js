import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sliderbar';
import Player from './components/Player';
import Queue from './components/Queue';
import Discover from './components/Discover';
import Search from './components/Search';

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-spotify-dark text-white">
        <Sidebar />
        
        <div className="flex-1 flex flex-col">
          <div className="flex-1 flex overflow-hidden">
            <Routes>
              <Route path="/" element={<Discover />} />
              <Route path="/search" element={<Search />} />
              <Route path="/library" element={<Discover />} />
              <Route path="/liked" element={<Discover />} />
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
