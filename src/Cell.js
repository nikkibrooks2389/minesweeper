import React from 'react';
import styled from 'styled-components';

const StyledCell = styled.div`
  width: 30px; // Adjust size as needed
  height: 30px;
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: ${({ cellData }) => cellData.isRevealed ? '#e0e0e0' : '#f0f0f0'};
`;

const Cell = ({ cellData, onClick, onContextMenu }) => {
    return (
        <StyledCell
            onClick={onClick}
            onContextMenu={onContextMenu}
            cellData={cellData}>
            {/* Render cell content based on cellData */}
        </StyledCell>
    );
};

export default Cell;