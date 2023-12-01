import { initBoard } from '../Util/initBoard'; // Assuming initBoard is a function in a separate file

export const useFreshBoard = (gameSettings, setGrid, setIsFlagMode, setIsFirstClick, setNonMinecount, setGameOver, setMineLocation, setMinesLeft, resetTimer, setGameWon) => {
    const { rows, columns, mineCount } = gameSettings;

    return () => {
        const newBoard = initBoard(rows, columns, mineCount, null);
        setGrid(newBoard.board);
        setIsFlagMode(false);
        setIsFirstClick(true);
        setNonMinecount(0);
        setGameOver(false);
        setMineLocation([]);
        setMinesLeft(mineCount);
        resetTimer();
        setGameWon(false);
    };
};