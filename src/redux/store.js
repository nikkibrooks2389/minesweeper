// store.js

import { configureStore } from '@reduxjs/toolkit';
import gameSettingsReducer from './gameSettingsSlice';

const store = configureStore({
    reducer: {
        gameSettings: gameSettingsReducer,
        // Add other reducers for your game state as needed
    },
});

export default store;