import React, { useState, useEffect } from 'react';
import { useTheme } from '../../ThemeContext';

const ThemeToggle = ({ pumpkins, setPumpkins }) => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <label htmlFor='theme-toggle-switch' className='switch'>
      <input aria-label='theme-toggle' onChange={() => { toggleDarkMode(); setPumpkins(!pumpkins); }} checked={isDarkMode} type='checkbox' id='theme-toggle-switch' />
      <span className='slider round' />
    </label>
  );
};

export default ThemeToggle;
