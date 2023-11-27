// App.js

import React, { useState } from 'react';
import styled from 'styled-components';
import GameSettingsPage from './components/GameSettingsPage';
import Board from './components/Board';

const AppWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

function App() {
  const [gameStarted, setGameStarted] = useState(false);

  const handleStartGame = (difficulty, theme, gridSize) => {
    // Handle game start with selected settings (e.g., navigate to the game board)
    console.log(`Starting game with difficulty: ${difficulty}, theme: ${theme}, grid size: ${gridSize}`);
    // Add your logic to start the game here

    // For this example, we'll simply update the gameStarted state
    setGameStarted(true);
  };

  return (
    <AppWrapper>
      {gameStarted ? (
        // Render the game board or relevant component when the game has started
        // Replace this with your game board component
        <Board />
      ) : (
        // Render the GameSettingsPage when the game has not started
        <GameSettingsPage onStartGame={handleStartGame} />
      )}
    </AppWrapper>
  );
}

export default App;