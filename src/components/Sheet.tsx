import { useEffect, useRef, useState } from 'react';
import {
  calculateRowsAndCloumnsToDisplay,
  resizeCanvas,
  getEncodedCharacter,
} from '../utils/utils';

// constants for cell width and cell height
const cellWidth = 100;
const cellHeight = 22;

// constants for row header width and column header height
const rowHeaderWidth = 50;
const columnHeaderHeight = 22;

// constant for color
const headerColor = '#f8f9fa';
const headerTextColor = '#666666';
const gridLineColor = '#e2e3e3';

const Sheet = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // state for canvas height and width
  const [canvasWidth, setCanvasWidth] = useState<number>(window.innerWidth);
  const [canvasHeight, setCanvasHeight] = useState<number>(window.innerHeight);

  // calculate number of columns, start point and end point for each column
  const { visible: visibleColumns } = calculateRowsAndCloumnsToDisplay(
    cellWidth,
    canvasWidth
  );
  const { visible: visibleRows } = calculateRowsAndCloumnsToDisplay(
    cellHeight,
    canvasHeight
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (canvas) {
      resizeCanvas(canvas);
    }

    if (context) {
      context.fillStyle = '#fff';
      context.fillRect(0, 0, context.canvas.width, context.canvas.height); // set the canvas color
      context.fillStyle = headerColor; // setup the header color
      context.font = '13px sans-serif';

      context.fillRect(0, 0, rowHeaderWidth, context.canvas.height); // set the row header color
      context.fillRect(0, 0, context.canvas.width, columnHeaderHeight); // set the column header color
      context.strokeStyle = gridLineColor;

      // Draw row header
      let startY = columnHeaderHeight; // Make sure startY is initialized
      for (let i = 0; i < visibleRows.length; i++) {
        context.beginPath();
        context.moveTo(0, startY); // x, y
        context.lineTo(rowHeaderWidth, startY); // x, y
        context.stroke();
        startY += cellHeight;
      }

      // column header settings
      context.fillStyle = headerTextColor;
      context.textAlign = 'center';
      context.textBaseline = 'middle';

      // Write row header text
      startY = columnHeaderHeight; // Initialize startY
      for (let i = 0; i < visibleRows.length; i++) {
        const centerY = startY + cellHeight * 0.5;
        const centerX = rowHeaderWidth * 0.5;
        const content = String(visibleRows[i] + 1);
        context.fillText(content, centerX, centerY);
        startY += cellHeight;
      }

      // Draw row lines
      startY = columnHeaderHeight; // Make sure startY is initialized
      for (let i = 0; i < visibleRows.length; i++) {
        context.beginPath();
        context.moveTo(rowHeaderWidth, startY); // x, y
        context.lineTo(context.canvas.width, startY); // x, y
        context.stroke();
        startY += cellHeight;
      }

      // Draw column header
      let startX = rowHeaderWidth; // Initialize startX
      for (let i = 0; i < visibleColumns.length; i++) {
        context.beginPath();
        context.moveTo(startX, 0); // x, y
        context.lineTo(startX, columnHeaderHeight); // x, y
        context.stroke();
        startX += cellWidth;
      }

      // Write column header text
      startX = rowHeaderWidth; // Initialize startX
      for (let i = 0; i < visibleColumns.length; i++) {
        const centerX = startX + cellWidth * 0.5;
        const centerY = columnHeaderHeight * 0.5;
        const content = getEncodedCharacter(visibleColumns[i] + 1);
        context.fillText(content, centerX, centerY);
        startX += cellWidth;
      }

      // Draw column header text
      startX = rowHeaderWidth; // Initialize startX
      for (let i = 0; i < visibleColumns.length; i++) {
        startX += cellWidth;
      }

      // Draw column lines
      startX = rowHeaderWidth; // Initialize startX
      for (let i = 0; i < visibleColumns.length; i++) {
        context.beginPath();
        context.moveTo(startX, columnHeaderHeight); // x, y
        context.lineTo(startX, context.canvas.height); // x, y
        context.stroke();
        startX += cellWidth;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasHeight, canvasWidth]);

  useEffect(() => {
    const resizeCanvas = () => {
      setCanvasHeight(window.innerHeight);
      setCanvasWidth(window.innerWidth);
    };

    window.addEventListener('resize', resizeCanvas);
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className='w-screen h-screen'>
      <canvas ref={canvasRef} height={canvasHeight} width={canvasWidth} />
    </div>
  );
};
export default Sheet;
