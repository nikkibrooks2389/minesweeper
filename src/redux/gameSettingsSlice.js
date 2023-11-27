import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    difficulty: 'beginner',
    theme: 'light',
    gridSize: 'medium',
    rows: 9, // Default number of rows for beginner difficulty
    columns: 9, // Default number of columns for beginner difficulty
    mineCount: 10, // Default mine count for beginner difficulty
};

const gameSettingsSlice = createSlice({
    name: 'gameSettings',
    initialState,
    reducers: {
        setDifficulty: (state, action) => {
            state.difficulty = action.payload;

            // Update rows, columns, and mineCount based on difficulty
            switch (action.payload) {
                case 'beginner':
                    state.rows = 9;
                    state.columns = 9;
                    state.mineCount = 10;
                    break;
                case 'normal':
                    state.rows = 16;
                    state.columns = 16;
                    state.mineCount = 40;
                    break;
                case 'hard':
                    state.rows = 16;
                    state.columns = 30;
                    state.mineCount = 99;
                    break;
                // Add more cases for other difficulties as needed
                default:
                    state.rows = 9; // Default rows for unknown difficulties
                    state.columns = 9; // Default columns for unknown difficulties
                    state.mineCount = 10; // Default mine count for unknown difficulties
            }
        },
        setTheme: (state, action) => {
            state.theme = action.payload;
        },
        setGridSize: (state, action) => {
            state.gridSize = action.payload;
        },
    },
});

export const { setDifficulty, setTheme, setGridSize } = gameSettingsSlice.actions;

export const selectGameSettings = (state) => state.gameSettings;

export default gameSettingsSlice.reducer;