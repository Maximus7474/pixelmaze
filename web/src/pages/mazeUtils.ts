export interface Cell {
    row: number;
    col: number;
    visited: boolean;
    walls: {
      top: boolean;
      right: boolean;
      bottom: boolean;
      left: boolean;
    };
  }
  
  export const generateMaze = (rows: number, cols: number): Cell[][] => {
    const grid: Cell[][] = [];
  
    // Initialize the grid
    for (let r = 0; r < rows; r++) {
      const row: Cell[] = [];
      for (let c = 0; c < cols; c++) {
        row.push({
          row: r,
          col: c,
          visited: false,
          walls: { top: true, right: true, bottom: true, left: true },
        });
      }
      grid.push(row);
    }
  
    // Maze generation using DFS
    const stack: Cell[] = [];
    const directions = [
      { row: -1, col: 0, wall: 'top', oppositeWall: 'bottom' }, // Up
      { row: 1, col: 0, wall: 'bottom', oppositeWall: 'top' }, // Down
      { row: 0, col: -1, wall: 'left', oppositeWall: 'right' }, // Left
      { row: 0, col: 1, wall: 'right', oppositeWall: 'left' }, // Right
    ];
  
    const shuffleArray = <T>(array: T[]): T[] => array.sort(() => Math.random() - 0.5);
  
    const isValidNeighbor = (r: number, c: number) => {
      return r >= 0 && r < rows && c >= 0 && c < cols && !grid[r][c].visited;
    };
  
    const visitCell = (row: number, col: number) => {
      grid[row][col].visited = true;
      const neighbors = shuffleArray(directions.filter(dir => isValidNeighbor(row + dir.row, col + dir.col)));
  
      for (const { row: rDelta, col: cDelta, wall, oppositeWall } of neighbors) {
        const newRow = row + rDelta;
        const newCol = col + cDelta;
        if (isValidNeighbor(newRow, newCol)) {
            grid[row][col].walls[wall as keyof typeof grid[0][0].walls] = false;
            grid[newRow][newCol].walls[oppositeWall as keyof typeof grid[0][0].walls] = false;
          stack.push(grid[newRow][newCol]);
          visitCell(newRow, newCol);
        }
      }
    };
  
    visitCell(0, 0); // Start maze generation from (0,0)
  
    return grid;
  };
  