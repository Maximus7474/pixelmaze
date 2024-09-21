import React from 'react';
import Cell, { CellType } from './Cell';

interface MazeGridProps {
  grid: CellType[][];
  zoomLevel: number;
}

const MazeGrid: React.FC<MazeGridProps> = ({ grid, zoomLevel }) => {
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
      {grid.flatMap(row =>
        row.map(cell => <Cell key={`${cell.row}-${cell.col}`} cell={cell} />)
      )}
    </div>
  );
};

export default MazeGrid;
