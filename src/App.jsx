// src/App.jsx
import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProjectList from './components/ProjectList';
import ProjectDetail from './components/ProjectDetail';
import Filters from './components/Filters';
import SearchBar from './components/SearchBar';
import { searchProjects } from './lib/search';
import { projectsData } from './data/projects';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedThemes, setSelectedThemes] = useState([]);

  const filteredProjects = useMemo(() => {
    return searchProjects(projectsData, searchQuery, selectedThemes);
  }, [searchQuery, selectedThemes]);

  const handleThemeChange = (themeName) => {
    setSelectedThemes((prevThemes) =>
      prevThemes.includes(themeName)
        ? prevThemes.filter((t) => t !== themeName)
        : [...prevThemes, themeName]
    );
  };

  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <h1>
            <Link to="/">🎨 ZUŠ Art Atlas</Link>
          </h1>
          <p className="subtitle">Basic Art School Project Gallery</p>
        </header>

        <Routes>
          <Route
            path="/"
            element={
              <div className="home-container">
                <SearchBar
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                />
                <Filters
                  selectedThemes={selectedThemes}
                  onThemeChange={handleThemeChange}
                />
                <ProjectList
                  projects={filteredProjects}
                  totalProjects={projectsData.length}
                />
              </div>
            }
          />
          <Route
            path="/project/:id"
            element={<ProjectDetail projects={projectsData} />}
          />
        </Routes>

        <footer className="app-footer">
          <p>© 2024 ZUŠ Art Atlas. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
