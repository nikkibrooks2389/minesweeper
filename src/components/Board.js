import React, { useState, useEffect, useRef } from "react";
import { initBoard } from '../Util/initBoard';
import { revealed } from '../Util/reveal';
import Cell from './Cell';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { selectGameSettings } from '../redux/gameSettingsSlice';

const FlagButton = styled.button`
  background-color:${(props) => props.theme.cellBackgroundRevealed};
  color: black;
  padding: 8px 10px ;
  font-size: 1rem;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  user-select: none;
`;

const BoardContainer = styled.div`
    background-color: ${(props) => props.theme.background};  
`;

const BoardWrapper = styled.div`    
    color: white;
    text-align: center;
    font-size: 35px;
    width: fit-content;
    padding: 20px;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: fit-content;
  color: white;
`;

const ResetBoard = styled.button`
    background-color:${(props) => props.theme.cellBackgroundRevealed};
    color: black;
    padding: 3px ;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
  
`;


const GameOver = styled.div`
   color: red;
   font-size: 50px;
`;


const TopPanel = styled.div`
    width: 100vw; // Set width to 100% of the viewport width
    box-sizing: border-box; // Include padding and border in the element's total width
    border-top: 2px solid #ffffff;
    border-left: 2px solid #ffffff;
    border-bottom: 2px solid #7b7b7b;
    border-right: 2px solid #7b7b7b;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 5px;
`;

const ScoreBoard = styled.div`
    background-color: #000000;
    color: #ff0000;
    width: 2rem;
    border: 3px solid #777777;    
    padding: 5px 10px;
    font-size: 1rem;
    border-radius: 5px;
    text-align: center;
    box-shadow: inset 0 0 5px #333333;
    // font-family: 'VT323', monospace;
    font-family: "Press Start 2P", cursive;
    font-weight: bold;

`;

const TopPanelCenter = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    padding: 0 20px;
`;

const Grid = styled.div`
    width: fit-content;
`;


const Emoji = styled.span`
    background-color:${(props) => props.theme.cellBackgroundRevealed};
    font-size: 1.3rem; 
`;

function Board({ theme }) {
    const [grid, setGrid] = useState([]);
    const [nonMinecount, setNonMinecount] = useState(0);
    const [mineLocation, setMineLocation] = useState([]);
    const [isFlagMode, setIsFlagMode] = useState(false);
    const [isFirstClick, setIsFirstClick] = useState(true);
    const [gameOver, setGameOver] = useState(false);
    const [minesLeft, setMinesLeft] = useState(0);
    const [timer, setTimer] = useState(0);
    const [gameWon, setGameWon] = useState(false);
    const [topPanelStyle, setTopPanelStyle] = useState({});
    const [boardContainerStyle, setBoardContainerStyle] = useState({});

    const dispatch = useDispatch();
    const gameSettings = useSelector(selectGameSettings);

    const timerRef = useRef(null);
    const boardRef = useRef(null);

    const { rows, columns, mineCount } = gameSettings;

    const freshBoard = () => {
        // Use gameSettings to get rows, columns, and mineCount

        const newBoard = initBoard(rows, columns, mineCount, null);
        setGrid(newBoard.board);
        setIsFlagMode(false);
        setIsFirstClick(true);
        setNonMinecount(0);
        setGameOver(false);
        setMineLocation([]);
        setMinesLeft(mineCount); // Initialize minesLeft
        stopTimer(); // Stop timer
        setTimer(0); // Reset timer
        setGameWon(false); // Reset gameWon
    }

    useEffect(() => {
        freshBoard();

        return () => {
            clearInterval(timerRef.current);
        };
    }, [gameSettings]);

    useEffect(() => {
        if ((rows * columns - mineCount) + nonMinecount === 0) {
            setGameWon(true);
            stopTimer();
        }
    }, [grid, nonMinecount, rows, columns, mineCount]);

    useEffect(() => {
        const handleResize = () => {
            // Ensure the DOM is fully loaded
            if (boardRef.current) {
                const isBoardWider = boardRef.current.offsetWidth > window.innerWidth;
                const isMoble = window.innerWidth < parseInt(theme.breakpoints.sm, 10);;
                console.log(isMoble)


                setTopPanelStyle({
                    padding: '1rem',
                    width: isBoardWider || isMoble ? '100vw' : boardRef.current.offsetWidth + 'px',
                    position: isBoardWider || isMoble ? 'fixed' : 'initial',
                    top: isBoardWider || isMoble ? '0' : 'initial',
                });

                setBoardContainerStyle({
                    display: 'flex',
                    justifyContent: isBoardWider ? 'unset' : 'center',
                    alignItems: isBoardWider ? 'unset' : 'center',
                    marginTop: isBoardWider ? '5rem' : 'initial',
                    flexDirection: "column",
                    height: isBoardWider ? `calc(100vh - 100px)` : '100vh',
                });
            }
        };

        // Call once when the component mounts
        // Using setTimeout to ensure this runs after the DOM is fully painted
        setTimeout(handleResize, 0);

        // Set up event listener for resize events
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    const startTimer = () => {
        clearInterval(timerRef.current);
        setTimer(0); // Reset timer
        timerRef.current = setInterval(() => {
            setTimer((prevTimer) => prevTimer + 1);
        }, 1000);
    };

    const stopTimer = () => {
        clearInterval(timerRef.current);
    };


    const updateFlag = (e, x, y) => {
        e.preventDefault();
        let newGrid = JSON.parse(JSON.stringify(grid));
        newGrid[x][y].flagged = !newGrid[x][y].flagged;
        setGrid(newGrid);

        const flaggedMines = mineLocation.filter(
            ([mineX, mineY]) => newGrid[mineX][mineY].flagged
        ).length;
        const remainingMines = mineCount - flaggedMines;
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

        if (newGrid[x][y].value === "X") {
            for (let i = 0; i < mineLocation.length; i++) {
                newGrid[mineLocation[i][0]][mineLocation[i][1]].revealed = true;
            }
            setGrid(newGrid);
            setGameOver(true);
            stopTimer();
        }

        let revealedBoard = revealed(newGrid, x, y, nonMinecount);
        setGrid(revealedBoard.arr);
        setNonMinecount(revealedBoard.newNonMines);

    };

    const toggleFlagMode = () => {
        setIsFlagMode(!isFlagMode);
    };

    return (
        <BoardContainer style={boardContainerStyle}>
            <TopPanel style={topPanelStyle}>
                <ScoreBoard> {minesLeft}</ScoreBoard>
                <TopPanelCenter>
                    <FlagButton onClick={toggleFlagMode} isFlagMode={isFlagMode}>
                        {isFlagMode ? (
                            <FontAwesomeIcon icon={faFlag} style={{ color: 'red' }} />
                        ) : (
                            <FontAwesomeIcon icon={faFlag} style={{ color: 'grey' }} />
                        )}
                    </FlagButton>
                    <ResetBoard onClick={() => freshBoard()}>   <Emoji>{gameOver ? '😢' : '😀'}</Emoji></ResetBoard>
                </TopPanelCenter>
                <ScoreBoard> {timer} </ScoreBoard>
            </TopPanel>
            <BoardWrapper>



                {gameOver && <GameOver>GAME OVER</GameOver>}
                {gameWon && <GameOver>YOU WIN!</GameOver>} {/* Display win message */}

                <Grid ref={boardRef}>
                    {grid.map((singlerow, index1) => (
                        <Row key={index1}>
                            {singlerow.map((singlecol, index2) => (
                                <Cell
                                    isFlagMode={isFlagMode}
                                    details={singlecol}
                                    key={index2}
                                    updateFlag={updateFlag}
                                    revealCell={revealCell}
                                />
                            ))}
                        </Row>
                    ))}
                </Grid>
            </BoardWrapper>
        </BoardContainer>
    );
}

export default Board;