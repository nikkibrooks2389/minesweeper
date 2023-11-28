import React from 'react';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag } from '@fortawesome/free-solid-svg-icons';

const StyledCell = styled.div`
  width: 40px;
  height: 40px;
  border: 1px solid white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s, box-shadow 0.2s;
  font-family: 'VT323', monospace;
  ${props =>
        !props?.details?.revealed &&
        css`
      background-color: ${props.theme.cellBackgroundUnrevealed};
      box-shadow: ${props.theme.cellBoxShadow}; /* Lighter shadow on top */
      background-image: ${props.theme.cellBackgroundGradient}; /* Gradient for old-school effect */
    `}

${props =>
        props?.details?.revealed &&
        css`
      color: ${props =>
                props?.details?.value === 1
                    ? props.theme.cellvalue1
                    : props?.details?.value === 2
                        ? props.theme.cellvalue2
                        : props?.details?.value === 3
                            ? props.theme.cellvalue3
                            : props.theme.cellTextColor};
      background-color: ${props.theme.cellBackgroundRevealed};
      box-shadow: none; /* No shadow */
    `}
`;

export default function Cell({ details, updateFlag, revealCell, isFlagMode }) {
    const handleClick = (e) => {
        if (isFlagMode) {
            updateFlag(e, details.x, details.y); // Handle flagging
        } else {
            revealCell(details.x, details.y); // Handle revealing
        }
    };

    return (
        <StyledCell details={details} onClick={(e) => handleClick(e)}>
            {details.flagged ? (
                <FontAwesomeIcon icon={faFlag} style={{ color: 'red' }} />
            ) : details.revealed && details.value !== 0 ? (
                details.value
            ) : (
                ''
            )}
        </StyledCell>
    );
}