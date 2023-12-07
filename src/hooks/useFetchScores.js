// useFetchScores.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setLeaderBoard } from '../redux/leaderBoardSlice';

const useFetchScores = () => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchScores = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/leaderboard`);
                dispatch(setLeaderBoard(response.data));
            } catch (error) {
                console.error('Error fetching leaderboard:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchScores();
    }, [dispatch]);

    return isLoading;
};

export default useFetchScores;