import React from 'react';
import styled from 'styled-components';
import GameSettingsPage from './components/GameSettingsPage';
import Board from './components/Board';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './style/theme';
import { useSelector } from 'react-redux';
import { selectGameSettings } from './redux/gameSettingsSlice';
import { GlobalStyle } from './style/globalStyle';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

function App() {
  const selectedTheme = useSelector(selectGameSettings).theme;
  const themeToApply = selectedTheme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={themeToApply}>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<Navigate replace to="/settings" />} />
          <Route path="/settings" element={<GameSettingsPage />} />
          <Route path="/board" element={<Board theme={themeToApply} />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;