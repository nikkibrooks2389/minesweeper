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

  ${props => !props?.details?.revealed && css`
  background-color: #bdc3c7;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2); /* Shadow for 3D effect */
  background-image: linear-gradient(to bottom right, #dfe4ea, #bdc3c7); /* Gradient for 3D effect */

  `}

  ${props => props?.details?.revealed && css`
  color: ${props => props?.details?.value === 1 ? 'blue' : props?.details?.value === 2 ? 'green' : props?.details?.value === 3 ? 'red' : 'black'};
  background-color: #bdc3c7;
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
            {details.flagged ? <FontAwesomeIcon icon={faFlag} style={{ color: 'red' }} /> : details.revealed && details.value != 0 ? details.value : ""}
        </StyledCell>
    );
}