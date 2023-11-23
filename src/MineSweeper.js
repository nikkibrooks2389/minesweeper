import React, { useState } from 'react';
import { initializeGrid } from './gamelogic'; // Adjust the path as needed
import Grid from './Grid'; // Adjust the path as needed
const Minesweeper = () => {
    const [grid, setGrid] = useState(initializeGrid(10, 10)); // Example size and mine count
    console.log(grid)
    // Add rendering logic and event handlers here

    return (
        <div>
            <Grid gridData={grid} />
        </div>
    );
};

export default Minesweeper;