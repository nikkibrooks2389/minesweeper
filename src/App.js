// App.js

import React, { useState } from 'react';
import styled from 'styled-components';
import GameSettingsPage from './components/GameSettingsPage';
import Board from './components/Board';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './style/theme';
import { useDispatch, useSelector } from 'react-redux';
import { selectGameSettings } from './redux/gameSettingsSlice';
import { GlobalStyle } from './style/globalStyle';



function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const selectedTheme = useSelector(selectGameSettings).theme;

  const handleStartGame = (difficulty, theme, gridSize) => {

    setGameStarted(true);
  };


  const themeToApply = selectedTheme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={themeToApply}>
      <GlobalStyle />
      <div>
        {gameStarted ? (
          // Render the game board or relevant component when the game has started
          // Replace this with your game board component
          <Board theme={themeToApply} />
        ) : (
          // Render the GameSettingsPage when the game has not started
          <GameSettingsPage onStartGame={handleStartGame} />
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;