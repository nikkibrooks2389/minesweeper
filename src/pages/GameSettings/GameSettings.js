import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { setDifficulty, setTheme, setGridSize } from '../../redux/gameSettingsSlice';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { selectGameSettings } from '../../redux/gameSettingsSlice';
import { DifficultySelect, ThemeSelect, GridSizeSelect } from '../../components/FormControl'; // Custom form controls
import { SettingsWrapper, Title, SettingsContainer } from '../GameSettings/StyledGameSettingsComponents'; // Import styled components


function GameSettingsPage() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const gameSettings = useSelector(selectGameSettings);


  return (
    <SettingsContainer>
      <SettingsWrapper>
        <Title>MINESWEEPER</Title>
        <DifficultySelect value={gameSettings.difficulty} onChange={(value) => dispatch(setDifficulty(value))} />
        <ThemeSelect value={gameSettings.theme} onChange={(value) => dispatch(setTheme(value))} />
        <GridSizeSelect value={gameSettings.gridSize} onChange={(value) => dispatch(setGridSize(value))} />
        <Button style={{ marginTop: "1rem" }} size="large" variant="contained" onClick={() => navigate('/board')}>
          Start Game
        </Button>
      </SettingsWrapper>
    </SettingsContainer>
  );
}

export default GameSettingsPage;