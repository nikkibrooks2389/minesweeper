import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { setDifficulty, setTheme, setGridSize } from '../redux/gameSettingsSlice';
import { FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { selectGameSettings } from '../redux/gameSettingsSlice';
const SettingsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  font-family: "Press Start 2P", cursive;
  background-color: #f4f4f4;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-style: dashed; /* Change the border style */
  border-color: #607d8b; /* Gray */ /* Change the border color */
  border-radius: 20px;
`;


const SettingItem = styled.div`
  margin: 20px;
  background-color: #fff;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
  color: #333;
  text-transform: uppercase;
  letter-spacing: 2px;
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
   font-size: 1.5rem;
}
`;

const SettingsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: ${(props) => props.theme.background};
  `

function GameSettingsPage({ onStartGame }) {

  const [selectedDifficulty, setSelectedDifficulty] = useState('beginner');
  const [selectedTheme, setSelectedTheme] = useState('light');
  const [selectedGridSize, setSelectedGridSize] = useState('medium');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const gameSettings = useSelector(selectGameSettings);
  // Function to handle starting the game with selected settings
  const handleStartGame = () => {
    navigate('/board');

  };

  return (
    <SettingsContainer>
      <SettingsWrapper>
        <Title>MINESWEEPER</Title>

        <SettingItem>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="difficulty-label">Difficulty</InputLabel>
            <Select
              value={gameSettings.difficulty}
              onChange={(e) => dispatch(setDifficulty(e.target.value))}
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
              value={gameSettings.theme}
              onChange={(e) => dispatch(setTheme(e.target.value))}
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
              value={gameSettings.gridSize}
              onChange={(e) => dispatch(setGridSize(e.target.value))}
              label="Grid Size"
            >
              <MenuItem value="small">Small</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="large">Large</MenuItem>
            </Select>
          </FormControl>
        </SettingItem>

        <Button style={{ marginTop: "1rem" }} size="large" variant="contained" onClick={handleStartGame}>
          Start Game
        </Button>
      </SettingsWrapper>
    </SettingsContainer>
  );
}

export default GameSettingsPage;