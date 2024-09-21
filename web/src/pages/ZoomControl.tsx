import React from 'react';

interface ZoomControlProps {
  zoomIn: () => void;
  zoomOut: () => void;
}

const ZoomControl: React.FC<ZoomControlProps> = ({ zoomIn, zoomOut }) => {
  return (
    <div>
      <button onClick={zoomIn}>Zoom In</button>
      <button onClick={zoomOut}>Zoom Out</button>
    </div>
  );
};

export default ZoomControl;
