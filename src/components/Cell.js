import React from 'react';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag } from '@fortawesome/free-solid-svg-icons';
import mineImage from '../assets/mine1.ico';
import { selectGameSettings } from '../redux/gameSettingsSlice';
import { useDispatch, useSelector } from 'react-redux';



const StyledCell = styled.div`
  width: ${props => props.gridSize};
  height: ${props => props.gridSize};
  border-top: 2px solid ${(props) => props.theme.cellBackgroundRevealed};
  border-left: 2px solid ${(props) => props.theme.cellBackgroundRevealed};
  border-bottom: 2px solid ${(props) => props.theme.secondaryBackground};
  border-right: 2px solid ${(props) => props.theme.secondaryBackground};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s, box-shadow 0.2s;
  font-family: "Press Start 2P", cursive;

  ${props => (!props.details.revealed || props.details.flagged) && css`
    background-color: ${props.theme.cellBackgroundUnrevealed};
    box-shadow: ${props.theme.cellBoxShadow}; 
    background-image: ${props.theme.cellBackgroundGradient};
  `}

  ${props => (props.details.revealed && !props.details.flagged) && css`
    color: ${props.details.value === 1
            ? props.theme.cellvalue1
            : props.details.value === 2
                ? props.theme.cellvalue2
                : props.details.value === 3
                    ? props.theme.cellvalue3
                    : props.theme.cellTextColor};
    background-color: ${props.theme.cellBackgroundRevealed};
    box-shadow: none; 
  `}

  

`;

const MineImage = styled.img`
  width: 30x; 
  height: 30px;
`;

export default function Cell({ details, updateFlag, revealCell, isFlagMode, onContextMenu, gameOver }) {
    const handleClick = (e) => {
        console.log(isFlagMode)
        if (isFlagMode) {
            updateFlag(details.x, details.y); // Handle flagging
        } else {
            revealCell(details.x, details.y); // Handle revealing
        }
    };

    const gameSettings = useSelector(selectGameSettings);
    const getCellSize = (size) => {
        switch (size) {
            case 'small': return '30px';
            case 'medium': return '40px';
            case 'large': return '50px';
            default: return '35px'; // default size
        }
    };
    return (

        <StyledCell details={details} gridSize={getCellSize(gameSettings.gridSize)} onClick={(e) => handleClick(e)} onContextMenu={onContextMenu}>
            {gameOver && details.value === 'X' ? (
                <MineImage src={mineImage} alt="Mine" />
            ) : details.flagged && !details.revealed ? (
                <FontAwesomeIcon icon={faFlag} style={{ color: 'red' }} />
            ) : details.revealed ? (
                details.value === 0 ? (
                    null // Display nothing (blank) for value 0
                ) : (
                    details.value
                )
            ) : (
                ''
            )}
        </StyledCell>
    );
}