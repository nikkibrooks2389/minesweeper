import { useState, useRef, useEffect, useCallback } from 'react';

export const useTimer = () => {
    const [timer, setTimer] = useState(0);
    const timerRef = useRef(null);

    const startTimer = useCallback(() => {
        clearInterval(timerRef.current);
        setTimer(0);
        timerRef.current = setInterval(() => {
            setTimer((prevTimer) => prevTimer + 1);
        }, 1000);
    }, []);

    const stopTimer = useCallback(() => {
        clearInterval(timerRef.current);
    }, []);

    const resetTimer = useCallback(() => {
        clearInterval(timerRef.current);
        setTimer(0);
    }, []);

    useEffect(() => {
        return () => clearInterval(timerRef.current);
    }, []);

    return { timer, startTimer, stopTimer, resetTimer };
};