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
                const response = await axios.get('http://localhost:3000/api/scores');
                dispatch(setLeaderBoard(response.data));
            } catch (error) {
                console.error('Error fetching scores:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchScores();
    }, [dispatch]);

    return isLoading;
};

export default useFetchScores;