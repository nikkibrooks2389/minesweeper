// LeaderBoard.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { leaderBoard } from '../../redux/leaderBoardSlice';
import { setLeaderBoard } from '../../redux/leaderBoardSlice';
import { useDispatch, useSelector } from 'react-redux';
const LeaderBoardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;

`;

const LevelSection = styled.div`
  flex: 1;
  min-width: 250px;
  max-height: 450px;
  background-color: #f2f2f2;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  overflow: auto;
background-color: ${(props) => props.theme.background};
  @media (max-width: 768px) {
    flex-basis: 100%;
  }
`;

const ScoreList = styled.ul`
  list-style: none;
  padding: 0 2.5rem;
  overflow-y: auto;
`;

const ScoreItem = styled.li`

  padding: 8px 0;
    display: flex;
    justify-content: space-between;
`;

const LevelTitle = styled.h2`
  color: ${(props) => props.theme.textColor};
  font-size: 1.2rem;
  margin-bottom: 15px;
`;


const LeaderBoard = () => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const leaderBoardData = useSelector(leaderBoard);

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

    const sortAndSliceScores = (scores) => {
        // Create a copy of the array before sorting
        return [...scores].sort((a, b) => a.time - b.time).slice(0, 10);
    };

    return (
        <div>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <LeaderBoardContainer>
                    {Object.entries(leaderBoardData).map(([level, scores]) => (
                        <LevelSection key={level}>
                            <LevelTitle>{level.charAt(0).toUpperCase() + level.slice(1)}</LevelTitle>
                            {scores.length > 0 ? (
                                <ScoreList>
                                    {sortAndSliceScores(scores).map((score, index) => (
                                        <ScoreItem key={index}>
                                            <span>{index + 1}. {score.name}</span> <span>{score.time}</span>
                                        </ScoreItem>
                                    ))}
                                </ScoreList>
                            ) : (
                                <p>No results available for this level.</p>
                            )}
                        </LevelSection>
                    ))}
                </LeaderBoardContainer>
            )}
        </div>
    );
};

export default LeaderBoard;