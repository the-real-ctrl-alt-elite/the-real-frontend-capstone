import React, {
  createContext, useState, useContext, useMemo, useEffect,
} from 'react';

const ThemeContext = createContext();

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const ThemeProvider = ({ children }) => {
  const [isDarkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      isDarkMode ? 'dark' : 'light',
    );
  }, [isDarkMode]);

  const value = useMemo(() => {
    const toggleDarkMode = () => {
      setDarkMode((mode) => !mode);
    };

    return { isDarkMode, toggleDarkMode };
  }, [isDarkMode, setDarkMode]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export { useTheme, ThemeProvider };
