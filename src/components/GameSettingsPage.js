import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setDifficulty, setTheme, setGridSize } from '../redux/gameSettingsSlice';

const SettingsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const SettingItem = styled.div`
  margin: 10px;
`;

function GameSettingsPage({ onStartGame }) {
  const dispatch = useDispatch();
  const [selectedDifficulty, setSelectedDifficulty] = useState('beginner');
  const [selectedTheme, setSelectedTheme] = useState('light');
  const [selectedGridSize, setSelectedGridSize] = useState('medium');

  // Function to handle starting the game with selected settings
  const handleStartGame = () => {
    // Dispatch actions to update Redux state
    dispatch(setDifficulty(selectedDifficulty));
    dispatch(setTheme(selectedTheme));
    dispatch(setGridSize(selectedGridSize));

    // Pass the selected settings to the parent component (App) to start the game
    onStartGame(selectedDifficulty, selectedTheme, selectedGridSize);
  };

  return (
    <SettingsWrapper>
      <h1>Game Settings</h1>

      <SettingItem>
        <label>Difficulty:</label>
        <select
          value={selectedDifficulty}
          onChange={(e) => setSelectedDifficulty(e.target.value)}
        >
          <option value="beginner">Beginner</option>
          <option value="normal">Normal</option>
          <option value="hard">Hard</option>
          <option value="expert">Expert</option>
        </select>
      </SettingItem>

      <SettingItem>
        <label>Theme:</label>
        <select
          value={selectedTheme}
          onChange={(e) => setSelectedTheme(e.target.value)}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </SettingItem>

      <SettingItem>
        <label>Grid Size:</label>
        <select
          value={selectedGridSize}
          onChange={(e) => setSelectedGridSize(e.target.value)}
        >
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
      </SettingItem>

      <button onClick={handleStartGame}>Start Game</button>
    </SettingsWrapper>
  );
}

export default GameSettingsPage;