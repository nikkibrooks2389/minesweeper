import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { setDifficulty, setTheme, setGridSize } from '../redux/gameSettingsSlice';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { selectGameSettings } from '../redux/gameSettingsSlice';
import { DifficultySelect, ThemeSelect, GridSizeSelect } from '../components/FormControl'; // Custom form controls

const SettingsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  font-family: "Press Start 2P", cursive;
  background-color: ${props => props.theme.secondaryBackground};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-style: dashed; /* Change the border style */
  border-color: #607d8b; /* Gray */ /* Change the border color */
  border-radius: 20px;
`;


const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
  color: ${props => props.theme.textColor};
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