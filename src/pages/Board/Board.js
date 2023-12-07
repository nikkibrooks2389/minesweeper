import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag, faCog } from '@fortawesome/free-solid-svg-icons';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';


import { useTimer } from '../../hooks/useTimer';
import { useFreshBoard } from '../../hooks/useFreshBoard';
import { useGameEffects } from '../../hooks/useGameEffects';

import { initBoard } from '../../Util/initBoard';
import { revealed } from '../../Util/reveal';

import Cell from '../../components/Cell/Cell';
import {
    PannelButton, GamePage, BoardWrapper, Row, ResetBoard,
    GameStatus, TopPanel, ScoreBoard, TopPanelCenter, Grid, Emoji, GameWrapper
} from './StyledBoardComponents'; // Import styled components

import { selectGameSettings } from '../../redux/gameSettingsSlice';


const Board = ({ theme }) => {
    const [grid, setGrid] = useState([]);
    const [nonMinecount, setNonMinecount] = useState(0);
    const [mineLocation, setMineLocation] = useState([]);
    const [isFlagMode, setIsFlagMode] = useState(false);
    const [isFirstClick, setIsFirstClick] = useState(true);
    const [gameOver, setGameOver] = useState(false);
    const [minesLeft, setMinesLeft] = useState(0);
    const [gameWon, setGameWon] = useState(false);
    const [gameWrapperStyle, setGameWrapperStyle] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [username, setUsername] = useState('');

    // Redux and Navigation
    const navigate = useNavigate();
    const gameSettings = useSelector(selectGameSettings);
    const { rows, columns, mineCount } = gameSettings;



    // Refs
    const boardRef = useRef(null);

    // Custom hooks
    const { timer, startTimer, stopTimer, resetTimer } = useTimer();
    const freshBoard = useFreshBoard(gameSettings, setGrid, setIsFlagMode, setIsFirstClick, setNonMinecount, setGameOver, setMineLocation, setMinesLeft, resetTimer, setGameWon);
    useGameEffects({
        rows, columns, mineCount, gameSettings, boardRef,
        freshBoard, nonMinecount, setGameWon,
        stopTimer, setGameWrapperStyle
    });

    // Event handlers
    const onSettingsClick = () => {
        freshBoard();
        navigate('/settings');
    };


    const updateFlag = (x, y) => {

        let newGrid = JSON.parse(JSON.stringify(grid));
        if (newGrid[x][y].revealed) return;

        newGrid[x][y].flagged = !newGrid[x][y].flagged;
        setGrid(newGrid);

        // Count all flagged cells, regardless of whether they contain mines
        const flaggedCellsCount = newGrid.flat().reduce((count, cell) => {
            return count + (cell.flagged ? 1 : 0);
        }, 0);

        // Update minesLeft based on the number of flagged cells
        const remainingMines = mineCount - flaggedCellsCount;
        setMinesLeft(remainingMines);
    };

    const revealCell = (x, y) => {
        let newGrid = JSON.parse(JSON.stringify(grid));

        if (newGrid[x][y].flagged || newGrid[x][y].revealed || gameOver || gameWon) {
            return;
        }


        if (isFirstClick) {
            const { rows, columns, mineCount } = gameSettings;
            const newBoard = initBoard(rows, columns, mineCount, [x, y]);
            newGrid = newBoard.board;
            setMineLocation(newBoard.mineLocation);
            setIsFirstClick(false);
            startTimer();
        }

        // Reveal the clicked cell
        if (newGrid[x][y].value === "X") {
            // Reveal all mines if a mine is clicked
            for (let i = 0; i < mineLocation.length; i++) {
                newGrid[mineLocation[i][0]][mineLocation[i][1]].revealed = true;
            }
            setGameOver(true);
            stopTimer();
        } else {

            // Reveal adjacent cells if the clicked cell is not a mine
            let result = revealed(newGrid, x, y, nonMinecount);
            newGrid = result.arr;
            setNonMinecount(result.newNonMines);
        }

        setGrid(newGrid);

        // Check for win condition
        if (nonMinecount === rows * columns - mineCount) {
            setGameWon(true);
            stopTimer();
        }
    };

    const toggleFlagMode = () => {
        setIsFlagMode(!isFlagMode);
    };

    const handleRightClick = (e, x, y) => {

        if (window.innerWidth > parseInt(theme.breakpoints.sm, 10)) {
            e.preventDefault(); // Handle the right-click event here

            updateFlag(x, y);    // Pass only the coordinates to updateFlag
        }
    };

    const handleCloseModal = (resetGame) => {
        if (resetGame) {
            freshBoard();
            setIsModalOpen(false);
        } else {
            setIsModalOpen(false);
        }

    };

    useEffect(() => {
        if (gameOver || gameWon) {
            setIsModalOpen(true);
        }
    }, [gameOver, gameWon]);

    const submitScore = async () => {
        try {

            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/leaderboard`, {
                name: username,
                time: timer,
                level: gameSettings.difficulty // Assuming you have a difficulty setting in gameSettings
            });
            handleCloseModal(true); // Reset the game after submission
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <GameWrapper style={gameWrapperStyle}>
                <TopPanel >
                    <ScoreBoard> {minesLeft}</ScoreBoard>
                    <TopPanelCenter>
                        <PannelButton onClick={onSettingsClick}>
                            <FontAwesomeIcon icon={faCog} style={{ cursor: 'pointer' }} /></PannelButton>

                        <PannelButton onClick={toggleFlagMode} isFlagMode={isFlagMode}>
                            {isFlagMode ? (
                                <FontAwesomeIcon icon={faFlag} style={{ color: 'red' }} />
                            ) : (
                                <FontAwesomeIcon icon={faFlag} style={{ color: 'grey' }} />
                            )}
                        </PannelButton>
                        <ResetBoard onClick={() => freshBoard()}>   <Emoji>{gameOver ? '😢' : '😀'}</Emoji></ResetBoard>
                    </TopPanelCenter>
                    <ScoreBoard> {timer} </ScoreBoard>
                </TopPanel>
                <BoardWrapper>
                    <Grid ref={boardRef}>
                        {grid.map((singlerow, rowIndex) => (
                            <Row key={rowIndex}>
                                {singlerow.map((cell, colIndex) => (
                                    <Cell
                                        details={cell}
                                        key={colIndex}
                                        updateFlag={updateFlag}
                                        revealCell={revealCell}
                                        isFlagMode={isFlagMode}
                                        onContextMenu={(e) => handleRightClick(e, rowIndex, colIndex)}
                                        gameOver={gameOver}
                                    />
                                ))}
                            </Row>
                        ))}
                    </Grid>
                </BoardWrapper>
            </GameWrapper>
            <Dialog
                open={isModalOpen}
                onClose={handleCloseModal}
                aria-labelledby="game-end-modal"
                aria-describedby="game-end-message"
                sx={{
                    '& .MuiDialog-paper': {
                        backgroundColor: theme.background

                    }
                }}

            >
                <DialogTitle id="game-end-modal" style={{ color: theme.textColor, textAlign: 'center', fontFamily: '"Press Start 2P", cursive', }}>{"Game Over"}</DialogTitle>
                <DialogContent style={{ textAlign: 'center' }}>
                    <DialogContentText
                        id="game-end-message"
                        style={{
                            textAlign: 'center',
                            color: gameWon ? 'green' : 'red',

                            fontFamily: '"Press Start 2P", cursive',
                        }}
                    >
                        {gameWon ? "Congratulations, You Won!" : "Sorry, You Lost."}
                    </DialogContentText>
                    {gameWon && (
                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '10px',
                                marginTop: '20px',
                                fontFamily: '"Press Start 2P", cursive',
                            }}
                        />
                    )}
                </DialogContent>

                <DialogActions style={{ justifyContent: 'center' }}>
                    <Button
                        size="small"
                        onClick={() => handleCloseModal(false)}
                        variant="contained"
                        style={{ margin: '8px' }}
                    >
                        Close
                    </Button>
                    <Button
                        size="small"
                        onClick={gameWon ? submitScore : handleCloseModal} // Call submitScore when this button is clicked
                        variant="contained"
                        style={{ margin: '8px' }}
                    >
                        {gameWon ? "Submit Score" : "Play Again"}
                    </Button>

                </DialogActions>
            </Dialog>
        </>
    );
}

export default Board;