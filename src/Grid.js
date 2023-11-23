import React from 'react';
import styled from 'styled-components';
import Cell from './Cell'; // Assuming you have a Cell component

const StyledGrid = styled.div`
  display: flex;
  flex-direction: column;
`;

const GridRow = styled.div`
  display: flex;
`;

const Grid = ({ gridData, onCellClick, onCellRightClick }) => {
    return (
        <StyledGrid>
            {gridData.map((row, rowIndex) => (
                <GridRow key={rowIndex}>
                    {row.map((cell, colIndex) => (
                        <Cell
                            key={colIndex}
                            cellData={cell}
                            onClick={() => onCellClick(rowIndex, colIndex)}
                            onContextMenu={(e) => onCellRightClick(e, rowIndex, colIndex)}
                        />
                    ))}
                </GridRow>
            ))}
        </StyledGrid>
    );
};

export default Grid;