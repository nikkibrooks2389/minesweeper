import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag } from '@fortawesome/free-solid-svg-icons';
import mineImage from '../../assets/mine1.ico';
import { selectGameSettings } from '../../redux/gameSettingsSlice';
import { useSelector } from 'react-redux';
import { StyledCell, MineImage } from '../Cell/StyledCellComponent';


export default function Cell({ details, updateFlag, revealCell, isFlagMode, onContextMenu, gameOver }) {
    const handleClick = (e) => {
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
            ) : details?.flagged ? (
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