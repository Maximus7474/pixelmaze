import React from 'react';

interface Walls {
  top: boolean;
  right: boolean;
  bottom: boolean;
  left: boolean;
}

export interface CellType {
  row: number;
  col: number;
  visited: boolean;
  walls: Walls;
}

interface CellProps {
  cell: CellType;
  backgroundColor?: string;
}

const Cell: React.FC<CellProps> = ({ cell, backgroundColor }) => {
  return (
    <div
      style={{
        width: '20px',
        height: '20px',
        borderTop: cell.walls.top ? '2px solid black' : '',
        borderRight: cell.walls.right ? '2px solid black' : '',
        borderBottom: cell.walls.bottom ? '2px solid black' : '',
        borderLeft: cell.walls.left ? '2px solid black' : '',
        boxSizing: 'border-box',
        backgroundColor: backgroundColor,
      }}
    />
  );
};

export default Cell;
