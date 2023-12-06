// store.js

import { configureStore } from '@reduxjs/toolkit';
import gameSettingsReducer from './gameSettingsSlice';
import leaderBoardReducer from './leaderBoardSlice';

const store = configureStore({
    reducer: {
        gameSettings: gameSettingsReducer,
        leaderBoard: leaderBoardReducer,
        // Add other reducers for your game state as needed
    },
});

export default store;