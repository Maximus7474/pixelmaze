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

    useEffect(() => {
        const newGrid = generateMaze(rows, cols);
        setGrid(newGrid);
    }, []);

    return (
        <MazeGrid grid={grid} zoomLevel={zoomLevel} />
    );
};

export default MazeGame;
