import React from 'react';
import Cell, { CellType } from './Cell';

interface MazeGridProps {
  grid: CellType[][];
  zoomLevel: number;
  playerPosition: { row: number; col: number };
  startCell: { row: number; col: number };
  endCell: { row: number; col: number };
}

const MazeGrid: React.FC<MazeGridProps> = ({ grid, zoomLevel, playerPosition, startCell, endCell }) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${grid[0].length}, 20px)`,
        transform: `scale(${zoomLevel})`,
        transformOrigin: 'center',
        transition: 'transform 0.2s ease-out',
      }}
    >
      {grid.flatMap((row, rIndex) =>
        row.map((cell, cIndex) => {
          let backgroundColor = '';
          if (rIndex === startCell.row && cIndex === startCell.col)  {
            backgroundColor = 'green';
          } else if (rIndex === endCell.row && cIndex === endCell.col) {
            backgroundColor = 'red';
          }

          return (
            <Cell key={`${cell.row}-${cell.col}`} cell={cell} backgroundColor={backgroundColor} />
          );
        })
      )}
    </div>
  );
};

export default MazeGrid;
