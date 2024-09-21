import { useRef, useState } from 'react';
import { calculateRowsAndCloumnsToDisplay } from '../utils/utils';

// constants for cell width and cell height
const cellWidth = 100;
const cellHeight = 22;

const Sheet = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // state for canvas height and width
  const [canvasWidth, setCanvasWidth] = useState<number>(window.innerWidth);
  const [canvasHeight, setCanvasHeight] = useState<number>(window.innerHeight);

  return (
    <div className='w-screen h-screen'>
      <canvas ref={canvasRef} height={canvasHeight} width={canvasWidth} />
    </div>
  );
};
export default Sheet;
