import React, { useState, useEffect } from 'react';
import { Modal } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setDifficulty, setTheme, setGridSize } from '../../redux/gameSettingsSlice';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { selectGameSettings } from '../../redux/gameSettingsSlice';

import LeaderBoard from '../../components/LeaderBoard/LeaderBoard';
import { DifficultySelect, ThemeSelect, GridSizeSelect } from '../../components/FormControl'; // Custom form controls
import { SettingsWrapper, Title, SettingsContainer } from '../GameSettings/StyledGameSettingsComponents'; // Import styled components



function GameSettingsPage({ theme }) {
  const [isScoreboardOpen, setIsScoreboardOpen] = useState(false);


  const navigate = useNavigate();
  const dispatch = useDispatch();

  const gameSettings = useSelector(selectGameSettings);

  const openScoreboard = () => {
    setIsScoreboardOpen(true);
  };

  const closeScoreboard = () => {
    setIsScoreboardOpen(false);
  };


  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxHeight: '80%',
    overflowY: 'auto',
    backgroundColor: theme.secondaryBackground,
    boxShadow: 24,
    padding: '20px',
    outline: 'none',
  };




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
        <Button style={{ marginTop: "1rem" }} size="large" variant="contained" onClick={openScoreboard}>
          View Leader Board
        </Button>
        <Modal open={isScoreboardOpen} onClose={closeScoreboard}>
          <div style={modalStyle}>
            <LeaderBoard />
          </div>
        </Modal>
      </SettingsWrapper>
    </SettingsContainer>
  );
}

export default GameSettingsPage;