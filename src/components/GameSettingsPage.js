import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setDifficulty, setTheme, setGridSize } from '../redux/gameSettingsSlice';
import { FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';

const SettingsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  font-family: 'VT323', monospace;
  background-color: #f4f4f4;
  border-radius: 20px; /* Add rounded corners */

`;

const SettingItem = styled.div`
  margin: 10px;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
  color: #333;
  text-transform: uppercase;
  letter-spacing: 2px;
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
      <Title>Game Settings</Title>

      <SettingItem>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="difficulty-label">Difficulty</InputLabel>
          <Select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            label="Difficulty"
          >
            <MenuItem value="beginner">Beginner</MenuItem>
            <MenuItem value="normal">Normal</MenuItem>
            <MenuItem value="hard">Hard</MenuItem>
            <MenuItem value="expert">Expert</MenuItem>
          </Select>
        </FormControl>
      </SettingItem>

      <SettingItem>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Theme</InputLabel>
          <Select
            value={selectedTheme}
            onChange={(e) => setSelectedTheme(e.target.value)}
            label="Theme"
          >
            <MenuItem value="light">Light</MenuItem>
            <MenuItem value="dark">Dark</MenuItem>
          </Select>
        </FormControl>
      </SettingItem>

      <SettingItem>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Grid Size</InputLabel>
          <Select
            value={selectedGridSize}
            onChange={(e) => setSelectedGridSize(e.target.value)}
            label="Grid Size"
          >
            <MenuItem value="small">Small</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="large">Large</MenuItem>
          </Select>
        </FormControl>
      </SettingItem>

      <Button variant="contained" onClick={handleStartGame}>
        Start Game
      </Button>
    </SettingsWrapper>
  );
}

export default GameSettingsPage;