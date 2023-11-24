import React from 'react';
import styled from 'styled-components';

const StyledCell = styled.div`
  width: 40px;
  height: 40px;
  background-color: #bdc3c7;
  border: 1px solid white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  cursor: pointer;
`;

export default function Cell({ details, updateFlag, revealcell, isFlagMode }) {
    const handleClick = (e) => {
        if (isFlagMode) {
            updateFlag(e, details.x, details.y); // Handle flagging
        } else {
            revealcell(details.x, details.y); // Handle revealing
        }
    };

    return (
        <StyledCell onClick={(e) => handleClick(e)}>
            {details.flagged ? "F" : details.revealed ? details.value : ""}
        </StyledCell>
    );
}