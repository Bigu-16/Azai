import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Projects from './pages/Projects';
import SpaceEdu from './pages/SpaceEdu';

function App() {
  return (
    <Router>
      <div className="relative min-h-screen">
        <div className="bg-starfield" />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/space-edu" element={<SpaceEdu />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
