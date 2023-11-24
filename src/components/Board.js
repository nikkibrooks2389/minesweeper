import React, { useState, useEffect } from "react";
import InitBoard from '../Util/initBoard';
import { revealed } from '../Util/reveal';
import Cell from './Cell';

import styled from 'styled-components';

const FlagButton = styled.button`
  display: none;

  @media (max-width: 768px) { // Adjust breakpoint as needed
    display: block;
  }
`;


const BoardContainer = styled.div`
  color: white;
  text-align: center;
  font-size: 35px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: fit-content;
  color: white;
`;

function Board() {
    const [grid, setGrid] = useState([]);
    const [nonMinecount, setNonMinecount] = useState(0);
    const [mineLocation, setmineLocation] = useState([]);

    const [isFlagMode, setIsFlagMode] = useState(false);

    const toggleFlagMode = () => {
        setIsFlagMode(!isFlagMode);
    };
    useEffect(() => {
        const freshBoard = () => {
            const newBoard = InitBoard(10, 10, 20);
            setNonMinecount(10 * 10 - 20);
            // console.log(newBoard.mineLocation);
            setmineLocation(newBoard.mineLocation);
            setGrid(newBoard.board);
        }
        freshBoard();
    }, []);

    const updateFlag = (e, x, y) => {
        console.log(e, x, y)
        e.preventDefault();
        let newGrid = JSON.parse(JSON.stringify(grid));
        newGrid[x][y].flagged = !newGrid[x][y].flagged; // Toggle the flagged state
        setGrid(newGrid);
    }
    console.log(grid)
    //revealing all cells and the minelocation with all mines when clicked on mines
    const revealcell = (x, y) => {
        let newGrid = JSON.parse(JSON.stringify(grid));
        if (newGrid[x][y].value === "X") {
            alert("you clicked mine")
            for (let i = 0; i < mineLocation.length; i++) {
                newGrid[mineLocation[i][0]][mineLocation[i][1]].revealed = true;
            }
            setGrid(newGrid);
        }
        else {
            let revealedboard = revealed(newGrid, x, y, nonMinecount);
            setGrid(revealedboard.arr);
            setNonMinecount(revealedboard.newNonMines);
        }

    }

    return (
        <BoardContainer>
            <FlagButton onClick={toggleFlagMode}>
                {isFlagMode ? 'Flagging Mode ON' : 'Flagging Mode OFF'}
            </FlagButton>
            <div>Non-Mines: {nonMinecount}</div>
            <div>
                {grid.map((singlerow, index1) => (
                    <Row key={index1}>
                        {singlerow.map((singlecol, index2) => (
                            <Cell isFlagMode={isFlagMode} details={singlecol} key={index2} updateFlag={updateFlag} revealcell={revealcell} />
                        ))}
                    </Row>
                ))}
            </div>
        </BoardContainer>
    );

}
export default Board;

