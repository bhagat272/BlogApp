import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme, selectTheme } from '../redux/slices.js/themeSlice';
import { Button } from '@mui/material';

const ThemeSwitcher = () => {
  const dispatch = useDispatch();
  const currentTheme = useSelector(selectTheme);

  return (
    <Button onClick={() => dispatch(toggleTheme())}>
      Switch to {currentTheme === 'light' ? 'Dark' : 'Light'} Mode
    </Button>
  );
};

export default ThemeSwitcher;
