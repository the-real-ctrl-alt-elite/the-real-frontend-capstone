import React, { useState, useEffect } from 'react';
import { useTheme } from '../../ThemeContext';

const ThemeToggle = ({ pumpkins, setPumpkins }) => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <div className='theme-toggle-box'>
      <span className='theme-name-display'>{isDarkMode ? 'Dark Mode' : 'Light Mode'}</span>
      <label htmlFor='theme-toggle-switch' className='switch'>
        <input aria-label='theme-toggle' onChange={() => { toggleDarkMode(); setPumpkins(!pumpkins); }} checked={isDarkMode} type='checkbox' id='theme-toggle-switch' />
        <span className='slider round' />
      </label>
    </div>
  );
};

export default ThemeToggle;
