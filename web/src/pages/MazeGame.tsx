import React, { useState, useEffect, useCallback } from 'react';
import MazeGrid from './MazeGrid';
import { generateMaze } from './mazeUtils';
import { CellType } from './Cell';

interface MazeGameProps {
    zoomLevel: number;
}
  
const rows = 15;
const cols = 15;

const MazeGame: React.FC<MazeGameProps> = ({ zoomLevel }) => {
    const [grid, setGrid] = useState<CellType[][]>([[]]);
    const [playerPosition, setPlayerPosition] = useState<{ row: number; col: number }>({ row: 0, col: 0 });
    const startCell = { row: 0, col: 0 };
    const endCell = { row: rows - 1, col: cols - 1 };

    useEffect(() => {
        const newGrid = generateMaze(rows, cols);
        setGrid(newGrid);
    }, []);

    const handleKeyDown = (event: KeyboardEvent) => {
      const { row, col } = playerPosition;
  
      switch (event.key) {
        case 'ArrowUp':
          if (!grid[row - 1] || !grid[row][col].walls.top) {
            setPlayerPosition({ row: row - 1 < 0 ? 0 : row - 1, col });
          }
          break;
        case 'ArrowDown':
          if (!grid[row + 1] || !grid[row][col].walls.bottom) {
            setPlayerPosition({ row: row + 1 >= rows ? rows - 1 : row + 1, col });
          }
          break;
        case 'ArrowLeft':
          if (!grid[row][col - 1] || !grid[row][col].walls.left) {
            setPlayerPosition({ row, col: col - 1 < 0 ? 0 : col - 1 });
          }
          break;
        case 'ArrowRight':
          if (!grid[row][col + 1] || !grid[row][col].walls.right) {
            setPlayerPosition({ row, col: col + 1 >= cols ? cols - 1 : col + 1 });
          }
          break;
        default:
          break;
      }
    };
  
    useEffect(() => {
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }, [playerPosition]);

    return (
        <MazeGrid grid={grid} zoomLevel={zoomLevel} playerPosition={playerPosition} startCell={startCell} endCell={endCell} />
    );
};

export default MazeGame;
