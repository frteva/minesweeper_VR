export function initGrid(rows = 10, cols = 10, mineCount = 15) {
    const grid = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => ({
        isMine: false,
        revealed: false,
        showHint: false,
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

function initFlowMap(rows, cols) {
  // create an empty "flow map" matrix of the same size as the actual grid.
  const flowMap = [];
  for (let row = 0; row < rows; row++) {
    flowMap[row] = [];
    for (let col = 0; col < cols; col++) {
      // By default, there is no path found for the cells
      flowMap[row][col] = false;
    }
  }
  return flowMap;
}

export function flowFieldTo(row, col, rows, cols, grid) {
  const flowMap = initFlowMap(rows, cols);
  // The frontier will store the cells who needs to be visited
  const frontier = [];
  // At the beginning, only the destination is in the frontier
  frontier.push({row, col});
  flowMap[row][col] = {row, col};
  if (grid[row][col].adjacentMines != 0) {
    flowMap[row][col].showHint = true;
    return flowMap;
  }
  // While the frontier is not empty, we must continue to visit the cells inside it
  while (frontier.length > 0) {
    // Get the first cell in the frontier
    const cell = frontier.shift();
    // For each of the "walkables" neighbors (all "alives" neighbors)
    getWalkableNeighbors(cell, rows, cols, grid).forEach(next => {
      // Ignore allready visited cells
      if (flowMap[next.row][next.col] === false) {
        // Store the actual cell as the destination of the current neighbor
        flowMap[next.row][next.col] = cell;
        flowMap[cell.row][cell.col].showHint = true;
        if (grid[next.row][next.col].adjacentMines == 0) {
          frontier.push(next);
        }
      }
    });
  }
  // The destination is the final step. There is no destination from it.
  //flowMap[row][col] = false;
  return flowMap;
}


function getWalkableNeighbors({row, col}, rows, cols, grid) {
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
    neighbors = neighbors.filter(cell => isWalkable(cell, rows, cols, grid));
    return neighbors;
  }

  function isWalkable(cell, rows, cols, grid) {
    return isValidPos(cell, rows, cols) && !grid[cell.row][cell.col].revealed && !grid[cell.row][cell.col].showHint;
  }

  function isValidPos({row, col}, rows, cols) {
    return row >= 0 && row < rows
        && col >= 0 && col < cols;
  }
