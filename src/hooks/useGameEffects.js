import { useEffect, useRef } from 'react';

export const useGameEffects = (dependencies) => {
    const {
        rows, columns, mineCount, gameSettings, boardRef,
        freshBoard, nonMinecount, setGameWon,
        stopTimer, setGameWrapperStyle
    } = dependencies;

    // Effect for initializing the board when game settings change
    useEffect(() => {
        freshBoard();

        return () => {
            stopTimer();
        };
    }, [gameSettings]);

    // Effect for checking win condition
    useEffect(() => {
        if ((rows * columns - mineCount) + nonMinecount === 0) {
            setGameWon(true);
            stopTimer();
        }
    }, [nonMinecount, rows, columns, mineCount]);

    // Effect for handling resize
    useEffect(() => {
        const handleResize = () => {
            if (boardRef && boardRef.current) {
                const isBoardWider = boardRef.current.offsetWidth > window.innerWidth;
                setGameWrapperStyle({
                    display: 'flex',
                    alignItems: isBoardWider ? 'unset' : 'center',
                    flexDirection: "column",
                });
            }
        };

        setTimeout(handleResize, 0);
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [boardRef, setGameWrapperStyle]);
};

export default useGameEffects;