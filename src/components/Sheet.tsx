import { useEffect, useRef, useState } from 'react';
import { calculateRowsAndCloumnsToDisplay, resizeCanvas } from '../utils/utils';

// constants for cell width and cell height
const cellWidth = 100;
const cellHeight = 22;

const Sheet = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // state for canvas height and width
  const [canvasWidth, setCanvasWidth] = useState<number>(window.innerWidth);
  const [canvasHeight, setCanvasHeight] = useState<number>(window.innerHeight);

  // calculate number of columns, start point and end point for each column
  const {
    visible: visibleColumns,
    start: columnStart,
    end: columnEnd,
  } = calculateRowsAndCloumnsToDisplay(cellWidth, canvasWidth);
  const {
    visible: visibleRows,
    start: rowStart,
    end: rowEnd,
  } = calculateRowsAndCloumnsToDisplay(cellHeight, canvasHeight);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (canvas) {
      resizeCanvas(canvas);
    }

    if (context) {
      context.fillStyle = 'white';
      context?.fillRect(0, 0, context.canvas.width, context.canvas.height);

      // Draw row lines
      let startY = 0; // Make sure startY is initialized
      for (let i = 0; i < visibleRows.length; i++) {
        context.beginPath();
        context.moveTo(0, startY); // x, y
        context.lineTo(context.canvas.width, startY); // x, y
        context.stroke();

        startY += cellHeight;
      }

      // Draw column lines
      let startX = 0; // Initialize startX
      for (let i = 0; i < visibleColumns.length; i++) {
        context.beginPath();
        context.moveTo(startX, 0); // x, y
        context.lineTo(startX, context.canvas.height); // x, y
        context.stroke();

        startX += cellWidth;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='w-screen h-screen'>
      <canvas ref={canvasRef} height={canvasHeight} width={canvasWidth} />
    </div>
  );
};
export default Sheet;
