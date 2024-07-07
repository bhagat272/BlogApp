import React, { useState } from 'react';
import { Button } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4'; // Moon icon
import Brightness7Icon from '@mui/icons-material/Brightness7'; // Sun icon
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const ThemeSwitcher = ({ children }) => {
  // Local state for theme mode
  const [localThemeMode, setLocalThemeMode] = useState('light');

  // Toggle theme function
  const handleToggleTheme = () => {
    setLocalThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  // Create a theme based on the local state
  const theme = createTheme({
    palette: {
      mode: localThemeMode,
      background: {
        default: localThemeMode === 'light' ? '#ffffff' : '#121212',
      },
      text: {
        primary: localThemeMode === 'light' ? '#000000' : '#ffffff',
      },
    },
    typography: {
      body1: {
        color: localThemeMode === 'light' ? '#000000' : '#ffffff',
      },
      body2: {
        color: localThemeMode === 'light' ? '#000000' : '#ffffff',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Button 
        variant='outlined'
        onClick={handleToggleTheme}
        startIcon={localThemeMode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
      >
        {localThemeMode === 'light' ? 'Dark' : 'Light'} Mode
      </Button>
      {/* Render children with the applied local theme */}
      {children}
    </ThemeProvider>
  );
};

export default ThemeSwitcher;
