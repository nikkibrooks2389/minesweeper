const initializeGrid = (size, mineCount) => {
    let grid = Array(size).fill().map(() => Array(size).fill({
        revealed: false,
        flagged: false,
        mine: false,
        adjacentMines: 0,
    }));

    let positions = [];
    for (let i = 0; i < size * size; i++) {
        positions.push(i);
    }

    // Shuffle and pick first mineCount positions for mines
    positions.sort(() => Math.random() - 0.5);
    positions.slice(0, mineCount).forEach(pos => {
        let row = Math.floor(pos / size);
        let col = pos % size;
        grid[row][col].mine = true;

        // Increment adjacent mines count
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                let newRow = row + i;
                let newCol = col + j;
                if (newRow >= 0 && newRow < size && newCol >= 0 && newCol < size) {
                    grid[newRow][newCol].adjacentMines += 1;
                }
            }
        }
    });

    // Reset the mine cells' adjacentMines count to 0
    positions.slice(0, mineCount).forEach(pos => {
        let row = Math.floor(pos / size);
        let col = pos % size;
        grid[row][col].adjacentMines = 0;
    });

    return grid;
};

export { initializeGrid };