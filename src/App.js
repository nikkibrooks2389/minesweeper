import React from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './style/globalStyle';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';
import { useTheme } from './hooks/useTheme';
function App() {

  const themeToApply = useTheme();

  return (
    <ThemeProvider theme={themeToApply}>
      <GlobalStyle />
      <Router>
        <AppRoutes theme={themeToApply} />
      </Router>
    </ThemeProvider>
  );
}

export default App;