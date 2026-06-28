// src/components/Filters.jsx
import React from 'react';
import { THEME_FILTERS } from '../data/filters';
import './Filters.css';

const Filters = ({ selectedThemes, onThemeChange }) => {
  const handleThemeClick = (themeName) => {
    onThemeChange(themeName);
  };

  return (
    <div className="filters-container">
      <h2>Filter by Theme</h2>
      <div className="theme-buttons">
        {THEME_FILTERS.map((theme) => (
          <button
            key={theme.name}
            className={`theme-btn ${selectedThemes.includes(theme.name) ? 'active' : ''}`}
            onClick={() => handleThemeClick(theme.name)}
            style={{
              borderColor: theme.color,
              color: selectedThemes.includes(theme.name) ? theme.color : '#333',
              backgroundColor: selectedThemes.includes(theme.name)
                ? `${theme.color}15`
                : 'transparent',
            }}
          >
            <span className="theme-dot" style={{ backgroundColor: theme.color }}></span>
            {theme.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Filters;
