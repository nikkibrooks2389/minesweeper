import React, { useState, useEffect } from "react";
import { initBoard } from '../Util/initBoard';
import { revealed } from '../Util/reveal';
import Cell from './Cell';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { selectGameSettings } from '../redux/gameSettingsSlice';

const FlagButton = styled.button`
  background-color: ${props => props.isFlagMode ? '#e0e0e0' : '#f0f0f0'};
  color: black;
  border: 2px solid #d0d0d0;
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: ${props => props.isFlagMode ? 'inset 1px 1px 2px rgba(0, 0, 0, 0.3)' : '3px 3px 5px rgba(0, 0, 0, 0.2)'};
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  user-select: none;
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

const ResetBoard = styled.button`
    background-color: #f0f0f0;
    color: black;
    border: 2px solid #d0d0d0;
    padding: 10px 20px;
    border-radius: 5px;
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.2);
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    user-select: none;
`;

function Board() {
    const [grid, setGrid] = useState([]);
    const [nonMinecount, setNonMinecount] = useState(0);
    const [mineLocation, setMineLocation] = useState([]);
    const [isFlagMode, setIsFlagMode] = useState(false);
    const [isFirstClick, setIsFirstClick] = useState(true);

    const dispatch = useDispatch();
    const gameSettings = useSelector(selectGameSettings);
    console.log("GAME SETTINGS", gameSettings)
    const freshBoard = () => {
        // Use gameSettings to get rows, columns, and mineCount
        const { rows, columns, mineCount } = gameSettings;

        const newBoard = initBoard(rows, columns, mineCount, null);
        setGrid(newBoard.board);
        setIsFlagMode(false);
        setIsFirstClick(true);
        setNonMinecount(0);
        setMineLocation([]);
    }

    useEffect(() => {
        freshBoard();
    }, [gameSettings]); // Add gameSettings as a dependency for useEffect

    const updateFlag = (e, x, y) => {
        e.preventDefault();
        let newGrid = JSON.parse(JSON.stringify(grid));
        newGrid[x][y].flagged = !newGrid[x][y].flagged;
        setGrid(newGrid);
    }

    const revealCell = (x, y) => {
        let newGrid = JSON.parse(JSON.stringify(grid));

        if (newGrid[x][y].flagged || newGrid[x][y].revealed) return;

        if (isFirstClick) {
            // Use gameSettings to get rows, columns, and mineCount
            const { rows, columns, mineCount } = gameSettings;
            const newBoard = initBoard(rows, columns, mineCount, [x, y]);
            newGrid = newBoard.board;
            setMineLocation(newBoard.mineLocation);
            setIsFirstClick(false);
        }

        if (newGrid[x][y].value === "X") {
            for (let i = 0; i < mineLocation.length; i++) {
                newGrid[mineLocation[i][0]][mineLocation[i][1]].revealed = true;
            }
            setGrid(newGrid);
            alert("Game Over");
            return;
        }

        let revealedBoard = revealed(newGrid, x, y, nonMinecount);
        setGrid(revealedBoard.arr);
        setNonMinecount(revealedBoard.newNonMines);
    }
    const toggleFlagMode = () => {
        setIsFlagMode(!isFlagMode);
    };

    return (
        <BoardContainer>
            <FlagButton onClick={toggleFlagMode} isFlagMode={isFlagMode}>
                {isFlagMode ? <FontAwesomeIcon icon={faFlag} style={{ color: 'red' }} /> : <FontAwesomeIcon icon={faFlag} style={{ color: 'grey' }} />}
            </FlagButton>
            <ResetBoard onClick={() => freshBoard()}>ResetBoard</ResetBoard>
            <div>Non-Mines: {nonMinecount}</div>
            <div>
                {grid.map((singlerow, index1) => (
                    <Row key={index1}>
                        {singlerow.map((singlecol, index2) => (
                            <Cell isFlagMode={isFlagMode} details={singlecol} key={index2} updateFlag={updateFlag} revealCell={revealCell} />
                        ))}
                    </Row>
                ))}
            </div>
        </BoardContainer>
    );
}

export default Board;