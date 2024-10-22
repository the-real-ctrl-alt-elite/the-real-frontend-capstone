import React, {
  createContext, useState, useContext, useMemo, useEffect,
} from 'react';

// const ThemeContext = createContext(null);

// const ThemeProvider = ({ children }) => {
//   const [theme, setTheme] = useState('light');

//   const value = useMemo(() => {
//     const toggleTheme = () => {
//       if (theme === 'light') {
//         setTheme('dark');
//       } else {
//         setTheme('light');
//       }
//     };
//     return { theme, toggleTheme };
//   }, [theme, setTheme]);

//   useEffect(() => {
//     document.documentElement.setAttribute(
//       'data-theme',
//       theme ? 'dark' : 'light',
//     );
//   }, [theme]);
//   return (
//     <ThemeContext.Provider value={value}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// const useTheme = () => {
//   const context = useContext(ThemeContext);

//   if (context === null) {
//     throw new Error('useTheme must be used within a ThemeProvider');
//   }
//   return context;
// };

// export { ThemeProvider, useTheme };

const ThemeContext = createContext();

const useTheme = () => {
  return useContext(ThemeContext);
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
