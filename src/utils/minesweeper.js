export function initGrid(rows = 10, cols = 10, mineCount = 15) {
    const grid = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => ({
        isMine: false,
        revealed: false,
        adjacentMines: 0,
      }))
    );
  
    // 🌋 Placer les mines
    let minesPlaced = 0;
    while (minesPlaced < mineCount) {
      const x = Math.floor(Math.random() * rows);
      const y = Math.floor(Math.random() * cols);
      if (!grid[x][y].isMine) {
        grid[x][y].isMine = true;
        minesPlaced++;
      }
    }
  
    // 🔍 Calcul des nombres voisins
    for (let x = 0; x < rows; x++) {
      for (let y = 0; y < cols; y++) {
        if (!grid[x][y].isMine) {
          let count = 0;
          for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
              const nx = x + dx;
              const ny = y + dy;
              if (nx >= 0 && ny >= 0 && nx < rows && ny < cols && grid[nx][ny].isMine) {
                count++;
              }
            }
          }
          grid[x][y].adjacentMines = count;
        }
      }
    }
  
    return grid;
}

export function propagation(x,y) {
    const allZeroMine = [];
    if (grid[x][y].adjacentMines != 0) return allZeroMine;

    for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
            const nx = x + dx;
            const ny = y + dy;
            if (nx >= 0 && ny >= 0 && nx < rows && ny < cols && !grid[nx][ny].revealed) {
                //revealCell(nx, ny);
                allZeroMine.push({x: nx, y: ny});
            }
        }
    }
    
}

flowFieldTo(row, col) {
    // The frontier will store the cells who needs to be visited
    const frontier = [];
    const visited = [];
    // At the beginning, only the destination is in the frontier
    frontier.push({row, col});
    // While the frontier is not empty, we must continue to visit the cells inside it
    while (frontier.length > 0) {
      // Get the first cell in the frontier
      const cell = frontier.shift();
      // For each of the "walkables" neighbors (all "alives" neighbors)
      this.getWalkableNeighbors(cell).forEach(next => {
        //  the current neighbor need to be visited. So we put it in the frontier.
        frontier.push(next);
        // mark mine as revealed
      });
    }
    // The destination is the final step. There is no destination from it.
    this.flowMap[row][col] = false;
  }

  getWalkableNeighbors({row, col}) {
    // Von Neumann neighborhood (without itself)
    let neighbors = [
      {row: row + 1, col},
      {row: row - 1, col},
      {row, col: col + 1},
      {row, col: col - 1}
    ];
    // add diag for Moore neighborhood
    let diagNeighbors = [
      {row: row + 1, col: col - 1},
      {row: row + 1, col: col + 1},
      {row: row - 1, col: col + 1},
      {row: row - 1, col: col - 1}
    ];
    neighbors = neighbors.concat(diagNeighbors);
    neighbors = neighbors.filter(cell => this.isWalkable(cell));
    return neighbors;
  }

  function isWalkable(cell, grid) {
    return isValidPos(cell) && grid[cell.row][cell.col].adjacentMines === 0 && !grid[cell.row][cell.col].revealad;
  }

  function isValidPos({row, col}) {
    return row >= 0 && row < rows
        && col >= 0 && col < cols;
  }
  