import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    leaderBoard: { beginner: [], normal: [], hard: [] },
    error: null,
};

const leaderBoardSlice = createSlice({
    name: 'leaderBoard',
    initialState,
    reducers: {
        setLeaderBoard(state, action) {
            // Initialize an object to hold leaderBoard organized by level
            const organizedLeaderBoard = { beginner: [], normal: [], hard: [] };

            // Iterate over each score in the action payload
            action.payload.forEach(leaderboard => {

                // Push the relevant leaderboard data to the array for this level
                organizedLeaderBoard[leaderboard.level].push({
                    name: leaderboard.name,
                    time: leaderboard.time
                });
            });

            // Set the state's scores to the organized scores
            state.leaderBoard = organizedLeaderBoard;
        },
        setError(state, action) {
            state.error = action.payload;
        },
    },
});

export const { setLeaderBoard, setError } = leaderBoardSlice.actions;
export const leaderBoard = (state) => state.leaderBoard.leaderBoard;


export default leaderBoardSlice.reducer;